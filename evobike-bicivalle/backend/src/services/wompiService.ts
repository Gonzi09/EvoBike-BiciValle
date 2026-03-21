import crypto from 'crypto';
import axios from 'axios';

export class WompiService {
  private apiUrl = process.env.WOMPI_API_URL || 'https://sandbox.wompi.co/v1';

  generateReference(): string {
    return `ML-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  generateSignature(reference: string, amountInCents: string, integritySecret: string) {
    const raw = `${reference}${amountInCents}COP${integritySecret}`;
    return crypto.createHash('sha256').update(raw).digest('hex');
  }

  createPaymentParams(orderData: any) {
    const publicKey = process.env.WOMPI_PUBLIC_KEY!;
    const integritySecret = process.env.WOMPI_INTEGRITY_SECRET!;
    const frontendUrl = process.env.FRONTEND_URL || 'https://movilibre.co';

    const reference = this.generateReference();
    const amountInCents = Math.round(Number(orderData.total) * 100).toString();

    const signature = this.generateSignature(reference, amountInCents, integritySecret);

    return {
      'public-key': publicKey,
      currency: 'COP',
      'amount-in-cents': amountInCents,
      reference,
      'signature:integrity': signature,
      'redirect-url': `${frontendUrl}/checkout/result`,
      'customer-data:email': orderData.email,
      'customer-data:full-name': orderData.customerName,
      'customer-data:phone-number': orderData.phone,
      'customer-data:phone-number-prefix': '+57',
    };
  }

  async getTransaction(transactionId: string) {
    const response = await axios.get(
      `${this.apiUrl}/transactions/${transactionId}`
    );
    return response.data.data;
  }
}

export const wompiService = new WompiService();