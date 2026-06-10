import { SIIGO_COST_CENTER_ID, SIIGO_DOCUMENT_ID, SIIGO_PAYMENT_TYPE_ID, SIIGO_SELLER_ID } from '../config/siigo.js';
import { siigoProvider, SiigoProviderError } from '../providers/siigo.provider.js';
import type { CreateSaleInput } from '../types/invoice.types.js';
import type { CreateCustomerInput, CreateInvoiceInput, SiigoCustomer, SiigoInvoice } from '../types/siigo.types.js';

const roundToTwo = (value: number): number => Math.round((value + Number.EPSILON) * 100) / 100;

const isAlreadyExistsError = (error: unknown): boolean => {
  if (!(error instanceof SiigoProviderError)) {
    return false;
  }

  return error.code?.toLowerCase().includes('exist') ?? error.message.toLowerCase().includes('exist');
};

export class InvoiceService {
  private buildCustomerInput(input: CreateSaleInput['customer']): CreateCustomerInput {
    return {
      person_type: input.person_type,
      id_type: input.id_type,
      identification: input.identification,
      branch_office: 0,
      name: [input.firstName, input.lastName].filter(Boolean),
      address: {
        address: input.address,
        city: {
          country_code: 'Co',
          state_code: input.stateCode,
          city_code: input.cityCode,
        },
      },
      phones: [{ number: input.phone }],
      contacts: [
        {
          first_name: input.firstName,
          last_name: input.lastName || undefined,
          email: input.email,
        },
      ],
    };
  }

  private calculateTotals(items: CreateSaleInput['items']): { subtotal: number; tax: number; total: number } {
    let subtotal = 0;
    let tax = 0;

    for (const item of items) {
      const baseAmount = roundToTwo(item.price * item.quantity);
      subtotal = roundToTwo(subtotal + baseAmount);

      if (!item.taxIncluded && item.taxPercentage && item.taxPercentage > 0) {
        tax = roundToTwo(tax + roundToTwo((baseAmount * item.taxPercentage) / 100));
      }
    }

    return {
      subtotal,
      tax,
      total: roundToTwo(subtotal + tax),
    };
  }

  private buildInvoiceInput(customer: SiigoCustomer, input: CreateSaleInput): CreateInvoiceInput {
    const totals = this.calculateTotals(input.items);

    return {
      document: { id: SIIGO_DOCUMENT_ID },
      date: new Date().toISOString().split('T')[0],
      customer: {
        identification: customer.identification,
        branch_office: 0,
      },
      seller: SIIGO_SELLER_ID,
      cost_center: SIIGO_COST_CENTER_ID,
      items: input.items.map((item) => ({
        code: item.siigoCode,
        description: item.name,
        quantity: item.quantity,
        price: item.price,
        taxes: item.taxId ? [{ id: item.taxId }] : [],
      })),
      payments: [{ id: SIIGO_PAYMENT_TYPE_ID, value: totals.total }],
      stamp: { send: false },
      mail: { send: true },
      observations: input.observations,
    };
  }

  async createSale(input: CreateSaleInput): Promise<SiigoInvoice> {
    const customerInput = this.buildCustomerInput(input.customer);

    let customer = await siigoProvider.findCustomerByIdentification(input.customer.identification);

    if (!customer) {
      try {
        customer = await siigoProvider.createCustomer(customerInput);
      } catch (error) {
        if (!isAlreadyExistsError(error)) {
          throw error;
        }

        customer = await siigoProvider.findCustomerByIdentification(input.customer.identification);

        if (!customer) {
          throw error;
        }
      }
    }

    const invoiceData = this.buildInvoiceInput(customer, input);
    const totals = this.calculateTotals(input.items);

    try {
      return await siigoProvider.createInvoice(invoiceData);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown Siigo invoice error';

      if (message.toLowerCase().includes('total_payments') || message.toLowerCase().includes('invalid_total')) {
        console.error('Siigo invoice payment total mismatch', {
          customer: input.customer.identification,
          subtotal: totals.subtotal,
          tax: totals.tax,
          total: totals.total,
          items: input.items,
        });
      }

      throw error;
    }
  }
}

export const invoiceService = new InvoiceService();