import type { Request, Response } from 'express';
import { inventoryService, InventoryServiceError } from '../services/inventory.service.js';
import { invoiceService } from '../services/invoice.service.js';
import type { ApiError, ApiSuccess } from '../types/api.types.js';
import type { CheckoutRequestBody } from '../types/invoice.types.js';
import type { SiigoInvoice } from '../types/siigo.types.js';

interface CheckoutResponseData {
  invoiceId: string;
  invoiceName: string;
  total: number;
  message: string;
}

const isValidCustomer = (customer: CheckoutRequestBody['customer']): boolean => {
  return Boolean(
    customer.identification &&
      customer.id_type &&
      customer.person_type &&
      customer.firstName &&
      customer.lastName &&
      customer.email &&
      customer.phone &&
      customer.address &&
      customer.cityCode &&
      customer.stateCode
  );
};

export const createCheckout = async (
  req: Request,
  res: Response<ApiSuccess<CheckoutResponseData> | ApiError>
): Promise<Response<ApiSuccess<CheckoutResponseData> | ApiError>> => {
  try {
    const body = req.body as CheckoutRequestBody;

    if (!body?.customer || !Array.isArray(body.items) || body.items.length === 0 || !isValidCustomer(body.customer)) {
      return res.status(400).json({
        success: false,
        error: 'Missing required checkout fields',
      });
    }

    const validatedItems = await inventoryService.validateCheckoutItems(body.items);

    const invoice: SiigoInvoice = await invoiceService.createSale({
      customer: body.customer,
      items: validatedItems,
      observations: body.observations,
    });

    return res.status(201).json({
      success: true,
      data: {
        invoiceId: invoice.id,
        invoiceName: invoice.name,
        total: invoice.total,
        message: 'Compra realizada exitosamente. Recibirás tu factura por email.',
      },
    });
  } catch (error) {
    if (error instanceof InventoryServiceError) {
      return res.status(error.statusCode).json({
        success: false,
        error: error.message,
      });
    }

    console.error('Error creating checkout:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to create checkout',
    });
  }
};