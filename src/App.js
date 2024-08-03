import React, { useEffect, useState } from 'react';
import axios from "axios"
function App() {
  const [items, setItems] = useState([{ name: '', price: '' }]);
  const [total, setTotal] = useState('');

  const handleChange = (index, event) => {
    const newItems = [...items];
    newItems[index][event.target.name] = event.target.value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { name: '', price: '' }]);
  };

  async function getHelloWorld(){
    axios.get('http://127.0.0.1:5000/')
      .then(response => {
        console.log(response)
      })
  }

  useEffect(() => {getHelloWorld()}, [])
    

  const handleSubmit = () => {
    axios.post('http://127.0.0.1:5000/generate_bill', { items, total }, { responseType: 'blob' })
      .then(response => {
        console.log(response);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'bill.png');
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        console.error('There was an error generating the bill!', error);
      });
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <input name="name" value={item.name} onChange={(e) => handleChange(index, e)} placeholder="Item Name" />
          <input name="price" value={item.price} onChange={(e) => handleChange(index, e)} placeholder="Item Price" />
        </div>
      ))}
      <button onClick={handleAddItem}>Add Item</button>
      <input value={total} onChange={(e) => setTotal(e.target.value)} placeholder="Total" />
      <button onClick={handleSubmit}>Generate Bill</button>
    </div>
  );
}

export default App;
