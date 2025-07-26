import React, { useState } from 'react';
import './AdminPage.css';

// Helper: Convert File to base64
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function AdminPage({ storeItems, setStoreItems, onBackToStore, activityLog = [], setActivityLog }) {
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    imageFile: null,
    image: '' // base64 image
  });

  const [filterPrefix, setFilterPrefix] = useState('');

  const handleAddItem = async () => {
    const { name, price, imageFile } = newItem;

    if (!name || !price || !imageFile) {
      alert("Please fill in all fields and add an image.");
      return;
    }

    const base64Image = await toBase64(imageFile);

    const newProduct = {
      id: Date.now(),
      name,
      price: parseFloat(price),
      image: base64Image
    };

    setStoreItems(prev => [...prev, newProduct]);
    setNewItem({ name: '', price: '', imageFile: null, image: '' });

    if (setActivityLog) {
      setActivityLog(prev => [
        ...prev,
        {
          datetime: new Date().toLocaleString(),
          username: 'admin',
          activity: `Added product: ${name}`
        }
      ]);
    }
  };

  const handleRemove = (id) => {
    const removedItem = storeItems.find(item => item.id === id);
    setStoreItems(prev => prev.filter(item => item.id !== id));

    if (setActivityLog && removedItem) {
      setActivityLog(prev => [
        ...prev,
        {
          datetime: new Date().toLocaleString(),
          username: 'admin',
          activity: `Deleted product: ${removedItem.name}`
        }
      ]);
    }
  };

  const handleImageUpload = (file) => {
    if (!file || !file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    toBase64(file).then(base64 => {
      setNewItem(prev => ({
        ...prev,
        imageFile: file,
        image: base64
      }));
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) handleImageUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(file);
  };

  const handleDragOver = (e) => e.preventDefault();

  const filteredActivity = (activityLog || []).filter(log =>
    log.username?.toLowerCase().startsWith(filterPrefix.toLowerCase())
  );

  return (
    <div className="admin-container">
      <h1 className="logo">SKY</h1>
      <h2>Manage Products</h2>

      <input
        type="text"
        placeholder="Name"
        value={newItem.name}
        onChange={e => setNewItem(prev => ({ ...prev, name: e.target.value }))}
      />
      <input
        type="number"
        placeholder="Price"
        value={newItem.price}
        onChange={e => setNewItem(prev => ({ ...prev, price: e.target.value }))}
      />

      <div
        className="image-drop-area"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p>Drag & drop an image or choose a file</p>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {newItem.image && (
          <div className="image-preview">
            <img src={newItem.image} alt="Preview" />
            <button
              className="remove-image"
              onClick={() => setNewItem(prev => ({ ...prev, imageFile: null, image: '' }))}
            >❌</button>
          </div>
        )}
      </div>

      <button className="add-button" onClick={handleAddItem}>Add Product</button>

      <h3>Current Products:</h3>
      <div className="products-list">
        {storeItems.map(item => (
          <div key={item.id} className="product-row">
            {item.image && (
              <img src={item.image} alt={item.name} className="product-thumb" />
            )}
            <div className="product-details">
              <strong>{item.name}</strong> - ${item.price.toLocaleString()}
            </div>
            <button className="delete-button" onClick={() => handleRemove(item.id)}>Delete</button>
          </div>
        ))}
      </div>

      <h3>Activity Log</h3>
      <input
        type="text"
        placeholder="Filter by username prefix"
        value={filterPrefix}
        onChange={e => setFilterPrefix(e.target.value)}
        className="filter-input"
      />

      <table className="activity-table">
        <thead>
          <tr>
            <th>DateTime</th>
            <th>Username</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
          {filteredActivity.map((log, idx) => (
            <tr key={idx}>
              <td>{log.datetime}</td>
              <td>{log.username}</td>
              <td>{log.activity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="back-btn" onClick={onBackToStore}>← Back to Store</button>
    </div>
  );
}

export default AdminPage;
