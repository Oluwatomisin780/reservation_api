import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentService {
  constructor(private readonly configService: ConfigService) {}
  private readonly API_BASE_URL = 'https://api.paystack.co';

  async processPaymentWithCardDetails(
    amount: number,
    email: string,
    cardDetails: {
      number: string;
      expiryMonth: number;
      expiryYear: number;
      cvv: string;
    },
  ): Promise<string> {
    //const secret_key = 'sk_test_6a4077bf720f6e65a99a8a676d0a2df95ae89ff9';
    try {
      // Make API call to Paystack to process payment with card details
      const response = await axios.post(
        `${this.API_BASE_URL}/transaction/initialize`,
        {
          amount,
          email,
          currency: 'NGN',
          card: {
            number: cardDetails.number,
            cvv: cardDetails.cvv,
            expiry_month: cardDetails.expiryMonth,
            expiry_year: cardDetails.expiryYear,
          },
        },
        {
          headers: {
            Authorization: `Bearer sk_test_8159d92b5a1dd2534c2f9abbb9513dafb0804be0`,
          },
        },
      );
      console.log(response.data);
      return response.data.data.reference;
    } catch (error) {
      console.log(error);
      throw new Error('Payment processing failed.');
    }
  }

  async verifyPayment(reference: string): Promise<boolean> {
    try {
      // Make API call to Paystack to verify payment
      const response = await axios.get(
        `${this.API_BASE_URL}/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer sk_test_8159d92b5a1dd2534c2f9abbb9513dafb0804be0`,
          },
        },
      );
      console.log(response.data);
      return response.data.data.status === 'success';
    } catch (error) {
      console.log(error);
      throw new Error('Payment verification failed.');
    }
  }
}
