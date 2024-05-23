import { CupomService } from './../cupom/cupom.service';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import axios from 'axios';

import { PaymentsService } from 'src/payments/payments.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class GatewaysService {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly cupomService: CupomService,
    private readonly productsService: ProductsService,
  ) {}

  async validateMP(req: Request) {
    const { id } = req.body;

    const { data, status } = await axios.post(
      `https://api.mercadopago.com/v1/payments/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${process.env.MERCADOPAGO_SECRET_TOKEN}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (status == 200) {
      const payment_info = {
        code: data.id,
        status: data.status,
        amount: data.net_received_amount,
        gross: data.transaction_amount,
        reference: data.external_reference,
      };
      if (payment_info.status == 'approved') {
        console.log('foi');
        this.paymentsService.create(payment_info);
      }
    }
  }

  async preferenceMP(req: Request) {
    const { playerName, productId, cupomId } = req.body;

    try {
      const product = await this.productsService.findOne(productId);
      const cupom = await this.cupomService.findOne(cupomId);

      const expirationDate = new Date(cupom.expiresIn);
      const currentDate = new Date();

      if (currentDate > expirationDate) {
        return new Error('The chosen coupon has expired');
      }

      if (cupom.uses >= cupom.maximumUses) {
        return new Error('Limit of uses of the reached');
      }

      const preTotalValue = product.price;
      const totalValue = preTotalValue - (preTotalValue * cupom.discount) / 100;

      const { data } = await axios.post(
        'https://api.mercadopago.com/checkout/preferences',
        {
          items: [
            {
              title: product.title,
              currency_id: 'BRL',
              picture_url: '',
              category_id: 'art',
              quantity: 1,
              unit_price: Number.parseInt(`${totalValue}.00`),
            },
          ],
          back_urls: {
            success: 'https://www.success.com',
            failure: 'http://www.failure.com',
            pending: 'http://www.pending.com',
          },
          notification_url: `${process.env.BACKEND_API}/payments/notification/mercadopago/`,
          external_reference: `${playerName}:${productId}`,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.MERCADOPAGO_SECRET_TOKEN}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return data.init_point;
    } catch (error) {
      return new Error('Error creating payment link');
    }
  }

  async preferencePP(req: Request) {
    const { playerName, productKey } = req.body;

    const productList = [
      { title: 'Product1', price: '15' },
      { title: 'Product2', price: '20' },
      { title: 'Product3', price: '25' },
      { title: 'Product4', price: '30' },
    ];

    const paypalApiUrl = 'https://api.sandbox.paypal.com/v1/payments/payment';

    const notificationUrl = `${process.env.BACKEND_URL}/payments/notification/mercadopago/`;

    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    const authResponse = await axios.post(
      'https://api.sandbox.paypal.com/v1/oauth2/token',
      null,
      {
        auth: {
          username: clientId,
          password: clientSecret,
        },
        params: {
          grant_type: 'client_credentials',
        },
      },
    );

    const accessToken = authResponse.data.access_token;

    const paymentData = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: 'https://example.com/paypal/success',
        cancel_url: 'https://example.com/paypal/cancel',
      },
      transactions: [
        {
          payment_options: {
            allowed_payment_method: 'UNRESTRICTED',
          },
          amount: {
            total: `${productList[productKey].price}.00`,
            currency: 'BRL',
          },
          item_list: {
            items: [
              {
                name: `${productList[productKey].title}`,
                description: 'Descrição do Item 1',
                quantity: '1',
                price: `${productList[productKey].price}.00`,
                currency: 'BRL',
              },
            ],
          },
          custom: `${playerName}-${productKey}`,
          notify_url: notificationUrl,
        },
      ],
    };

    const response = await axios.post(paypalApiUrl, paymentData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const approvalUrl = response.data.links.find(
      (link: any) => link.rel === 'approval_url',
    ).href;

    return approvalUrl;
  }
}
