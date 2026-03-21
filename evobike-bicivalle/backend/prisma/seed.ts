import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createUsers() {
  console.log('Creando usuarios...');

  const adminPassword = await bcrypt.hash('admin123', 10);
  const vendorPassword = await bcrypt.hash('vendor123', 10);

  await prisma.user.create({
    data: {
      email: 'admin@movillibre.com',
      password: adminPassword,
      name: 'Administrador',
      role: 'ADMIN',
      canManageInventory: true,
      canManageOrders: true,
      canManageUsers: true,
      canViewReports: true,
    },
  });

  await prisma.user.create({
    data: {
      email: 'vendedor1@movillibre.com',
      password: vendorPassword,
      name: 'Juan Vendedor',
      role: 'VENDOR',
      canManageInventory: false,
      canManageOrders: false,
      canManageUsers: false,
      canViewReports: false,
    },
  });

  console.log('Usuarios creados:');
  console.log('   Admin: admin@movillibre.com / admin123');
  console.log('   Vendedor: vendedor1@movillibre.com / vendor123');
}

const products = [
  {
    name: 'Zeus',
    siigoCode: 'ZEUS-001',
    price: 4200000,
    images: ['/imgs/Bicicletas/Zeus/Zeus-Verde.jpg'],
    category: 'bicicleta',
    inventoryCount: 10,
    tags: ['premium', 'urbana', 'alto rendimiento'],
    description: 'Bicicleta eléctrica Zeus de alto rendimiento.',
    batteryType: 'FIJA',
    popular: true,
    batteryOptions: [
      { type: 'Batería 48V 13Ah', available: true },
      { type: 'Batería 48V 20Ah', available: true },
    ],
    specs: [
      { label: 'Motor', value: '500W Brushless' },
      { label: 'Batería', value: '48V 13Ah/20Ah Litio' },
      { label: 'Autonomía', value: 'Hasta 60-80 km' },
    ],
    variants: [
      { color: 'Verde', image: '/imgs/Bicicletas/Zeus/Zeus-Verde.jpg', available: true },
      { color: 'Morado', image: '/imgs/Bicicletas/Zeus/Zeus-Morada.jpg', available: true },
      { color: 'Beige', image: '/imgs/Bicicletas/Zeus/Zeus-Beige.jpg', available: true },
      { color: 'Azul', image: '/imgs/Bicicletas/Zeus/Zeus-Azul.jpg', available: true },
      { color: 'Rojo', image: '/imgs/Bicicletas/Zeus/Zeos-Roja.jpg', available: true },
    ]
  },
  {
    name: 'Urban',
    siigoCode: 'URBAN-001',
    price: 3300000,
    images: ['/imgs/Bicicletas/Urban/Blanco.jpg'],
    category: 'bicicleta',
    inventoryCount: 11,
    tags: ['urbana', 'premium', 'estilo'],
    description: 'Bicicleta eléctrica Urban diseñada para la ciudad.',
    batteryType: 'FIJA',
    popular: true,
    specs: [
      { label: 'Motor', value: '500W' },
      { label: 'Batería', value: '48V 15Ah' },
      { label: 'Autonomía', value: '60-70 km' },
    ],
    variants: [
      { color: 'Blanco', image: '/imgs/Bicicletas/Urban/Blanco.jpg', available: true },
      { color: 'Negro', image: '/imgs/Bicicletas/Urban/Negro.jpg', available: true },
    ]
  },
  {
    name: 'Sol',
    siigoCode: 'SOL-001',
    price: 2400000,
    images: ['/imgs/Bicicletas/Sol/Gris.jpg'],
    category: 'bicicleta',
    inventoryCount: 12,
    tags: ['urbana', 'confort', 'versátil'],
    description: 'Bicicleta eléctrica Sol con diseño ergonómico.',
    batteryType: 'FIJA',
    specs: [
      { label: 'Motor', value: '350W' },
      { label: 'Batería', value: '36V 12Ah' },
      { label: 'Autonomía', value: '45-55 km' },
    ],
    variants: [
      { color: 'Gris', image: '/imgs/Bicicletas/Sol/Gris.jpg', available: true },
      { color: 'Negro', image: '/imgs/Bicicletas/Sol/Negro.jpg', available: true },
    ]
  },
];

async function main() {
  console.log('Iniciando seed...');

  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.adminNotification.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  console.log('Datos anteriores eliminados');

  await createUsers();

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log(`${products.length} productos creados`);

  const adminUser = await prisma.user.findUnique({
    where: { email: 'admin@movillibre.com' },
  });

  const sampleProduct = await prisma.product.findFirst({
    where: { name: 'Zeus' },
  });

  if (adminUser && sampleProduct) {
    await prisma.order.create({
      data: {
        orderNumber: 'ML-2025-000001',
        status: 'PAID',
        customerName: 'Juan Pérez',
        email: 'juan@ejemplo.com',
        phone: '+57 300 123 4567',
        city: 'Bogotá',
        address: 'Calle 72 #10-51',
        paymentMethod: 'CARD',
        paymentType: 'FULL_PAYMENT',
        isPaid: true,
        subtotal: 4200000,
        shipping: 0,
        tax: 798000,
        total: 4998000,
        saleType: 'ONLINE',
        createdById: adminUser.id,
        items: {
          create: [
            {
              productId: sampleProduct.id,
              nameSnapshot: 'Zeus',
              priceSnapshot: 4200000,
              quantity: 1,
            },
          ],
        },
      },
    });

    console.log('Orden de ejemplo creada');
  }

  console.log('Seed completado exitosamente');
  console.log('');
  console.log('Credenciales de acceso:');
  console.log('   Admin: admin@movillibre.com / admin123');
  console.log('   Vendedor: vendedor1@movillibre.com / vendor123');
  console.log('');
  console.log('Master Password: MoviLibre2025!SecretDev');
}

main()
  .catch((e) => {
    console.error('Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });