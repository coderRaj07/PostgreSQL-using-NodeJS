const axios = require('axios');

async function createUsers() {
  for (let i = 0; i < 30; i++) {
    const user = {
      firstName: `User${i}`,
      lastName: `LastName${i}`,
      email: `user${i}@example.com`,
      age: 20 + i,
      city: `City${i}`
    };

    try {
      await axios.post('http://localhost:3000/users', user);
      console.log(`User ${i + 1} created successfully`);
    } catch (err) {
      console.error(`Failed to create user ${i + 1}`, err);
    }
  }
}

createUsers();