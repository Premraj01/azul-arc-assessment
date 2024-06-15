import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cors from 'cors';
import employeeRoutes from './routes/employee.route.js';

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API is Running...!');
});

app.use('/api/employees', employeeRoutes);

app.listen(PORT, () => {
  `Application is running on PORT ${PORT} in ${process.env.NODE_ENV} mode`;
});
