// src/App.js
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Paper, TextField, Button } from '@material-ui/core';
import axios from 'axios';

const App = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/items'); // Assumes your backend API is running on the same host as the frontend
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleAddItem = async () => {
    try {
      await axios.post('/api/items', newItem);
      setNewItem({ name: '', description: '' });
      fetchItems();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`/api/items/${id}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">CRUD App</Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px' }}>
        <Paper style={{ padding: '20px' }}>
          <Typography variant="h5">Add New Item</Typography>
          <form style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
            <TextField
              label="Name"
              name="name"
              value={newItem.name}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Description"
              name="description"
              value={newItem.description}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
            />
            <Button variant="contained" color="primary" onClick={handleAddItem}>
              Add Item
            </Button>
          </form>
        </Paper>
        <div style={{ marginTop: '20px' }}>
          {items.map((item) => (
            <Paper key={item.id} style={{ padding: '10px', marginBottom: '10px' }}>
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body1">{item.description}</Typography>
              <Button variant="outlined" color="secondary" onClick={() => handleDeleteItem(item.id)}>
                Delete
              </Button>
            </Paper>
          ))}
        </div>
      </Container>
    </>
  );
};

export default App;
