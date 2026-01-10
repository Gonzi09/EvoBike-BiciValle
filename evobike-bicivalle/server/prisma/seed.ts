import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createUsers() {
  console.log('Creando usuarios...');

  const adminPassword = await bcrypt.hash('admin123', 10);
  const vendorPassword = await bcrypt.hash('vendor123', 10);

  await prisma.user.create({
    data: {
      email: 'admin@evobike.com',
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
      email: 'vendedor1@evobike.com',
      password: vendorPassword,
      name: 'Juan Vendedor',
      role: 'VENDOR',
      canManageInventory: false,
      canManageOrders: false,
      canManageUsers: false,
      canViewReports: false,
    },
  });

  await prisma.user.create({
    data: {
      email: 'vendedor2@evobike.com',
      password: vendorPassword,
      name: 'María Vendedora',
      role: 'VENDOR',
      canManageInventory: false,
      canManageOrders: false,
      canManageUsers: false,
      canViewReports: false,
    },
  });

  await prisma.user.create({
    data: {
      email: 'vendedor3@evobike.com',
      password: vendorPassword,
      name: 'Carlos Vendedor',
      role: 'VENDOR',
      canManageInventory: false,
      canManageOrders: false,
      canManageUsers: false,
      canViewReports: false,
    },
  });

  console.log('Usuarios creados:');
  console.log('   Admin: admin@evobike.com / admin123');
  console.log('   Vendedor 1: vendedor1@evobike.com / vendor123');
  console.log('   Vendedor 2: vendedor2@evobike.com / vendor123');
  console.log('   Vendedor 3: vendedor3@evobike.com / vendor123');
}

