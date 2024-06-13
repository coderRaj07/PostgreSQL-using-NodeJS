# Basic PostgreSQL API using Node.js

This code base is used to set up a basic PostgreSQL API using Node.js.

## Setup

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Create a `.env` file in the root of your project and add your Supabase PostgreSQL URL like this:

    ```properties
    DATABASE_URL='your-supabase-postgresql-url'
    ```

    Replace `'your-supabase-postgresql-url'` with your actual Supabase PostgreSQL URL.

## Important Files for SQL configurations

- `config.js`: This file contains the configuration for the database. It uses the `DATABASE_URL` from the `.env` file.
- `migration files`: These files are responsible for creating tables in the PostgreSQL database.
- `models/index.js`: This file uses the `DATABASE_URL` from the `.env` file.

## Running the project

After setting up, you can run the project using `npm start`.