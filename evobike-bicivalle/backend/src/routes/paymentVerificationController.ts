import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { wompiService } from '../services/wompiService.js';

const prisma = new PrismaClient();

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { transactionId } = req.params;

    const transaction = await wompiService.getTransaction(transactionId);

    const order = await prisma.order.findFirst({
      where: { orderNumber: transaction.data.reference },
    });

    res.json({
      status: transaction.data.status,
      transactionId: transaction.data.id,
      reference: transaction.data.reference,
      amount: transaction.data.amount_in_cents / 100,
      orderFound: !!order,
    });
  } catch (error: any) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      status: 'ERROR',
      error: error.message,
    });
  }
};