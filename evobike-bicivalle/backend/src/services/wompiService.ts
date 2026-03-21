import crypto from 'crypto';

export class WompiService {
  generateReference(): string {
    return `ML-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  generateSignature(reference: string, amountInCents: string, integritySecret: string, currency = 'COP') {
    const raw = `${reference}${amountInCents}COP${integritySecret}`;
    return crypto.createHash('sha256').update(raw).digest('hex');
  }

  createPaymentParams(orderData: any) {
    console.log('PUBLIC KEY BACKEND:', process.env.WOMPI_PUBLIC_KEY);

    const publicKey = (process.env.WOMPI_PUBLIC_KEY || '').trim();
    const integritySecret = (process.env.WOMPI_INTEGRITY_SECRET || '').trim();

    if (!publicKey || publicKey === 'undefined' || !publicKey.startsWith('pub_')) {
      throw new Error('WOMPI_PUBLIC_KEY no está definida');
    }

    if (!integritySecret || integritySecret === 'undefined') {
      throw new Error('WOMPI_INTEGRITY_SECRET no está definida');
    }

    const reference = this.generateReference();
    const amountInCents = Math.round(Number(orderData.total) * 100).toString();

    const signature = this.generateSignature(reference, amountInCents, integritySecret);

    const params = {
      'public-key': publicKey,
      currency: 'COP',
      'amount-in-cents': amountInCents,
      reference,
      'signature:integrity': signature,
      'redirect-url': `https://google.com`,
      'customer-data:email': orderData.email,
      'customer-data:full-name': orderData.customerName,
      'customer-data:phone-number': orderData.phone,
      'customer-data:phone-number-prefix': '+57',
    };

    console.log('PARAMS BACKEND:', params);

    return params;
  }
}

export const wompiService = new WompiService();