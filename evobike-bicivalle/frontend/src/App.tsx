import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Collection from './pages/Collection';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminOrders from './pages/AdminOrders';
import AdminInventory from './pages/AdminInventory';
import AdminAuditLogs from './pages/AdminAuditLogs';
import AdminProducts from './pages/AdminProducts';
import PaymentResult from './pages/PaymentResult';
import CheckoutResult from './pages/CheckoutResult';
import BicicletasElectricasCali from './pages/BicicletasElectricasCali';
import ScootersElectricosCali from './pages/ScootersElectricosCali';
import TiendaBicicletasCali from './pages/TiendaBicicletasCali';
import ComprarBicicletaCali from './pages/ComprarBicicletaCali';
import ComoElegirBicicletaElectrica from './pages/ComoElegirBicicletaElectrica';
import CuantoDuraBateriaBicicletaElectrica from './pages/CuantoDuraBateriaBicicletaElectrica';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 pt-16">
              <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="/" element={<Home />} />
                <Route path="/bicicletas" element={<Collection />} />
                <Route path="/scooters" element={<Collection />} />
                <Route path="/triciclos" element={<Collection />} />
                <Route path="/:category" element={<Collection />} />
                <Route path="/products/:slug" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkout/result" element={<CheckoutResult />} />
                <Route path="/checkout/result" element={<PaymentResult />} />
                <Route path="/success" element={<Success />} />
                <Route path="/contacto" element={<Contact />} />
                <Route
                  path="/bicicletas-electricas-cali"
                  element={<BicicletasElectricasCali />}
                />
                <Route
                  path="/scooters-electricos-cali"
                  element={<ScootersElectricosCali />}
                />
                <Route
                  path="/tienda-bicicletas-electricas-cali"
                  element={<TiendaBicicletasCali />}
                />
                <Route
                  path="/comprar-bicicleta-electrica-cali"
                  element={<ComprarBicicletaCali />}
                />
                <Route
                  path="/como-elegir-bicicleta-electrica"
                  element={<ComoElegirBicicletaElectrica />}
                />
                <Route
                  path="/cuanto-dura-bateria-bicicleta-electrica"
                  element={<CuantoDuraBateriaBicicletaElectrica />}
                />

                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/orders"
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminOrders />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/inventory"
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminInventory />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/products"
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminProducts />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/audit-logs"
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminAuditLogs />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/unauthorized"
                  element={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                          Acceso Denegado
                        </h1>
                        <p className="text-gray-600">
                          No tienes permisos para acceder a esta página
                        </p>
                      </div>
                    </div>
                  }
                />
              </Routes>
            </main>
            <a
              href="https://wa.me/573184128902"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: '#25D366',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                zIndex: 9999,
                cursor: 'pointer',
                textDecoration: 'none',
              }}
              aria-label="Contactar por WhatsApp"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;