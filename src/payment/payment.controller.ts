// paystack.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('charge')
  async processPaymentWithCardDetails(
    @Body()
    data: {
      amount: number;
      email: string;
      cardDetails: {
        number: string;
        expiryMonth: number;
        expiryYear: number;
        cvv: string;
      };
    },
  ) {
    const reference = await this.paymentService.processPaymentWithCardDetails(
      data.amount,
      data.email,
      data.cardDetails,
    );
    return { reference };
  }

  @Post('verify')
  async verifyPayment(@Body() data: { reference: string }) {
    const success = await this.paymentService.verifyPayment(data.reference);
    return { success };
  }
}
