import axios from 'axios';

const SIIGO_API_URL = 'https://api.siigo.com';
const SIIGO_AUTH_URL = 'https://api.siigo.com/auth';

interface SiigoCredentials {
  username: string;
  accessKey: string;
}

export class SiigoService {
  private credentials: SiigoCredentials;
  private token: string | null = null;
  private tokenExpiry: Date | null = null;

  constructor() {
    this.credentials = {
      username: process.env.SIIGO_USERNAME || '',
      accessKey: process.env.SIIGO_ACCESS_KEY || '',
    };
  }

  private async authenticate() {
    try {
      const response = await axios.post(
        SIIGO_AUTH_URL,
        {
          username: this.credentials.username,
          access_key: this.credentials.accessKey
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      this.token = response.data.access_token;
      const expiresIn = response.data.expires_in || 3600;
      this.tokenExpiry = new Date(Date.now() + expiresIn * 1000);

      console.log('Siigo API: Token obtenido correctamente');
      return this.token;
    } catch (error: any) {
      console.error('Error autenticando con Siigo:', error.response?.data || error.message);
      throw new Error('Failed to authenticate with Siigo');
    }
  }

  private async getValidToken() {
    if (!this.token || !this.tokenExpiry || new Date() >= this.tokenExpiry) {
      await this.authenticate();
    }
    return this.token;
  }

  private async makeRequest(method: string, endpoint: string, data?: any) {
    const token = await this.getValidToken();

    try {
      const response = await axios({
        method,
        url: `${SIIGO_API_URL}${endpoint}`,
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
          'Partner-Id': 'EvoBike',
        },
        data,
      });

      return response.data;
    } catch (error: any) {
      console.error(`Siigo API Error (${endpoint}):`, error.response?.data || error.message);
      throw error;
    }
  }

  async getProducts(page: number = 1, pageSize: number = 25) {
    return this.makeRequest('GET', `/v1/products?page=${page}&page_size=${pageSize}`);
  }

  async getProductByCode(code: string) {
    return this.makeRequest('GET', `/v1/products/${code}`);
  }

  async createProduct(productData: any) {
    return this.makeRequest('POST', '/v1/products', productData);
  }

  async updateProduct(code: string, productData: any) {
    return this.makeRequest('PUT', `/v1/products/${code}`, productData);
  }

  async getCustomers(page: number = 1) {
    return this.makeRequest('GET', `/v1/customers?page=${page}`);
  }

  async createCustomer(customerData: any) {
    return this.makeRequest('POST', '/v1/customers', customerData);
  }

  async createInvoice(invoiceData: any) {
    return this.makeRequest('POST', '/v1/invoices', invoiceData);
  }

  async getInvoices(dateStart?: string, dateEnd?: string) {
    let endpoint = '/v1/invoices';
    const params = new URLSearchParams();
    
    if (dateStart) params.append('created_start', dateStart);
    if (dateEnd) params.append('created_end', dateEnd);
    
    if (params.toString()) {
      endpoint += `?${params.toString()}`;
    }

    return this.makeRequest('GET', endpoint);
  }

  async getInvoicePDF(invoiceId: string) {
    const token = await this.getValidToken();

    try {
      const response = await axios.get(
        `${SIIGO_API_URL}/v1/invoices/${invoiceId}/pdf`,
        {
          headers: {
            'Authorization': token,
          },
          responseType: 'arraybuffer',
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Error obteniendo PDF:', error.response?.data || error.message);
      throw error;
    }
  }

  async syncInventoryFromSiigo() {
    try {
      const products = await this.getProducts(1, 100);
      return products;
    } catch (error) {
      console.error('Error sincronizando inventario:', error);
      throw error;
    }
  }

  async createSaleInSiigo(orderData: any) {
    try {
      let customer = await this.findOrCreateCustomer(orderData.customer);
      
      const invoiceData = {
        document: {
          id: 24446
        },
        date: new Date().toISOString().split('T')[0],
        customer: {
          identification: customer.identification,
          branch_office: 0
        },
        cost_center: 235,
        seller: 629,
        observations: orderData.notes || '',
        items: orderData.items.map((item: any) => ({
          code: item.productCode,
          description: item.name,
          quantity: item.quantity,
          price: item.price,
          discount: 0,
          taxes: [
            {
              id: 13156
            }
          ]
        })),
        payments: [
          {
            id: 5636,
            value: orderData.total,
            due_date: new Date().toISOString().split('T')[0]
          }
        ]
      };

      const invoice = await this.createInvoice(invoiceData);
      console.log('Factura creada en Siigo:', invoice.id);
      return invoice;
    } catch (error) {
      console.error('Error creando venta en Siigo:', error);
      throw error;
    }
  }

  private async findOrCreateCustomer(customerData: any) {
    try {
      const customers = await this.getCustomers();
      const existing = customers.results?.find(
        (c: any) => c.identification === customerData.identification
      );

      if (existing) {
        return existing;
      }

      const newCustomer = {
        type: 'Person',
        person_type: 'Person',
        id_type: '13',
        identification: customerData.identification,
        name: customerData.name.split(' '),
        address: {
          address: customerData.address,
          city: {
            country_code: 'Co',
            state_code: '19',
            city_code: '19001'
          }
        },
        phones: [
          {
            indicative: '57',
            number: customerData.phone.replace(/[^0-9]/g, ''),
            extension: ''
          }
        ],
        contacts: [
          {
            first_name: customerData.name.split(' ')[0],
            last_name: customerData.name.split(' ')[1] || '',
            email: customerData.email,
            phone: {
              indicative: '57',
              number: customerData.phone.replace(/[^0-9]/g, ''),
              extension: ''
            }
          }
        ]
      };

      return await this.createCustomer(newCustomer);
    } catch (error) {
      console.error('Error gestionando cliente:', error);
      throw error;
    }
  }
}

export const siigoService = new SiigoService();