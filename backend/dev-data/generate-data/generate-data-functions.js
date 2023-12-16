const faker = require('faker');
const { random } = require('faker');

faker.seed(123);

exports.generateUserData = () => {
  const pw = faker.internet.password();
  return {
    id: faker.random.uuid(),
    fullName: faker.name.findName(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: pw,
    role: 'user',
    phoneNumber: faker.phone.phoneNumber(),
    // avatar: faker.image.avatar(),
    avatar: faker.image.avatar(),
    active: faker.random.boolean(),
    createdAt: faker.date.past(),
  };
};

exports.generateSellerData = () => {
  const pw = faker.internet.password();
  return {
    id: faker.random.uuid(),
    fullName: faker.name.findName(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: pw,
    role: 'seller',
    phoneNumber: faker.phone.phoneNumber(),
    avatar: faker.image.avatar(),
    active: faker.random.boolean(),
    createdAt: faker.date.past(),

    storeName: faker.company.companyName(),
    storeLocation: faker.address.streetAddress(),
    storeEmail: faker.internet.email(),
    storePhoneNumber: faker.phone.phoneNumber(),
  };
};

exports.generateProductData = (sellerId) => {
  return {
    id: faker.random.uuid(),
    name: faker.commerce.productName(),
    // type is one of its: botanical, ferns, flower, herbs, succulents, trees, vegetables
    type: random.arrayElement([
      'botanical',
      'ferns',
      'flower',
      'herbs',
      'succulents',
      'trees',
      'vegetables',
    ]),
    suitEnvironment: random.arrayElement(['indoor', 'outdoor']),
    suitClimate: random.arrayElement(['hot', 'cold']),
    quantity: faker.random.number({ min: 1, max: 100 }),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    // image: faker.image.url(),
    // video: faker.image.url(),
    image: faker.image.imageUrl(),
    video: faker.image.imageUrl(),
    rating: faker.random.number({ min: 1, max: 5 }),
    createdAt: faker.date.past(),
    sellerId: sellerId,
  };
};
