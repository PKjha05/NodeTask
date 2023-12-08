import express from 'express';
import connectDB from './db/index.js';
import router from './routes/index.js';
import Passport from './routes/config/index.js'

const app = express();

app.use(express.json());
app.use(Passport.initialize());


app.use('/api', router);


connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
