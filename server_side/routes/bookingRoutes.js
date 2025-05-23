const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { verify, verifyAdmin } = require('../auth');

router.post('/', verify, bookingController.addBooking);
router.get('/all', verify, bookingController.getAllBookings);
router.get('/myBookings', verify, bookingController.getMyBookings);
router.get('/:id', verify, bookingController.getBookingById);
router.delete('/:id', verify, bookingController.cancelBooking);



module.exports = router;
