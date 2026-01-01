import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
  {
    name: 'Urban X1 Pro',
    price: 3499000,
    images: ['/imgs/Bicis.webp'],
    category: 'bicicleta',
    inventoryCount: 15,
    tags: ['urbana', 'autonomía extendida', 'premium'],
    description: 'Bicicleta eléctrica urbana de alto rendimiento con motor brushless de 500W y batería de litio de 48V 15Ah.',
    badge: 'Nuevo',
    popular: true,
    specs: [
      { label: 'Motor', value: '500W Brushless' },
      { label: 'Batería', value: '48V 15Ah Litio' },
      { label: 'Autonomía', value: 'Hasta 70 km' },
      { label: 'Velocidad máx.', value: '32 km/h' },
      { label: 'Peso', value: '24 kg' },
      { label: 'Frenos', value: 'Disco hidráulico' },
    ],
    variants: [
      { color: 'Negro Mate', available: true },
      { color: 'Verde Oscuro', available: true },
      { color: 'Gris Titanio', available: false },
    ]
  },
  {
    name: 'Mountain Beast 3000',
    price: 5299000,
    images: ['/imgs/Bicis.webp'],
    category: 'bicicleta',
    inventoryCount: 8,
    tags: ['montaña', 'suspensión full', 'alto rendimiento'],
    description: 'Bicicleta eléctrica de montaña con suspensión completa y motor de 750W.',
    popular: true,
    specs: [
      { label: 'Motor', value: '750W Mid-Drive' },
      { label: 'Batería', value: '52V 20Ah' },
      { label: 'Autonomía', value: 'Hasta 90 km' },
      { label: 'Suspensión', value: 'Full 150mm' },
    ],
    variants: [
      { color: 'Negro/Rojo', available: true },
      { color: 'Verde Militar', available: true },
    ]
  },
  {
    name: 'City Commuter',
    price: 2799000,
    images: ['/imgs/Bicis.webp'],
    category: 'bicicleta',
    inventoryCount: 20,
    tags: ['urbana', 'económica', 'plegable'],
    description: 'Bicicleta eléctrica compacta perfecta para la ciudad.',
    badge: 'Oferta',
    specs: [
      { label: 'Motor', value: '350W Brushless' },
      { label: 'Batería', value: '36V 10Ah' },
      { label: 'Autonomía', value: 'Hasta 45 km' },
    ],
  },
  {
    name: 'Cargo Pro XL',
    price: 6499000,
    images: ['/imgs/Bicis.webp'],
    category: 'bicicleta',
    inventoryCount: 5,
    tags: ['carga', 'familiar', 'comercial'],
    description: 'Bicicleta de carga eléctrica con capacidad para 150kg.',
    specs: [
      { label: 'Motor', value: '1000W Mid-Drive' },
      { label: 'Capacidad carga', value: '150 kg' },
    ],
  },
  {
    name: 'Sport Racing Elite',
    price: 4899000,
    images: ['/imgs/Bicis.webp'],
    category: 'bicicleta',
    inventoryCount: 12,
    tags: ['deportiva', 'velocidad', 'carbono'],
    description: 'Bicicleta eléctrica deportiva con cuadro de fibra de carbono.',
    popular: true,
    specs: [
      { label: 'Motor', value: '600W High Torque' },
      { label: 'Cuadro', value: 'Fibra de Carbono' },
    ],
  },
  {
    name: 'Vintage Cruiser',
    price: 3199000,
    images: ['/imgs/Bicis.webp'],
    category: 'bicicleta',
    inventoryCount: 0,
    tags: ['retro', 'confort', 'urbana'],
    description: 'Diseño clásico con tecnología moderna.',
    specs: [
      { label: 'Motor', value: '250W Trasero' },
      { label: 'Estilo', value: 'Vintage' },
    ],
  },
  {
    name: 'Thunder X Pro',
    price: 2499000,
    images: ['/imgs/Patineta-Evobike.webp'],
    category: 'scooter',
    inventoryCount: 18,
    tags: ['potente', 'autonomía', 'premium'],
    description: 'Scooter eléctrico de alto rendimiento con motor dual.',
    badge: 'Nuevo',
    popular: true,
    specs: [
      { label: 'Motor', value: 'Dual 500W' },
      { label: 'Autonomía', value: 'Hasta 65 km' },
    ],
  },
  {
    name: 'Urban Lite',
    price: 1599000,
    images: ['/imgs/Patineta-Evobike.webp'],
    category: 'scooter',
    inventoryCount: 25,
    tags: ['ligero', 'portátil', 'económico'],
    description: 'Scooter compacto y ligero, ideal para la última milla.',
    badge: 'Oferta',
    specs: [
      { label: 'Motor', value: '250W' },
      { label: 'Peso', value: '11 kg' },
    ],
  },
  {
    name: 'Speed Demon',
    price: 3299000,
    images: ['/imgs/Patineta-Evobike.webp'],
    category: 'scooter',
    inventoryCount: 10,
    tags: ['velocidad', 'potencia', 'deportivo'],
    description: 'El scooter más rápido de nuestra línea.',
    specs: [
      { label: 'Motor', value: '1000W Peak' },
      { label: 'Velocidad máx.', value: '55 km/h' },
    ],
  },
  {
    name: 'Family Cruiser',
    price: 1999000,
    images: ['/imgs/Patineta-Evobike.webp'],
    category: 'scooter',
    inventoryCount: 14,
    tags: ['confort', 'asiento', 'familiar'],
    description: 'Scooter con asiento cómodo, perfecto para paseos relajados.',
    specs: [
      { label: 'Motor', value: '350W' },
      { label: 'Asiento', value: 'Acolchado premium' },
    ],
  },
  {
    name: 'Off-Road Beast',
    price: 2899000,
    images: ['/imgs/Patineta-Evobike.webp'],
    category: 'scooter',
    inventoryCount: 0,
    tags: ['todo terreno', 'aventura', 'resistente'],
    description: 'Diseñado para terrenos difíciles.',
    specs: [
      { label: 'Motor', value: '800W' },
      { label: 'Neumáticos', value: '11" Off-road' },
    ],
  },
  {
    name: 'Mini Kids',
    price: 899000,
    images: ['/imgs/Patineta-Evobike.webp'],
    category: 'scooter',
    inventoryCount: 30,
    tags: ['niños', 'seguridad', 'aprendizaje'],
    description: 'Scooter eléctrico diseñado especialmente para niños.',
    specs: [
      { label: 'Motor', value: '150W' },
      { label: 'Velocidad máx.', value: '15 km/h' },
    ],
  },
  {
    name: 'Cargo Trike Pro',
    price: 5999000,
    images: ['/imgs/Triciclos.webp'],
    category: 'triciclo',
    inventoryCount: 6,
    tags: ['carga', 'estabilidad', 'comercial'],
    description: 'Triciclo de carga eléctrico con gran capacidad.',
    popular: true,
    specs: [
      { label: 'Motor', value: '750W Trasero' },
      { label: 'Capacidad', value: '200 kg' },
    ],
  },
  {
    name: 'Comfort Senior',
    price: 4299000,
    images: ['/imgs/Triciclos.webp'],
    category: 'triciclo',
    inventoryCount: 10,
    tags: ['confort', 'senior', 'estabilidad'],
    description: 'Triciclo eléctrico de máximo confort y estabilidad.',
    badge: 'Nuevo',
    specs: [
      { label: 'Motor', value: '500W' },
      { label: 'Asiento', value: 'Respaldo ajustable' },
    ],
  },
  {
    name: 'Food Truck Bike',
    price: 7499000,
    images: ['/imgs/Triciclos.webp'],
    category: 'triciclo',
    inventoryCount: 3,
    tags: ['comercial', 'food truck', 'negocio'],
    description: 'Triciclo especialmente diseñado para venta ambulante de comida.',
    specs: [
      { label: 'Motor', value: '1000W' },
      { label: 'Compartimento', value: 'Térmico 200L' },
    ],
  },
  {
    name: 'Family Trike',
    price: 4799000,
    images: ['/imgs/Triciclos.webp'],
    category: 'triciclo',
    inventoryCount: 8,
    tags: ['familiar', 'paseo', 'dos plazas'],
    description: 'Triciclo con capacidad para dos personas.',
    specs: [
      { label: 'Motor', value: '750W' },
      { label: 'Plazas', value: '2 personas' },
    ],
  },
  {
    name: 'Sport Trike',
    price: 5599000,
    images: ['/imgs/Triciclos.webp'],
    category: 'triciclo',
    inventoryCount: 0,
    tags: ['deportivo', 'aerodinámico', 'velocidad'],
    description: 'Triciclo deportivo de diseño aerodinámico.',
    specs: [
      { label: 'Motor', value: '1000W Mid-Drive' },
      { label: 'Velocidad máx.', value: '40 km/h' },
    ],
  },
  {
    name: 'Delivery Express',
    price: 6299000,
    images: ['/imgs/Triciclos.webp'],
    category: 'triciclo',
    inventoryCount: 12,
    tags: ['delivery', 'rápido', 'comercial'],
    description: 'Optimizado para servicios de delivery.',
    badge: 'Popular',
    specs: [
      { label: 'Motor', value: '1000W' },
      { label: 'Caja térmica', value: '150L' },
    ],
  },
];

async function main() {
  console.log('🌱 Iniciando seed...');

  await prisma.orderItem.deleteMany();
  await prisma.adminNotification.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  console.log('🗑️  Datos anteriores eliminados');

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log(`✅ ${products.length} productos creados`);

  const sampleOrder = await prisma.order.create({
    data: {
      orderNumber: 'EVB-2025-000001',
      status: 'PAID',
      customerName: 'Juan Pérez',
      email: 'juan@ejemplo.com',
      phone: '+57 300 123 4567',
      city: 'Bogotá',
      address: 'Calle 72 #10-51',
      paymentMethod: 'CARD',
      subtotal: 3499000,
      shipping: 0,
      tax: 664810,
      total: 4163810,
      items: {
        create: [
          {
            productId: (await prisma.product.findFirst({ where: { name: 'Urban X1 Pro' } }))!.id,
            nameSnapshot: 'Urban X1 Pro',
            priceSnapshot: 3499000,
            quantity: 1,
          },
        ],
      },
    },
  });

  console.log('✅ Orden de ejemplo creada');
  console.log('🎉 Seed completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });