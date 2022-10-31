const express = require("express");
const cors = require('cors')
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const {notFound, errorHandler} = require('./middlewares/errorMiddleware');

const app = express();
dotenv.config();
connectDB();

const allowedOrigins = ['http://localhost:3000'];
const options = {
  origin: allowedOrigins
}
app.use(cors(options));
app.use(express.json());



app.get('/', (req, res) => {
  res.send("API is running.")
})

app.use('/api/users', userRoutes)
app.use('/api/bloggers', blogRoutes)


app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started on port ${PORT}`));
