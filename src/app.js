require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const requestRoutes = require('./routes/requestRoutes');
const cors = require('cors');
const commentRoutes = require('./routes/commentRoutes');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/comments', commentRoutes);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
