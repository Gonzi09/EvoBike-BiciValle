import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, TrendingUp, AlertTriangle, Bell, Box } from 'lucide-react';
import { fetchAdminStats, fetchNotifications } from '../utils/api';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const [statsData, notifData] = await Promise.all([
        fetchAdminStats(),
        fetchNotifications(false),
      ]);
      setStats(statsData);
      setNotifications(notifData.notifications);
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
          <p className="text-gray-600">Gestiona pedidos, inventario y productos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Total</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalOrders}</div>
            <div className="text-sm text-gray-600">Pedidos totales</div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">Confirmados</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.paidOrders}</div>
            <div className="text-sm text-gray-600">Pedidos pagados</div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">Ingresos</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {formatPrice(stats.totalRevenue)}
            </div>
            <div className="text-sm text-gray-600">Total vendido</div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-sm text-gray-500">Alerta</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.lowStockProducts}</div>
            <div className="text-sm text-gray-600">Stock bajo</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Link
            to="/admin/products"
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:border-green-500 hover:shadow-lg transition-all"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Gestionar Productos</h3>
            <p className="text-gray-600 mb-4">Editar catálogo y sincronizar con Siigo</p>
            <div className="text-green-600 font-medium">Ver productos →</div>
          </Link>

          <Link
            to="/admin/orders"
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:border-green-500 hover:shadow-lg transition-all"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Gestionar Pedidos</h3>
            <p className="text-gray-600 mb-4">Ver y actualizar el estado de los pedidos</p>
            <div className="text-green-600 font-medium">Ver pedidos →</div>
          </Link>

          <Link
            to="/admin/inventory"
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:border-green-500 hover:shadow-lg transition-all"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Gestionar Inventario</h3>
            <p className="text-gray-600 mb-4">Actualizar stock de productos</p>
            <div className="text-green-600 font-medium">Ver inventario →</div>
          </Link>

          <Link
            to="/admin/notifications"
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:border-green-500 hover:shadow-lg transition-all relative"
          >
            {notifications.length > 0 && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{notifications.length}</span>
              </div>
            )}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Notificaciones</h3>
            <p className="text-gray-600 mb-4">Revisar alertas y pedidos nuevos</p>
            <div className="text-green-600 font-medium">Ver notificaciones →</div>
          </Link>

          <Link
            to="/admin/audit-logs"
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:border-green-500 hover:shadow-lg transition-all"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Registro de Auditoría</h3>
            <p className="text-gray-600 mb-4">Historial de operaciones críticas</p>
            <div className="text-green-600 font-medium">Ver logs →</div>
          </Link>
        </div>

        {notifications.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Bell className="w-6 h-6" />
                Notificaciones Recientes
              </h2>
              <Link to="/admin/notifications" className="text-green-600 hover:text-green-700 font-medium">
                Ver todas
              </Link>
            </div>

            <div className="space-y-4">
              {notifications.slice(0, 5).map((notif: any) => (
                <div
                  key={notif.id}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    notif.type === 'ORDER_PAID' ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    {notif.type === 'ORDER_PAID' ? (
                      <ShoppingCart className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{notif.message}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(notif.createdAt).toLocaleString('es-CO')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;