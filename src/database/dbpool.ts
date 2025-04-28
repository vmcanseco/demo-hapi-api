import { Pool } from 'pg';

const pgPool = new Pool({
  user: 'user',       // Replace with your PostgreSQL username
  host: 'localhost',           // Replace with your database host
  database: 'mydb',   // Replace with your database name
  password: 'password',   // Replace with your PostgreSQL password
  port: 5432,                  // Replace with your database port (default is 5432)
});

export default pgPool;