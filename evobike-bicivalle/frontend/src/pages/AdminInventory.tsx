import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package, AlertTriangle, Edit2, Save, X } from 'lucide-react';
import { fetchProducts, updateProductInventory } from '../utils/api';

const AdminInventory: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

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

  const handleEdit = (product: any) => {
    setEditingId(product.id);
    setEditValue(String(product.inventoryCount));
  };

  const handleSave = async (productId: string) => {
    try {
      const newCount = parseInt(editValue);
      if (isNaN(newCount) || newCount < 0) {
        alert('Cantidad inválida');
        return;
      }

      await updateProductInventory(productId, newCount);
      setEditingId(null);
      loadProducts();
    } catch (error) {
      console.error('Error updating inventory:', error);
      alert('Error al actualizar inventario');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Cargando...</div>
      </div>
    );
  }

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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Gestión de Inventario</h1>
          <p className="text-gray-600">Actualiza el stock de tus productos</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Producto</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Categoría</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Precio</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Estado</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className={`hover:bg-gray-50 ${
                    product.inventoryCount === 0 ? 'bg-red-50' : 
                    product.inventoryCount < 5 ? 'bg-yellow-50' : ''
                  }`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">ID: {product.id.slice(0, 8)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="capitalize text-gray-700">{product.category}</span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {new Intl.NumberFormat('es-CO', {
                        style: 'currency',
                        currency: 'COP',
                        minimumFractionDigits: 0,
                      }).format(product.price)}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === product.id ? (
                        <input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-20 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                          autoFocus
                        />
                      ) : (
                        <span className="text-lg font-semibold text-gray-900">
                          {product.inventoryCount}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {product.inventoryCount === 0 ? (
                        <span className="flex items-center gap-2 text-red-600">
                          <AlertTriangle className="w-4 h-4" />
                          Agotado
                        </span>
                      ) : product.inventoryCount < 5 ? (
                        <span className="flex items-center gap-2 text-yellow-600">
                          <AlertTriangle className="w-4 h-4" />
                          Stock bajo
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 text-green-600">
                          <Package className="w-4 h-4" />
                          Disponible
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === product.id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSave(product.id)}
                            className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="p-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Leyenda</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-50 border border-red-200 rounded"></div>
              <span className="text-sm text-gray-700">Agotado (0 unidades)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-50 border border-yellow-200 rounded"></div>
              <span className="text-sm text-gray-700">Stock bajo (&lt; 5 unidades)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white border border-gray-200 rounded"></div>
              <span className="text-sm text-gray-700">Stock normal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInventory;