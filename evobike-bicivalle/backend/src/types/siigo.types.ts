export interface SiigoErrorItem {
  Code: string;
  Message: string;
  Params: string[];
  Detail?: string;
}

export interface SiigoApiErrorPayload {
  Status: number;
  Errors: SiigoErrorItem[];
}

export interface SiigoCollectionResponse<T> {
  pagination?: {
    page: number;
    page_size: number;
    total_results: number;
  };
  results: T[];
}

export interface SiigoProduct {
  id: string;
  code: string;
  name: string;
  account_group: { id: number; name: string };
  type: string;
  stock_control: boolean;
  active: boolean;
  tax_classification: string;
  tax_included: boolean;
  tax_consumption_value: number;
  taxes: Array<{ id: number; name: string; type: string; percentage: number }>;
  prices: Array<{
    currency_code: string;
    price_list: Array<{ position: number; name: string; value: number }>;
  }>;
  unit: { code: string; name: string };
  unit_label: string;
  reference: string;
  description: string;
  additional_fields: {
    barcode: string;
    brand: string;
    tariff: string;
    model: string;
  };
  available_quantity: number;
  warehouses: Array<{ id: number; name: string; quantity: number }>;
  metadata: { created: string; last_updated: string; stock_updated: string };
}

export interface SiigoProductsResponse extends SiigoCollectionResponse<SiigoProduct> {
  pagination: {
    page: number;
    page_size: number;
    total_results: number;
  };
}

export interface SiigoCustomer {
  id: string;
  identification: string;
  branch_office: number;
  name: string[];
  person_type?: 'Person' | 'Company';
  id_type?: string;
  address?: {
    address: string;
    city: { country_code: string; state_code: string; city_code: string };
  };
}

export interface CreateCustomerInput {
  person_type: 'Person' | 'Company';
  id_type: string;
  identification: string;
  branch_office: number;
  name: string[];
  address: {
    address: string;
    city: { country_code: string; state_code: string; city_code: string };
  };
  phones: Array<{ number: string }>;
  contacts: Array<{ first_name: string; last_name?: string; email?: string }>;
}

export interface CreateInvoiceInput {
  document: { id: number };
  date: string;
  customer: { identification: string; branch_office: number };
  seller: number;
  cost_center?: number;
  items: Array<{
    code: string;
    description: string;
    quantity: number;
    price: number;
    taxes?: Array<{ id: number }>;
    warehouse?: number;
  }>;
  payments: Array<{ id: number; value: number }>;
  stamp?: { send: boolean };
  mail?: { send: boolean };
  observations?: string;
}

export interface SiigoInvoice {
  id: string;
  name: string;
  date: string;
  total: number;
  stamp?: { status: string; cufe: string };
}