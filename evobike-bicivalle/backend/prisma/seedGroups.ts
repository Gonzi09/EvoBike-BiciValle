import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const groups = [
  { slug: 'aguila-pro', displayName: 'Aguila Pro', category: 'bicicleta', variants: [
    { siigoCode: 'APBRA', colorLabel: 'Blanco/Rojo/Azul' },
    { siigoCode: 'APMV', colorLabel: 'Morado/Verde' },
    { siigoCode: 'ATR', colorLabel: 'Turquesa/Rojo' },
    { siigoCode: 'AAR', colorLabel: 'Amarillo/Rojo' },
    { siigoCode: 'AAB', colorLabel: 'Amarillo/Negro' },
    { siigoCode: 'AAG', colorLabel: 'Azul/Gris' },
    { siigoCode: 'AGLAPRO', colorLabel: 'Principal' },
  ]},
  { slug: 'sol-pro', displayName: 'Sol Pro', category: 'bicicleta', variants: [
    { siigoCode: 'SPROAR', colorLabel: 'Azul/Rojo' },
    { siigoCode: 'SPRONR', colorLabel: 'Negro/Rojo' },
    { siigoCode: 'SPROG', colorLabel: 'Gris/Amarillo' },
    { siigoCode: 'SPVRDE', colorLabel: 'Verde' },
    { siigoCode: 'SPRO', colorLabel: 'Gris' },
    { siigoCode: 'SP', colorLabel: 'Azul' },
  ]},
  { slug: 'tifon', displayName: 'Tifon', category: 'bicicleta', variants: [
    { siigoCode: 'TFN', colorLabel: 'Blanco/Rojo' },
    { siigoCode: 'TNN', colorLabel: 'Negro/Naranja' },
    { siigoCode: 'TAT', colorLabel: 'Azul/Turquesa' },
    { siigoCode: 'TAVM', colorLabel: 'Azul/Verde Manzana' },
    { siigoCode: 'TAB', colorLabel: 'Azul Claro/Blanco' },
    { siigoCode: 'TBB', colorLabel: 'Beige/Blanco' },
    { siigoCode: 'TVR', colorLabel: 'Verde/Rojo' },
  ]},
  { slug: 'voltiero', displayName: 'Voltiero', category: 'bicicleta', variants: [
    { siigoCode: 'VR', colorLabel: 'Rojo' },
    { siigoCode: 'VN', colorLabel: 'Naranja' },
    { siigoCode: 'VAV', colorLabel: 'Azul/Verde' },
    { siigoCode: 'VAC', colorLabel: 'Azul/Café' },
    { siigoCode: 'VTRO', colorLabel: 'Rosado/Rojo' },
  ]},
  { slug: 'family-q', displayName: 'Family Q', category: 'triciclo', variants: [
    { siigoCode: 'FQM', colorLabel: 'Morado' },
    { siigoCode: 'FQV', colorLabel: 'Verde' },
    { siigoCode: 'FQVM', colorLabel: 'Verde Manzana' },
    { siigoCode: 'FQG', colorLabel: 'Gris' },
    { siigoCode: 'FMLYQA', colorLabel: 'Azul' },
  ]},
  { slug: 'family', displayName: 'Family', category: 'triciclo', variants: [
    { siigoCode: 'FMLY', colorLabel: 'Principal' },
  ]},
  { slug: 'family-plus', displayName: 'Family Plus', category: 'triciclo', variants: [
    { siigoCode: 'FMLYPL', colorLabel: 'Principal' },
  ]},
  { slug: 'family-q-plus', displayName: 'Family Q Plus', category: 'triciclo', variants: [
    { siigoCode: 'FMLYQPL', colorLabel: 'Principal' },
  ]},
  { slug: 'vmp-s5', displayName: 'VMP S5', category: 'bicicleta', variants: [
    { siigoCode: 'VM-S5', colorLabel: 'Azul/Rojo' },
    { siigoCode: 'VMPS5', colorLabel: 'Verde/Rojo' },
    { siigoCode: 'VMP-S5', colorLabel: 'Gris/Amarillo' },
    { siigoCode: 'S5', colorLabel: 'Amarillo/Verde' },
  ]},
  { slug: 'moped', displayName: 'Moped', category: 'bicicleta', variants: [
    { siigoCode: 'MPD', colorLabel: 'Principal' },
  ]},
  { slug: 'eclipse', displayName: 'Eclipse', category: 'bicicleta', variants: [
    { siigoCode: 'EPS', colorLabel: 'Azul' },
    { siigoCode: 'ECLPC', colorLabel: 'Negro' },
  ]},
  { slug: 'tigre', displayName: 'Tigre', category: 'bicicleta', variants: [
    { siigoCode: 'TIGRE', colorLabel: 'Morado' },
    { siigoCode: 'TGRE', colorLabel: 'Gris' },
  ]},
  { slug: 'urbex', displayName: 'Urbex', category: 'bicicleta', variants: [
    { siigoCode: 'UBX', colorLabel: 'Rojo' },
  ]},
  { slug: 'python', displayName: 'Python', category: 'bicicleta', variants: [
    { siigoCode: 'PTHN', colorLabel: 'Azul' },
  ]},
  { slug: 'evotank', displayName: 'Evotank', category: 'triciclo', variants: [
    { siigoCode: 'EVTNK', colorLabel: 'Azul' },
  ]},
  { slug: 'golf', displayName: 'Golf', category: 'triciclo', variants: [
    { siigoCode: 'GLF', colorLabel: 'Principal' },
  ]},
  { slug: 'golf-plus', displayName: 'Golf Plus', category: 'triciclo', variants: [
    { siigoCode: 'GLFPLS', colorLabel: 'Principal' },
  ]},
  { slug: 'cargo', displayName: 'Cargo', category: 'triciclo', variants: [
    { siigoCode: 'CRGO', colorLabel: 'Principal' },
  ]},
  { slug: 'ricochet', displayName: 'Ricochet', category: 'triciclo', variants: [
    { siigoCode: 'RCHT', colorLabel: 'Principal' },
  ]},
  { slug: 'galaxy', displayName: 'Galaxy', category: 'bicicleta', variants: [
    { siigoCode: 'GLXY', colorLabel: 'Principal' },
  ]},
  { slug: 'galaxy-plus', displayName: 'Galaxy Plus', category: 'bicicleta', variants: [
    { siigoCode: 'GLXYPL', colorLabel: 'Principal' },
  ]},
  { slug: 'ryder-pro', displayName: 'Ryder Pro', category: 'bicicleta', variants: [
    { siigoCode: 'RYDRPRO', colorLabel: 'Principal' },
  ]},
  { slug: 'aurora', displayName: 'Aurora', category: 'bicicleta', variants: [
    { siigoCode: 'ARRA', colorLabel: 'Principal' },
  ]},
  { slug: 'colorita', displayName: 'Colorita', category: 'bicicleta', variants: [
    { siigoCode: 'CLRTA', colorLabel: 'Vinotinto' },
  ]},
  { slug: 'reina', displayName: 'Reina', category: 'bicicleta', variants: [
    { siigoCode: 'RNA', colorLabel: 'Principal' },
  ]},
  { slug: 'polar', displayName: 'Polar', category: 'bicicleta', variants: [
    { siigoCode: 'PLR', colorLabel: 'Principal' },
  ]},
  { slug: 'jaguar', displayName: 'Jaguar', category: 'bicicleta', variants: [
    { siigoCode: 'JGR', colorLabel: 'Principal' },
  ]},
  { slug: 'lumo', displayName: 'Lumo', category: 'bicicleta', variants: [
    { siigoCode: 'LMO', colorLabel: 'Principal' },
  ]},
  { slug: 'leo', displayName: 'Leo', category: 'bicicleta', variants: [
    { siigoCode: 'LEO', colorLabel: 'Principal' },
  ]},
  { slug: 'tauro', displayName: 'Tauro', category: 'bicicleta', variants: [
    { siigoCode: 'TARO', colorLabel: 'Principal' },
  ]},
  { slug: 'mini-cross', displayName: 'Mini Cross', category: 'bicicleta', variants: [
    { siigoCode: 'MNCSRS', colorLabel: 'Morado' },
  ]},
  { slug: 'primavera', displayName: 'Primavera', category: 'bicicleta', variants: [
    { siigoCode: 'PRMVA', colorLabel: 'Principal' },
  ]},
  { slug: 'urban-plus', displayName: 'Urban Plus', category: 'bicicleta', variants: [
    { siigoCode: 'URBNPL', colorLabel: 'Principal' },
  ]},
  { slug: 'vmp-s6', displayName: 'VMP S6', category: 'bicicleta', variants: [
    { siigoCode: 'S6', colorLabel: 'Principal' },
  ]},
]

async function main() {
  console.log('Seeding product groups...')

  for (const group of groups) {
    const { variants, ...groupData } = group

    const created = await prisma.productGroup.upsert({
      where: { slug: groupData.slug },
      update: groupData,
      create: groupData,
    })

    for (const variant of variants) {
      await prisma.productVariant.upsert({
        where: { siigoCode: variant.siigoCode },
        update: { ...variant, groupId: created.id },
        create: { ...variant, groupId: created.id },
      })
    }

    console.log(`✓ ${groupData.displayName}`)
  }

  console.log('Done!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
