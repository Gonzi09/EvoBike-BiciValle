export interface CheckoutCustomerInput {
  identification: string;
  id_type: string;
  person_type: 'Person' | 'Company';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  cityCode: string;
  stateCode: string;
}

export interface CheckoutItemInput {
  siigoCode: string;
  quantity: number;
}

export interface ValidatedCheckoutItem extends CheckoutItemInput {
  name: string;
  price: number;
  taxId?: number;
  taxPercentage?: number;
  taxIncluded: boolean;
}

export interface CreateSaleInput {
  customer: CheckoutCustomerInput;
  items: ValidatedCheckoutItem[];
  observations?: string;
}

export interface CheckoutRequestBody {
  customer: CheckoutCustomerInput;
  items: CheckoutItemInput[];
  observations?: string;
}