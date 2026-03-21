const API_URL = import.meta.env.VITE_API_URL || 'https://api.movilibre.co/api';

// Products
export const fetchProducts = async (filters = {}) => {
  const params = new URLSearchParams(filters as any);
  const response = await fetch(`${API_URL}/products?${params}`);
  if (!response.ok) throw new Error('Error fetching products');
  return response.json();
};

export const fetchProductById = async (id: string) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) throw new Error('Error fetching product');
  return response.json();
};

// Orders
export const createOrder = async (orderData: any) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error creating order');
  }
  return response.json();
};

export const confirmOrderPayment = async (orderId: string) => {
  const response = await fetch(`${API_URL}/orders/${orderId}/confirm-payment`, {
    method: 'POST',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error confirming payment');
  }
  return response.json();
};

export const fetchOrderById = async (id: string) => {
  const response = await fetch(`${API_URL}/orders/${id}`);
  if (!response.ok) throw new Error('Error fetching order');
  return response.json();
};

// Admin - Orders
export const fetchAdminOrders = async (filters = {}) => {
  const params = new URLSearchParams(filters as any);
  const response = await fetch(`${API_URL}/admin/orders?${params}`);
  if (!response.ok) throw new Error('Error fetching orders');
  return response.json();
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const response = await fetch(`${API_URL}/admin/orders/${orderId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('Error updating order');
  return response.json();
};

// Admin - Inventory
export const updateProductInventory = async (productId: string, inventoryCount: number) => {
  const response = await fetch(`${API_URL}/admin/products/${productId}/inventory`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ inventoryCount }),
  });
  if (!response.ok) throw new Error('Error updating inventory');
  return response.json();
};

// Admin - Notifications
export const fetchNotifications = async (isRead?: boolean) => {
  const params = new URLSearchParams();
  if (isRead !== undefined) params.set('isRead', String(isRead));
  
  const response = await fetch(`${API_URL}/admin/notifications?${params}`);
  if (!response.ok) throw new Error('Error fetching notifications');
  return response.json();
};

export const markNotificationRead = async (notificationId: string) => {
  const response = await fetch(`${API_URL}/admin/notifications/${notificationId}/read`, {
    method: 'PATCH',
  });
  if (!response.ok) throw new Error('Error marking notification');
  return response.json();
};

// Admin - Stats
export const fetchAdminStats = async () => {
  const response = await fetch(`${API_URL}/admin/stats`);
  if (!response.ok) throw new Error('Error fetching stats');
  return response.json();
};

// Admin - Audit Logs
export const fetchAuditLogs = async (filters = {}) => {
  const params = new URLSearchParams(filters as any);
  const response = await fetch(`${API_URL}/admin/audit-logs?${params}`);
  if (!response.ok) throw new Error('Error fetching audit logs');
  return response.json();
};

export const fetchEntityAuditLogs = async (entity: string, entityId: string) => {
  const response = await fetch(`${API_URL}/admin/audit-logs/${entity}/${entityId}`);
  if (!response.ok) throw new Error('Error fetching entity logs');
  return response.json();
};