const products = [
  {
    name: 'VMP S5',
    price: 2100000,
    images: ['/imgs/Bicicletas/VMP-S5/Amarillo-Gris.jpg'],
    category: 'bicicleta',
    inventoryCount: 15,
    tags: ['urbana', 'económica', 'básica'],
    description: 'Bicicleta eléctrica VMP S5 ideal para uso urbano diario.',
    batteryType: 'FIJA',
    specs: [
      { label: 'Motor', value: '350W' },
      { label: 'Batería', value: '36V 10Ah' },
      { label: 'Autonomía', value: '40-50 km' },
    ],
    variants: [
      { color: 'Amarillo-Gris', image: '/imgs/Bicicletas/VMP-S5/Amarillo-Gris.jpg', available: true },
      { color: 'Amarillo-Verde', image: '/imgs/Bicicletas/VMP-S5/Amarillo-Verde.jpg', available: true },
      { color: 'Azul-Rojo', image: '/imgs/Bicicletas/VMP-S5/Azul-Rojo.jpg', available: true },
      { color: 'Naranja-Azul', image: '/imgs/Bicicletas/VMP-S5/Naranja-Azul.jpg', available: true },
      { color: 'Verde-Rojo', image: '/imgs/Bicicletas/VMP-S5/Verde-Rojo.jpg', available: true },
    ]
  },
  {
    name: 'Sol',
    price: 2400000,
    images: ['/imgs/Bicicletas/Sol/Gris.jpg'],
    category: 'bicicleta',
    inventoryCount: 12,
    tags: ['urbana', 'confort', 'versátil'],
    description: 'Bicicleta eléctrica Sol con diseño ergonómico y múltiples opciones de color.',
    batteryType: 'FIJA',
    specs: [
      { label: 'Motor', value: '350W' },
      { label: 'Batería', value: '36V 12Ah' },
      { label: 'Autonomía', value: '45-55 km' },
    ],
    variants: [
      { color: 'Gris', image: '/imgs/Bicicletas/Sol/Gris.jpg', available: true },
      { color: 'Negro', image: '/imgs/Bicicletas/Sol/Negro.jpg', available: true },
      { color: 'Rojo/Red', image: '/imgs/Bicicletas/Sol/Rojo-Red.jpg', available: true },
      { color: 'Rosado', image: '/imgs/Bicicletas/Sol/Rosado.jpg', available: true },
      { color: 'Verde', image: '/imgs/Bicicletas/Sol/Verde.jpg', available: true },
      { color: 'Café', image: '/imgs/Bicicletas/Sol/Cafe.jpg', available: true },
      { color: 'Blanco', image: '/imgs/Bicicletas/Sol/Blanco.jpg', available: true },
      { color: 'Azul', image: '/imgs/Bicicletas/Sol/Azul.jpg', available: true },
    ]
  },
  {
    name: 'Sol Pro',
    price: 2500000,
    images: ['/imgs/Bicicletas/Sol-Pro/Amarillo.jpg'],
    category: 'bicicleta',
    inventoryCount: 10,
    tags: ['urbana', 'mejorada', 'popular'],
    description: 'Versión mejorada de la Sol con mejor autonomía y rendimiento.',
    batteryType: 'FIJA',
    popular: true,
    specs: [
      { label: 'Motor', value: '500W' },
      { label: 'Batería', value: '48V 13Ah' },
      { label: 'Autonomía', value: '50-60 km' },
    ],
    variants: [
      { color: 'AMARILLO', image: '/imgs/Bicicletas/Sol-Pro/Amarillo.jpg', available: true },
      { color: 'ROSA', image: '/imgs/Bicicletas/Sol-Pro/Rosa.jpg', available: true },
      { color: 'AZUL', image: '/imgs/Bicicletas/Sol-Pro/Azul.jpg', available: true },
      { color: 'NEGRO', image: '/imgs/Bicicletas/Sol-Pro/Negro.jpg', available: true },
      { color: 'VERDE', image: '/imgs/Bicicletas/Sol-Pro/Verde.jpg', available: true },
    ]
  },
  {
    name: 'Primavera',
    price: 2640000,
    images: ['/imgs/Bicicletas/Primavera/Blanco.jpg'],
    category: 'bicicleta',
    inventoryCount: 8,
    tags: ['elegante', 'urbana', 'femenina'],
    description: 'Bicicleta eléctrica Primavera con diseño elegante y suave.',
    batteryType: 'FIJA',
    specs: [
      { label: 'Motor', value: '350W' },
      { label: 'Batería', value: '36V 12Ah' },
      { label: 'Autonomía', value: '45-55 km' },
    ],
    variants: [
      { color: 'Blanco', image: '/imgs/Bicicletas/Primavera/Blanco.jpg', available: true },
      { color: 'Beige Café', image: '/imgs/Bicicletas/Primavera/Beige-Cafe.jpg', available: true },
      { color: 'Rosado', image: '/imgs/Bicicletas/Primavera/Rosado.jpg', available: true },
      { color: 'Verde', image: '/imgs/Bicicletas/Primavera/Verde.jpg', available: true },
    ]
  },
  {
    name: 'Lumo',
    price: 2800000,
    images: ['/imgs/Bicicletas/Lumo/Fucsia.jpg'],
    category: 'bicicleta',
    inventoryCount: 9,
    tags: ['urbana', 'compacta', 'moderna'],
    description: 'Bicicleta eléctrica Lumo con colores vibrantes y diseño moderno.',
    batteryType: 'FIJA',
    specs: [
      { label: 'Motor', value: '350W' },
      { label: 'Batería', value: '36V 10Ah' },
      { label: 'Autonomía', value: '40-50 km' },
    ],
    variants: [
      { color: 'Rojo/Red', image: '/imgs/Bicicletas/Lumo/Rojo-Red.jpg', available: true },
      { color: 'FUCSIA', image: '/imgs/Bicicletas/Lumo/Fucsia.jpg', available: true },
      { color: 'VERDE', image: '/imgs/Bicicletas/Lumo/Verde.jpg', available: true },
      { color: 'Verde Manzana', image: '/imgs/Bicicletas/Lumo/Verde-Manzana.jpg', available: true },
      { color: 'ROSA', image: '/imgs/Bicicletas/Lumo/Rosa.jpg', available: true },
    ]
  },
  {
    name: 'Galaxy',
    price: 2900000,
    images: ['/imgs/Bicicletas/Galaxy/Gris.jpg'],
    category: 'bicicleta',
    inventoryCount: 14,
    tags: ['urbana', 'versátil', 'confiable'],
    description: 'Bicicleta eléctrica Galaxy con excelente relación calidad-precio.',
    batteryType: 'FIJA',
    specs: [
      { label: 'Motor', value: '500W' },
      { label: 'Batería', value: '48V 12Ah' },
      { label: 'Autonomía', value: '50-60 km' },
    ],
    variants: [
      { color: 'Gris', image: '/imgs/Bicicletas/Galaxy/Gris.jpg', available: true },
      { color: 'Negro', image: '/imgs/Bicicletas/Galaxy/Negro.jpg', available: true },
      { color: 'Amarillo', image: '/imgs/Bicicletas/Galaxy/Amarillo.jpg', available: true },
      { color: 'Blanco', image: '/imgs/Bicicletas/Galaxy/Blanco.jpg', available: true },
      { color: 'Azul', image: '/imgs/Bicicletas/Galaxy/Azul.jpg', available: true },
      { color: 'Tornasol', image: '/imgs/Bicicletas/Galaxy/Tornasol.jpg', available: true },
    ]
  },
  {
    name: 'Urban',
    price: 3300000,
    images: ['/imgs/Bicicletas/Urban/Blanco.jpg'],
    category: 'bicicleta',
    inventoryCount: 11,
    tags: ['urbana', 'premium', 'estilo'],
    description: 'Bicicleta eléctrica Urban diseñada para la ciudad con estilo y comodidad.',
    batteryType: 'FIJA',
    popular: true,
    specs: [
      { label: 'Motor', value: '500W' },
      { label: 'Batería', value: '48V 15Ah' },
      { label: 'Autonomía', value: '60-70 km' },
    ],
    variants: [
      { color: 'Blanco', image: '/imgs/Bicicletas/Urban/Blanco.jpg', available: true },
      { color: 'Gris', image: '/imgs/Bicicletas/Urban/Gris.jpg', available: true },
      { color: 'Azul', image: '/imgs/Bicicletas/Urban/Azul.jpg', available: true },
      { color: 'Azul Verde', image: '/imgs/Bicicletas/Urban/Azul-Verde.jpg', available: true },
      { color: 'Café Beige', image: '/imgs/Bicicletas/Urban/Cafe-Beige.jpg', available: true },
      { color: 'Negro', image: '/imgs/Bicicletas/Urban/Negro.jpg', available: true },
      { color: 'Rojo Blanco', image: '/imgs/Bicicletas/Urban/Rojo-Blanco.jpg', available: true },
    ]
  },
  {
    name: 'Rayo',
    price: 3450000,
    images: ['/imgs/Bicicletas/Rayo/Blanco.jpg'],
    category: 'bicicleta',
    inventoryCount: 7,
    tags: ['deportiva', 'velocidad', 'dinámica'],
    description: 'Bicicleta eléctrica Rayo para quienes buscan velocidad y agilidad.',
    batteryType: 'FIJA',
    specs: [
      { label: 'Motor', value: '500W' },
      { label: 'Batería', value: '48V 13Ah' },
      { label: 'Autonomía', value: '55-65 km' },
      { label: 'Velocidad máx.', value: '35 km/h' },
    ],
    variants: [
      { color: 'Azul', image: '/imgs/Bicicletas/Rayo/Azul.jpg', available: true },
      { color: 'Blanco', image: '/imgs/Bicicletas/Rayo/Blanco.jpg', available: true },
      { color: 'Gris Tornasol', image: '/imgs/Bicicletas/Rayo/Gris-Tornasol.jpg', available: true },
      { color: 'Negro', image: '/imgs/Bicicletas/Rayo/Negro.jpg', available: true },
    ]
  },
  {
    name: 'Rayo Pro',
    price: 3600000,
    images: ['/imgs/Bicicletas/Rayo-Pro/Amarillo.jpg'],
    category: 'bicicleta',
    inventoryCount: 6,
    tags: ['deportiva', 'premium', 'alto rendimiento'],
    description: 'Versión Pro de la Rayo con mejores componentes y rendimiento superior.',
    batteryType: 'FIJA',
    popular: true,
    specs: [
      { label: 'Motor', value: '750W' },
      { label: 'Batería', value: '48V 20Ah' },
      { label: 'Autonomía', value: '70-85 km' },
      { label: 'Velocidad máx.', value: '40 km/h' },
    ],
    variants: [
      { color: 'Amarillo', image: '/imgs/Bicicletas/Rayo-Pro/Amarillo.jpg', available: true },
      { color: 'Blanco', image: '/imgs/Bicicletas/Rayo-Pro/Blanco.jpg', available: true },
      { color: 'Café Beige', image: '/imgs/Bicicletas/Rayo-Pro/Cafe-Beige.jpg', available: true },
      { color: 'Negro', image: '/imgs/Bicicletas/Rayo-Pro/Negro.jpg', available: true },
      { color: 'Rojo/Red', image: '/imgs/Bicicletas/Rayo-Pro/Rojo-Red.jpg', available: true },
      { color: 'Verde Militar', image: '/imgs/Bicicletas/Rayo-Pro/Verde-Militar.jpg', available: true },
    ]
  },
  {
    name: 'Galaxy Plus',
    price: 3600000,
    images: ['/imgs/Bicicletas/Galaxy-Plus/Amarillo.jpg'],
    category: 'bicicleta',
    inventoryCount: 9,
    tags: ['urbana', 'mejorada', 'popular'],
    description: 'Galaxy Plus con características mejoradas y mayor autonomía.',
    batteryType: 'FIJA',
    specs: [
      { label: 'Motor', value: '500W' },
      { label: 'Batería', value: '48V 15Ah' },
      { label: 'Autonomía', value: '60-70 km' },
    ],
    variants: [
      { color: 'Gris', image: '/imgs/Bicicletas/Galaxy-Plus/Gris.jpg', available: true },
      { color: 'Amarillo', image: '/imgs/Bicicletas/Galaxy-Plus/Amarillo.jpg', available: true },
      { color: 'Blanco', image: '/imgs/Bicicletas/Galaxy-Plus/Blanco.jpg', available: true },
      { color: 'Tornasol', image: '/imgs/Bicicletas/Galaxy-Plus/Tornasol.jpg', available: true },
      { color: 'Verde', image: '/imgs/Bicicletas/Galaxy-Plus/Verde.jpg', available: true },
    ]
  },
  {
    name: 'Moped',
    price: 3800000,
    images: ['/imgs/Bicicletas/Moped/Verde.jpg'],
    category: 'bicicleta',
    inventoryCount: 8,
    tags: ['potente', 'estilo scooter', 'cómoda'],
    description: 'Bicicleta eléctrica estilo Moped con asiento amplio y gran comodidad.',
    batteryType: 'FIJA',
    specs: [
      { label: 'Motor', value: '500W' },
      { label: 'Batería', value: '48V 15Ah' },
      { label: 'Autonomía', value: '60-70 km' },
      { label: 'Asiento', value: 'Amplio acolchado' },
    ],
    variants: [
      { color: 'VERDE', image: '/imgs/Bicicletas/Moped/Verde.jpg', available: true },
      { color: 'AMARILLO', image: '/imgs/Bicicletas/Moped/Amarillo.jpg', available: true },
      { color: 'MORADA', image: '/imgs/Bicicletas/Moped/Morada.jpg', available: true },
      { color: 'ROSA', image: '/imgs/Bicicletas/Moped/Rosa.jpg', available: true },
      { color: 'AZUL', image: '/imgs/Bicicletas/Moped/Azul.jpg', available: true },
      { color: 'FUCSIA', image: '/imgs/Bicicletas/Moped/Fucsia.jpg', available: true },
    ]
  },
  {
    name: 'Jaguar',
    price: 3900000,
    images: ['/imgs/Bicicletas/Jaguar/Naranja.jpg'],
    category: 'bicicleta',
    inventoryCount: 7,
    tags: ['deportiva', 'ágil', 'potente'],
    description: 'Bicicleta eléctrica Jaguar con capacidad de carga de hasta 150 kg.',
    batteryType: 'FIJA',
    specs: [
      { label: 'Motor', value: '500W' },
      { label: 'Batería', value: '48V 15Ah' },
      { label: 'Autonomía', value: '60-70 km' },
      { label: 'Capacidad', value: '150 kg' },
    ],
    variants: [
      { color: 'Naranja', image: '/imgs/Bicicletas/Jaguar/Naranja.jpg', available: true },
      { color: 'Gris', image: '/imgs/Bicicletas/Jaguar/Gris.jpg', available: true },
      { color: 'Morado', image: '/imgs/Bicicletas/Jaguar/Morado.jpg', available: true },
      { color: 'Verde', image: '/imgs/Bicicletas/Jaguar/Verde.jpg', available: true },
    ]
  },
  {
    name: 'Reina',
    price: 3950000,
    images: ['/imgs/Bicicletas/Reina/Rojo-Negro.jpg'],
    category: 'bicicleta',
    inventoryCount: 5,
    tags: ['premium', 'elegante', 'potente'],
    description: 'Bicicleta eléctrica Reina con diseño exclusivo y acabados premium.',
    batteryType: 'FIJA',
    specs: [
      { label: 'Motor', value: '500W' },
      { label: 'Batería', value: '48V 15Ah' },
      { label: 'Autonomía', value: '65-75 km' },
    ],
    variants: [
      { color: 'Rojo/Negro', image: '/imgs/Bicicletas/Reina/Rojo-Negro.jpg', available: true },
      { color: 'Verde/Blanco', image: '/imgs/Bicicletas/Reina/Verde-Blanco.jpg', available: true },
      { color: 'Café/Blanco', image: '/imgs/Bicicletas/Reina/Cafe-Blanco.jpg', available: true },
      { color: 'Azul/Rosado', image: '/imgs/Bicicletas/Reina/Azul-Rosado.jpg', available: true },
      { color: 'Azul/Rojo', image: '/imgs/Bicicletas/Reina/Azul-Rojo.jpg', available: true },
      { color: 'Naranja/Gris', image: '/imgs/Bicicletas/Reina/Naranja-Gris.jpg', available: true },
    ]
  },
  {
    name: 'Águila',
    price: 4000000,
    images: ['/imgs/Bicicletas/Aguila/Rojo-Negro.jpg'],
    category: 'bicicleta',
    inventoryCount: 6,
    tags: ['batería extraíble', 'práctica', 'versátil'],
    description: 'Bicicleta eléctrica Águila con batería extraíble para mayor comodidad.',
    batteryType: 'EXTRAIBLE',
    badge: 'Batería Extraíble',
    specs: [
      { label: 'Motor', value: '500W' },
      { label: 'Batería', value: '48V 13Ah Extraíble' },
      { label: 'Autonomía', value: '55-65 km' },
      { label: 'Tipo batería', value: 'Extraíble' },
    ],
    variants: [
      { color: 'Rojo/Negro', image: '/imgs/Bicicletas/Aguila/Rojo-Negro.jpg', available: true },
      { color: 'Verde/Blanco', image: '/imgs/Bicicletas/Aguila/Verde-Blanco.jpg', available: true },
      { color: 'Café/Blanco', image: '/imgs/Bicicletas/Aguila/Cafe-Blanco.jpg', available: true },
      { color: 'Azul/Rosado', image: '/imgs/Bicicletas/Aguila/Azul-Rosado.jpg', available: true },
      { color: 'Azul/Rojo', image: '/imgs/Bicicletas/Aguila/Azul-Rojo.jpg', available: true },
      { color: 'Naranja/Gris', image: '/imgs/Bicicletas/Aguila/Naranja-Gris.jpg', available: true },
    ]
  },
  {
    name: 'Tauro',
    price: 4000000,
    images: ['/imgs/Bicicletas/Tauro/Verde-Manzana.jpg'],
    category: 'bicicleta',
    inventoryCount: 8,
    tags: ['robusta', 'potente', 'resistente'],
    description: 'Bicicleta eléctrica Tauro de construcción robusta y gran durabilidad.',
    batteryType: 'FIJA',
    specs: [
      { label: 'Motor', value: '750W' },
      { label: 'Batería', value: '48V 15Ah' },
      { label: 'Autonomía', value: '60-75 km' },
    ],
    variants: [
      { color: 'Negro', image: '/imgs/Bicicletas/Tauro/Negro.jpg', available: true },
      { color: 'Rojo/Red', image: '/imgs/Bicicletas/Tauro/Rojo-Red.jpg', available: true },
      { color: 'Verde Manzana', image: '/imgs/Bicicletas/Tauro/Verde-Manzana.jpg', available: true },
      { color: 'Verde Militar', image: '/imgs/Bicicletas/Tauro/Verde-Militar.jpg', available: true },
      { color: 'Naranja/Beige', image: '/imgs/Bicicletas/Tauro/Naranja-Beige.jpg', available: true },
    ]
  },
  {
    name: 'Aurora',
    price: 4050000,
    images: ['/imgs/Bicicletas/Aurora/Blanco.jpg'],
    category: 'bicicleta',
    inventoryCount: 5,
    tags: ['elegante', 'premium', 'distintiva'],
    description: 'Bicicleta eléctrica Aurora que se distingue por su excelente equilibrio entre diseño y potencia.',
    batteryType: 'FIJA',
    specs: [
      { label: 'Motor', value: '500W' },
      { label: 'Batería', value: '48V 15Ah' },
      { label: 'Autonomía', value: '60-70 km' },
    ],
    variants: [
      { color: 'Blanco', image: '/imgs/Bicicletas/Aurora/Blanco.jpg', available: true },
      { color: 'Verde', image: '/imgs/Bicicletas/Aurora/Verde.jpg', available: true },
      { color: 'Verde Tornasol', image: '/imgs/Bicicletas/Aurora/Verde-Tornasol.jpg', available: true },
      { color: 'Gris', image: '/imgs/Bicicletas/Aurora/Gris.jpg', available: true },
      { color: 'Negro', image: '/imgs/Bicicletas/Aurora/Negro.jpg', available: true },
    ]
  },
  {
    name: 'Polar',
    price: 4200000,
    images: ['/imgs/Bicicletas/Polar/Azul.jpg'],
    category: 'bicicleta',
    inventoryCount: 7,
    tags: ['premium', 'potente', 'versátil'],
    description: 'Bicicleta eléctrica Polar con excelente desempeño en todo tipo de terreno.',
    batteryType: 'FIJA',
    specs: [
      { label: 'Motor', value: '750W' },
      { label: 'Batería', value: '48V 20Ah' },
      { label: 'Autonomía', value: '75-90 km' },
    ],
    variants: [
      { color: 'BLANCO', image: '/imgs/Bicicletas/Polar/Blanco.jpg', available: true },
      { color: 'GRIS', image: '/imgs/Bicicletas/Polar/Gris.jpg', available: true },
      { color: 'MORADO', image: '/imgs/Bicicletas/Polar/Morado.jpg', available: true },
      { color: 'NARANJA', image: '/imgs/Bicicletas/Polar/Naranja.jpg', available: true },
      { color: 'NEGRO', image: '/imgs/Bicicletas/Polar/Negro.jpg', available: true },
      { color: 'VERDE', image: '/imgs/Bicicletas/Polar/Verde.jpg', available: true },
      { color: 'AZUL', image: '/imgs/Bicicletas/Polar/Azul.jpg', available: true },
    ]
  },
  {
    name: 'Zeus',
    price: 4200000,
    images: ['/imgs/Bicicletas/Zeus/Zeus/Verde.jpg'],
    category: 'bicicleta',
    inventoryCount: 10,
    tags: ['premium', 'urbana', 'alto rendimiento'],
    description: 'Bicicleta eléctrica Zeus de alto rendimiento. Ofrece una experiencia de conducción segura y cómoda.',
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
      { label: 'Velocidad máx.', value: '35 km/h' },
      { label: 'Peso', value: '26 kg' },
      { label: 'Frenos', value: 'Disco mecánico' },
    ],
    variants: [
      { color: 'Verde', image: '/imgs/Bicicletas/Zeus/Zeus/Verde.jpg', available: true },
      { color: 'Morado', image: '/imgs/Bicicletas/Zeus/Zeus/Morada.jpg', available: true },
      { color: 'Gris', image: '/imgs/Bicicletas/Zeus/Zeus/Beige.jpg', available: true },
      { color: 'Beige', image: '/imgs/Bicicletas/Zeus/Zeus/Beige.jpg', available: true },
      { color: 'Azul', image: '/imgs/Bicicletas/Zeus/Zeus/Azul.jpg', available: true },
      { color: 'Rojo', image: '/imgs/Bicicletas/Zeus/Zeos/Roja.jpg', available: true },
    ]
  },
  {
    name: 'Águila Pro',
    price: 4200000,
    images: ['/imgs/Bicicletas/Aguila-Pro/Color1.jpg'],
    category: 'bicicleta',
    inventoryCount: 4,
    tags: ['batería extraíble', 'premium', 'avanzada'],
    description: 'Versión Pro de la Águila con batería extraíble y características mejoradas.',
    batteryType: 'EXTRAIBLE',
    badge: 'Batería Extraíble',
    specs: [
      { label: 'Motor', value: '750W' },
      { label: 'Batería', value: '48V 20Ah Extraíble' },
      { label: 'Autonomía', value: '70-85 km' },
      { label: 'Tipo batería', value: 'Extraíble' },
    ],
    variants: [
      { color: 'Color 1', image: '/imgs/Bicicletas/Aguila-Pro/Color1.jpg', available: true },
      { color: 'Color 2', image: '/imgs/Bicicletas/Aguila-Pro/Color2.jpg', available: true },
      { color: 'Color 3', image: '/imgs/Bicicletas/Aguila-Pro/Color3.jpg', available: true },
    ]
  },
  {
    name: 'Eclipse',
    price: 4350000,
    images: ['/imgs/Bicicletas/Eclipse/Azul.jpg'],
    category: 'bicicleta',
    inventoryCount: 6,
    tags: ['premium', 'deportiva', 'tecnología'],
    description: 'Bicicleta eléctrica Eclipse con tecnología avanzada y diseño moderno.',
    batteryType: 'FIJA',
    specs: [
      { label: 'Motor', value: '750W' },
      { label: 'Batería', value: '48V 20Ah' },
      { label: 'Autonomía', value: '75-90 km' },
    ],
    variants: [
      { color: 'Azul', image: '/imgs/Bicicletas/Eclipse/Azul.jpg', available: true },
      { color: 'Blanco', image: '/imgs/Bicicletas/Eclipse/Blanco.jpg', available: true },
      { color: 'Gris', image: '/imgs/Bicicletas/Eclipse/Gris.jpg', available: true },
      { color: 'Morado', image: '/imgs/Bicicletas/Eclipse/Morado.jpg', available: true },
      { color: 'Negro', image: '/imgs/Bicicletas/Eclipse/Negro.jpg', available: true },
      { color: 'Rojo/red', image: '/imgs/Bicicletas/Eclipse/Rojo-red.jpg', available: true },
    ]
  },
  {
    name: 'Leo',
    price: 4350000,
    images: ['/imgs/Bicicletas/Leo/Gris.jpg'],
    category: 'bicicleta',
    inventoryCount: 5,
    tags: ['premium', 'potente', 'confiable'],
    description: 'Bicicleta eléctrica Leo delantera como trasera. Su canasta ampliada.',
    batteryType: 'FIJA',
    specs: [
      { label: 'Motor', value: '750W' },
      { label: 'Batería', value: '48V 20Ah' },
      { label: 'Autonomía', value: '75-90 km' },
      { label: 'Canasta', value: 'Ampliada' },
    ],
    variants: [
      { color: 'Blanco', image: '/imgs/Bicicletas/Leo/Blanco.jpg', available: true },
      { color: 'Gris', image: '/imgs/Bicicletas/Leo/Gris.jpg', available: true },
      { color: 'Rojo/Red', image: '/imgs/Bicicletas/Leo/Rojo-Red.jpg', available: true },
      { color: 'Verde', image: '/imgs/Bicicletas/Leo/Verde.jpg', available: true },
      { color: 'Verde Militar', image: '/imgs/Bicicletas/Leo/Verde-Militar.jpg', available: true },
      { color: 'Café Beige', image: '/imgs/Bicicletas/Leo/Cafe-Beige.jpg', available: true },
      { color: 'Azul', image: '/imgs/Bicicletas/Leo/Azul.jpg', available: true },
    ]
  },
  {
    name: 'URBEX',
    price: 4500000,
    images: ['/imgs/Bicicletas/Urbex/Naranja.jpg'],
    category: 'bicicleta',
    inventoryCount: 4,
    tags: ['premium', 'urbana', 'exclusiva'],
    description: 'Bicicleta eléctrica URBEX de gama alta para la ciudad.',
    batteryType: 'FIJA',
    specs: [
      { label: 'Motor', value: '750W' },
      { label: 'Batería', value: '48V 20Ah' },
      { label: 'Autonomía', value: '80-95 km' },
    ],
    variants: [
      { color: 'Blanco', image: '/imgs/Bicicletas/Urbex/Blanco.jpg', available: true },
      { color: 'Naranja', image: '/imgs/Bicicletas/Urbex/Naranja.jpg', available: true },
      { color: 'Azul', image: '/imgs/Bicicletas/Urbex/Azul.jpg', available: true },
      { color: 'Verde', image: '/imgs/Bicicletas/Urbex/Verde.jpg', available: true },
    ]
  },
  {
    name: 'Tigre',
    price: 4500000,
    images: ['/imgs/Bicicletas/Tigre/Rojo.jpg'],
    category: 'bicicleta',
    inventoryCount: 5,
    tags: ['potente', 'deportiva', 'agresiva'],
    description: 'Bicicleta eléctrica Tigre con diseño agresivo y gran potencia.',
    batteryType: 'FIJA',
    specs: [
      { label: 'Motor', value: '750W' },
      { label: 'Batería', value: '48V 20Ah' },
      { label: 'Autonomía', value: '75-90 km' },
    ],
    variants: [
      { color: 'Rojo', image: '/imgs/Bicicletas/Tigre/Rojo.jpg', available: true },
      { color: 'Gris', image: '/imgs/Bicicletas/Tigre/Gris.jpg', available: true },
      { color: 'Morada', image: '/imgs/Bicicletas/Tigre/Morada.jpg', available: true },
      { color: 'Verde', image: '/imgs/Bicicletas/Tigre/Verde.jpg', available: true },
    ]
  },
  {
    name: 'Ryder Pro',
    price: 4650000,
    images: ['/imgs/Bicicletas/Ryder-Pro/Beige.jpg'],
    category: 'bicicleta',
    inventoryCount: 4,
    tags: ['premium', 'carga', 'capacidad'],
    description: 'Bicicleta eléctrica Ryder Pro con capacidad de carga de hasta 150 kg.',
    batteryType: 'FIJA',
    specs: [
      { label: 'Motor', value: '750W' },
      { label: 'Batería', value: '48V 20Ah' },
      { label: 'Autonomía', value: '70-85 km' },
      { label: 'Capacidad', value: '150 kg' },
    ],
    variants: [
      { color: 'Beige', image: '/imgs/Bicicletas/Ryder-Pro/Beige.jpg', available: true },
      { color: 'Blanco Naranja', image: '/imgs/Bicicletas/Ryder-Pro/Blanco-Naranja.jpg', available: true },
      { color: 'Blanco Verde', image: '/imgs/Bicicletas/Ryder-Pro/Blanco-Verde.jpg', available: true },
      { color: 'Blanco Fucsia', image: '/imgs/Bicicletas/Ryder-Pro/Blanco-Fucsia.jpg', available: true },
      { color: 'Morado', image: '/imgs/Bicicletas/Ryder-Pro/Morado.jpg', available: true },
      { color: 'Verde', image: '/imgs/Bicicletas/Ryder-Pro/Verde.jpg', available: true },
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
    where: { email: 'admin@evobike.com' },
  });

  const sampleProduct = await prisma.product.findFirst({
    where: { name: 'Zeus' },
  });

  if (adminUser && sampleProduct) {
    await prisma.order.create({
      data: {
        orderNumber: 'EVB-2025-000001',
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
  console.log('   Admin: admin@evobike.com / admin123');
  console.log('   Vendedor: vendedor1@evobike.com / vendor123');
  console.log('');
  console.log('Master Password: EvoBike2025!SecretDev');
}

main()
  .catch((e) => {
    console.error('Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });