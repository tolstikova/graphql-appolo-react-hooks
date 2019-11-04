const Apartment = require('../../models/apartment');
const Booking = require('../../models/bookings');
const { transformBooking, transformApartment } = require('./merge');


module.exports = {
  bookings: async(args, req) => {
    if(!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try{
      const bookings = await Booking.find();
      return bookings.map(booking => {
        return transformBooking(booking)
      })
    }catch (err) {
      throw err;
    }
  },
  bookApartment: async (args, req) => {
    if(!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const fetchedApartment = await Apartment.findOne({ _id: args.apartmentId });
    const booking = new Booking({
      user: '5d9b4aab3245e60acf4f54bf',
      apartment: fetchedApartment
    });
    const result = await booking.save();
    return transformBooking(result)
  },
  cancelBooking: async(args, req) => {
    if(!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const booking = await Booking.findById(args.bookingId).populate('apartment');
      const apartment = transformApartment(booking.apartment);
      await Booking.deleteOne({ _id: args.bookingId });
      return apartment;
    }catch (err) {
      throw err;
    }
  }
};
