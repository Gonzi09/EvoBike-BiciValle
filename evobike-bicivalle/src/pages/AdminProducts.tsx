import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Edit2, ExternalLink } from 'lucide-react';
import { fetchProducts } from '../utils/api';

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts({ limit: '100' });
      setProducts(data.products);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSyncInventory = async () => {
    try {
      setSyncing(true);
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
      const token = localStorage.getItem('evobike_token');

      const response = await fetch(`${API_URL}/admin/sync-inventory`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();
      alert(`Sincronización completada: ${result.updated} productos actualizados`);
      loadProducts();
    } catch (error) {
      console.error('Error syncing:', error);
      alert('Error al sincronizar inventario');
    } finally {
      setSyncing(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Gestión de Productos</h1>
              <p className="text-gray-600">Edita productos y sincroniza inventario desde Siigo</p>
            </div>
            <button
              onClick={handleSyncInventory}
              disabled={syncing}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors disabled:bg-gray-400"
            >
              <RefreshCw className={`w-5 h-5 ${syncing ? 'animate-spin' : ''}`} />
              {syncing ? 'Sincronizando...' : 'Sincronizar con Siigo'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Producto</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Código Siigo</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Precio</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Colores</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.images?.[0] && (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div>
                          <div className="font-semibold text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {product.siigoCode ? (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          {product.siigoCode}
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                          Sin vincular
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.inventoryCount === 0 ? 'bg-red-100 text-red-800' :
                        product.inventoryCount < 5 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {product.inventoryCount} unidades
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {product.variants?.length || 0} variantes
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {product.id ? (
                        <Link
                          to={`/admin/products/${product.id}/edit`}
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                        >
                          <Edit2 className="w-4 h-4" />
                          Editar
                        </Link>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-gray-400 font-medium">
                          <Edit2 className="w-4 h-4" />
                          Sin ID
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {products.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No hay productos</p>
              <button
                onClick={handleSyncInventory}
                className="text-green-600 font-bold hover:text-green-700"
              >
                Sincronizar desde Siigo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;