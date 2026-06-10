// const API_URL = import.meta.env.VITE_API_URL || 'https://api.movilibre.co/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('evobike_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
};

// Products
export const fetchGroupBySlug = async (slug: string) => {
  const response = await fetch(`${API_URL}/products/group/${slug}`)
  if (!response.ok) throw new Error('Error fetching product')
  const json = await response.json()
  return json.data ?? json
}

export const fetchGroupedProducts = async (category?: string) => {
  const params = category ? `?category=${category}` : ''
  const response = await fetch(`${API_URL}/products/grouped${params}`)
  if (!response.ok) throw new Error('Error fetching grouped products')
  const json = await response.json()
  return json.data ?? json
}

export const fetchProducts = async (filters = {}) => {
  const params = new URLSearchParams(filters as any);
  const response = await fetch(`${API_URL}/products?${params}`);
  if (!response.ok) throw new Error('Error fetching products');
  const json = await response.json();
  return json.data ?? json;
};

export const fetchProductById = async (id: string) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) throw new Error('Error fetching product');
  const json = await response.json();
  return json.data ?? json;
};

// Orders
export const createOrder = async (orderData: any) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: getAuthHeaders(),
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
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error confirming payment');
  }
  return response.json();
};

export const fetchOrderById = async (id: string) => {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Error fetching order');
  return response.json();
};

// Admin - Orders
export const fetchAdminOrders = async (filters = {}) => {
  const params = new URLSearchParams(filters as any);
  const response = await fetch(`${API_URL}/admin/orders?${params}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Error fetching orders');
  return response.json();
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const response = await fetch(`${API_URL}/admin/orders/${orderId}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('Error updating order');
  return response.json();
};

// Admin - Inventory
export const updateProductInventory = async (productId: string, inventoryCount: number) => {
  const response = await fetch(`${API_URL}/admin/products/${productId}/inventory`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ inventoryCount }),
  });
  if (!response.ok) throw new Error('Error updating inventory');
  return response.json();
};

// Admin - Notifications
export const fetchNotifications = async (isRead?: boolean) => {
  const params = new URLSearchParams();
  if (isRead !== undefined) params.set('isRead', String(isRead));
  
  const response = await fetch(`${API_URL}/admin/notifications?${params}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Error fetching notifications');
  return response.json();
};

export const markNotificationRead = async (notificationId: string) => {
  const response = await fetch(`${API_URL}/admin/notifications/${notificationId}/read`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Error marking notification');
  return response.json();
};

// Admin - Stats
export const fetchAdminStats = async () => {
  const response = await fetch(`${API_URL}/admin/stats`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Error fetching stats');
  return response.json();
};

// Admin - Audit Logs
export const fetchAuditLogs = async (filters = {}) => {
  const params = new URLSearchParams(filters as any);
  const response = await fetch(`${API_URL}/admin/audit-logs?${params}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Error fetching audit logs');
  return response.json();
};

export const fetchEntityAuditLogs = async (entity: string, entityId: string) => {
  const response = await fetch(`${API_URL}/admin/audit-logs/${entity}/${entityId}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Error fetching entity logs');
  return response.json();
};

// Users Management
export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Error fetching users');
  return response.json();
};

export const updateUser = async (userId: string, data: any) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error updating user');
  return response.json();
};

export const deactivateUser = async (userId: string) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Error deactivating user');
  return response.json();
};

// Vendor - Sales
export const createInPersonSale = async (saleData: any) => {
  const response = await fetch(`${API_URL}/vendor/sales`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(saleData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error creating sale');
  }
  return response.json();
};

export const addPayment = async (orderId: string, paymentData: any) => {
  const response = await fetch(`${API_URL}/vendor/sales/${orderId}/payment`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(paymentData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error adding payment');
  }
  return response.json();
};

export const fetchVendorSales = async (filters = {}) => {
  const params = new URLSearchParams(filters as any);
  const response = await fetch(`${API_URL}/vendor/my-sales?${params}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Error fetching sales');
  return response.json();
};

// Critical Operations
export const refundOrder = async (orderId: string, reason: string, masterPassword: string) => {
  const response = await fetch(`${API_URL}/critical/refund/${orderId}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ reason, masterPassword }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error processing refund');
  }
  return response.json();
};

export const cancelOrder = async (orderId: string, reason: string, masterPassword: string) => {
  const response = await fetch(`${API_URL}/critical/cancel/${orderId}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ reason, masterPassword }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error canceling order');
  }
  return response.json();
};