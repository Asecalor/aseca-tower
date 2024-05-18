import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const names = [
    'John',
    'Emma',
    'Michael',
    'Sophia',
    'William',
    'Olivia',
    'James',
    'Amelia',
    'Alexander',
    'Charlotte',
    'Ethan',
    'Ava',
    'Daniel',
    'Mia',
    'Benjamin',
    'Isabella',
    'Jacob',
    'Evelyn',
    'Matthew',
    'Harper',
    'David',
    'Abigail',
    'Joseph',
    'Emily',
    'Logan',
    'Elizabeth',
    'Jackson',
    'Ella',
    'Samuel',
    'Grace',
    'Henry',
    'Chloe',
    'Gabriel',
    'Avery',
    'Carter',
    'Sofia',
    'Dylan',
    'Madison',
    'Luke',
    'Lily',
    'Nathan',
    'Victoria',
    'Isaac',
    'Aria',
    'Owen',
    'Scarlett',
    'Wyatt',
    'Zoe',
  ];

  const lastNames = [
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Garcia',
    'Miller',
    'Davis',
    'Rodriguez',
    'Martinez',
    'Hernandez',
    'Lopez',
    'Gonzalez',
    'Wilson',
    'Anderson',
    'Thomas',
    'Taylor',
    'Moore',
    'Jackson',
    'Martin',
    'Lee',
    'Perez',
    'Thompson',
    'White',
    'Harris',
    'Sanchez',
    'Clark',
    'Ramirez',
    'Lewis',
    'Robinson',
    'Walker',
    'Young',
    'Allen',
    'King',
    'Wright',
    'Scott',
    'Torres',
    'Nguyen',
    'Hill',
    'Flores',
    'Green',
    'Adams',
    'Nelson',
    'Baker',
    'Hall',
    'Rivera',
    'Campbell',
    'Mitchell',
  ];

  // Direcciones
  const streets = [
    'Main Street',
    'First Avenue',
    'Elm Street',
    'Maple Avenue',
    'Park Avenue',
    'Oak Street',
    'Cedar Avenue',
    'Pine Street',
    'High Street',
    'Washington Avenue',
    'Broad Street',
    'Chestnut Street',
    'Market Street',
    'Cherry Street',
    'Madison Avenue',
    'Spring Street',
    'Grant Avenue',
    'Central Avenue',
    'Lake Street',
    'Hill Street',
    'Front Street',
    'Water Street',
    'State Street',
    'Church Street',
    'Park Street',
    'College Street',
    'Elm Avenue',
    'River Road',
    'Mill Street',
    'Grove Street',
    'Smith Street',
    'Sunset Avenue',
    'Main Avenue',
    'Forest Avenue',
    'Adams Street',
    'Pearl Street',
    'Prospect Avenue',
    'Harrison Street',
    'Meadow Lane',
    'Valley Road',
    'School Street',
    'Crescent Street',
    'Highland Avenue',
    'Franklin Street',
    'Maple Street',
    'Union Street',
    'Columbia Street',
    'Brookside Avenue',
  ];

  const cities = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio',
    'San Diego',
    'Dallas',
    'San Jose',
    'Austin',
    'Jacksonville',
    'San Francisco',
    'Indianapolis',
    'Columbus',
    'Fort Worth',
    'Charlotte',
    'Seattle',
    'Denver',
    'Washington',
    'Boston',
    'El Paso',
    'Nashville',
    'Detroit',
    'Oklahoma City',
    'Portland',
    'Las Vegas',
    'Memphis',
    'Louisville',
    'Baltimore',
    'Milwaukee',
    'Albuquerque',
    'Tucson',
    'Fresno',
    'Sacramento',
    'Mesa',
    'Kansas City',
    'Atlanta',
    'Long Beach',
    'Colorado Springs',
    'Raleigh',
    'Miami',
    'Virginia Beach',
    'Omaha',
    'Oakland',
    'Minneapolis',
    'Tulsa',
    'Arlington',
    'New Orleans',
    'Wichita',
  ];

  function generateRandomAddress() {
    return `${getRandomInt(1, 100)} ${streets[getRandomInt(0, streets.length - 1)]}, ${cities[getRandomInt(0, cities.length - 1)]}`;
  }

  async function generateUniqueEmail(prefix: string) {
    let email = `${prefix}_${getRandomInt(1, 100)}@example.com`;
    while (await prisma.client.findFirst({ where: { email } })) {
      email = `${prefix}_${getRandomInt(1, 100)}@example.com`;
    }
    return email;
  }

  const productNames = [
    'iPhone',
    'Samsung Galaxy',
    'PlayStation',
    'Xbox',
    'MacBook',
    'Nike Air Max',
    'Adidas Ultraboost',
    'Canon EOS',
    'Sony Bravia',
    'Nintendo Switch',
    'GoPro Hero',
    'Bose Noise Cancelling Headphones',
    'Fitbit Charge',
    'Dyson Vacuum Cleaner',
    'Instant Pot',
    'Yeti Cooler',
    'Patagonia Jacket',
    'Weber Grill',
    'Le Creuset Dutch Oven',
    'Nespresso Machine',
    'Vitamix Blender',
    'Fujifilm Instax',
    'Roku Streaming Stick',
    'Lego Star Wars Set',
    'Amazon Echo',
    'Sonos Speaker',
    'Keurig Coffee Maker',
    'Cuisinart Food Processor',
    'Breville Toaster Oven',
    'KitchenAid Stand Mixer',
    'DJI Drone',
    'Garmin GPS Watch',
    'Arcteryx Backpack',
    'Birkenstock Sandals',
    'Columbia Hiking Boots',
    'Thule Roof Rack',
    'Osprey Backpack',
    'Marmot Tent',
    'The North Face Sleeping Bag',
    'Eagle Creek Luggage',
    'Tumi Travel Backpack',
    'Samsonite Suitcase',
    'Rimowa Cabin Luggage',
    'Victorinox Swiss Army Knife',
    'Maglite Flashlight',
    'Coleman Lantern',
    'Black Diamond Headlamp',
    'Petzl Climbing Harness',
    'Yerba Canarias',
    'Mate Taragüi',
  ];

  for (let i = 0; i < 50; i++) {
    await prisma.product.create({
      data: {
        name: productNames[i],
      },
    });
  }
  for (let i = 0; i < 50; i++) {
    const name = `${names[getRandomInt(0, names.length - 1)]} ${lastNames[getRandomInt(0, lastNames.length - 1)]}`;
    const email = await generateUniqueEmail(
      `provider_${name.replace(/\s/g, '_').toLowerCase()}`,
    );
    await prisma.provider.upsert({
      where: { id: i + 1 },
      update: {},
      create: {
        id: i + 1,
        name: name.split(' ')[0],
        lastName: name.split(' ')[1],
        email: email,
      },
    });
  }

  // Crear 50 clientes o actualizar si ya existen
  for (let i = 0; i < 50; i++) {
    const name = `${names[getRandomInt(0, names.length - 1)]} ${lastNames[getRandomInt(0, lastNames.length - 1)]}`;
    const email = await generateUniqueEmail(
      `client_${name.replace(/\s/g, '_').toLowerCase()}`,
    );
    const address = generateRandomAddress();
    await prisma.client.upsert({
      where: { id: i + 1 },
      update: {},
      create: {
        id: i + 1,
        name: name.split(' ')[0],
        lastName: name.split(' ')[1],
        email: email,
        address: address,
      },
    });
  }

  // Obtener todos los productos y proveedores
  const products = await prisma.product.findMany();
  const providers = await prisma.provider.findMany();

  // Vincular cada proveedor con al menos 5 productos
  for (const provider of providers) {
    // Escoge 5 productos aleatorios
    const selectedProducts = getRandomItems(products, 5);

    // Crea una entrada en ProductProvider para cada combinación de proveedor y producto
    for (const product of selectedProducts) {
      await prisma.productProvider.create({
        data: {
          productId: product.id,
          providerId: provider.id,
          price: getRandomInt(10, 1000),
        },
      });
    }
  }

  function getRandomItems(arr: any[], numItems: number) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numItems);
  }

  console.log('Seed completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
