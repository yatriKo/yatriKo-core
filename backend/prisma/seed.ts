import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const locations = [
  'Kathmandu',
  'Chitwan',
  'Hetauda',
  'Jhapa',
  'Pokhara',
  'Birgunj',
];

const hotelImages = [
  'https://plus.unsplash.com/premium_photo-1687960116497-0dc41e1808a2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWxzfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWxzfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWxzfGVufDB8fDB8fHww',
];

const roomImages = [
  'https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWwlMjByb29tfGVufDB8fDB8fHww',
];

const busImages = [
  'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YnVzfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1564694202883-46e7448c1b26?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YnVzfGVufDB8fDB8fHww',
];

const busSeatImages = [
  'https://images.unsplash.com/photo-1531270279937-aca3e712ad01?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzJTIwc2VhdHxlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1566840889596-09f5d85bb03b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YnVzJTIwc2VhdHxlbnwwfHwwfHx8MA%3D%3D',
];

async function main() {
  // wipe db
  await prisma.bookingHotel.deleteMany();
  await prisma.bookingBus.deleteMany();
  await prisma.busSeat.deleteMany();
  await prisma.bus.deleteMany();
  await prisma.room.deleteMany();
  await prisma.hotel.deleteMany();
  await prisma.user.deleteMany();
  await prisma.dashboardUser.deleteMany();

  // Users
  for (let i = 0; i < 3; i++) {
    await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        password: faker.internet.password(),
        role: 'User',
      },
    });
  }

  // Travel Agents
  for (let i = 0; i < 2; i++) {
    await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        password: faker.internet.password(),
        role: 'TravelAgent',
      },
    });
  }

  // Hotel Owners
  for (let i = 0; i < 20; i++) {
    await prisma.dashboardUser.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 'HotelOwner',
        hotels: {
          create: [
            {
              name: faker.company.name(),
              phoneNumber: faker.phone.number(),
              location: faker.helpers.arrayElement(locations),
              image: [faker.helpers.arrayElement(hotelImages)],
              rooms: {
                create: Array.from(
                  { length: faker.number.int({ min: 1, max: 5 }) },
                  () => ({
                    roomType: 'Standard',
                    image: [faker.helpers.arrayElement(roomImages)],
                    price: faker.number.int({ min: 1000, max: 3000 }),
                  }),
                ),
              },
            },
          ],
        },
      },
    });
  }

  // Bus Owners
  for (let i = 0; i < 20; i++) {
    await prisma.dashboardUser.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 'BusOwner',
        buses: {
          create: [
            {
              from: faker.helpers.arrayElement(locations),
              to: faker.helpers.arrayElement(locations),
              date: faker.date.future(),
              busNumber: faker.vehicle.vrm(),
              phoneNumber: faker.phone.number(),
              image: [faker.helpers.arrayElement(busImages)],
              busSeats: {
                create: Array.from(
                  { length: faker.number.int({ min: 1, max: 9 }) },
                  () => ({
                    seatType: 'Standard',
                    price: faker.number.int({ min: 500, max: 1500 }),
                  }),
                ),
              },
            },
          ],
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
