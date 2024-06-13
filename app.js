const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database/database'); // Importing Sequelize instance

const app = express();
const port = 3000;

app.use(bodyParser.json());


// Define routes
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Failed to make database connection!', err);
  }
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
