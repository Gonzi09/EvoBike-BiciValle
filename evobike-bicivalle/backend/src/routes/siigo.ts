import express from 'express';
import { siigoService } from '../services/siigoService.js';

const router = express.Router();

router.get('/test-auth', async (req, res) => {
  try {
    const products = await siigoService.getProducts();
    res.json({
      message: 'Conexión exitosa con Siigo',
      productsCount: products.results?.length || 0,
      products: products
    });
  } catch (error: any) {
    res.status(500).json({
      error: 'Error conectando con Siigo',
      details: error.message
    });
  }
});

router.get('/products', async (req, res) => {
  try {
    const { page = 1, pageSize = 25 } = req.query;
    const products = await siigoService.getProducts(Number(page), Number(pageSize));
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/invoices', async (req, res) => {
  try {
    const { dateStart, dateEnd } = req.query;
    const invoices = await siigoService.getInvoices(
      dateStart as string,
      dateEnd as string
    );
    res.json(invoices);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/sync-inventory', async (req, res) => {
  try {
    const products = await siigoService.syncInventoryFromSiigo();
    res.json({
      message: 'Inventario sincronizado',
      count: products.results?.length || 0,
      products: products
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;