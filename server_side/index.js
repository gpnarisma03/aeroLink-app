const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();



const app = express();
const port = process.env.PORT;

mongoose.connect(process.env.MONGODB_STRING)
  .then(() => console.log('Now connected to MongoDB Atlas'))
  .catch(err => console.error('Failed to connect to MongoDB Atlas', err));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: ['http://localhost:8000','http://localhost:3000' ],
    credentials: true,
    optionsSuccessStatus: 200
  }));


  const userRouter = require('./routes/userRoutes');
  const airlineRouter = require ('./routes/airlineRoutes');
  const flightRouter = require('./routes/flightRoutes');
  const bookingRoutes = require('./routes/bookingRoutes');



  app.use('/users', userRouter);
  app.use('/airlines', airlineRouter);
  app.use('/flights', flightRouter);
  app.use('/bookings', bookingRoutes);

  if (require.main === module) {
     app.listen(port, () => console.log(`API is now online on port ${port}`));
  }
  
  module.exports = { app, mongoose };