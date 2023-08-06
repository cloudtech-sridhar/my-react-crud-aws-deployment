// index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const { Pool } = require('pg');

// Configure your PostgreSQL connection
const pool = new Pool({
  user: 'postgres_react',
  host: 'my-database-postgresql.cnilbmzcb4cc.us-east-1.rds.amazonaws.com',
  database: 'postgres_employee',
  password: 'postgres_password',
  port: 5432, // Default PostgreSQL port is 5432
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CREATE (POST) endpoint
app.post('/api/items', async (req, res) => {
  try {
    const { name, description } = req.body;
    const query = 'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *';
    const values = [name, description];
    const { rows } = await pool.query(query, values);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// READ (GET) endpoint to fetch all items
app.get('/api/items', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM items');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// READ (GET) endpoint to fetch a single item by id
app.get('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM items WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// UPDATE (PUT) endpoint
app.put('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const query = 'UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *';
    const values = [name, description, id];
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE endpoint
app.delete('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM items WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});