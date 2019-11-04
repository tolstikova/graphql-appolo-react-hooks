const Apartment = require('../../models/apartment');
const User = require('../../models/user');
const { transformApartment } = require('./merge');


module.exports = {
  apartments: async (args, req) => {
    try {
      if(args.filter) {
        console.log(args.filter);
      }
      const apartments = await Apartment.find();
      return apartments.map(apartment => {
        return transformApartment(apartment);
      })
    } catch (err) {
      throw err;
    }
  },
  createApartment: async (args, req) => {
    // if(!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }
    try {
      const apartment = new Apartment({
        title: args.apartmentInput.title,
        description: args.apartmentInput.description,
        price: +args.apartmentInput.price,
        date: new Date(args.apartmentInput.date),
        creator: '5d9b4aab3245e60acf4f54bf'
      });
      let createdApartments;
      const res = await apartment.save();
      createdApartments = transformApartment(res);
      const creator = await User.findById('5d9b4aab3245e60acf4f54bf');

      if(!creator) {
        throw new Error('User not found.');
      }
      creator.createdApartments.push(apartment);
      await creator.save();
      return createdApartments;
    } catch (err) {
      throw err;
    }
  }
};
