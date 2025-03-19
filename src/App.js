import React, { useEffect, useState } from 'react';
import './App.css';
import Data from './Data.js';

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [id, setId] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(Data);
  }, []);

  const handleEdit = (id) => {
    const selectedData = data.find((item) => item.id === id);
    setName(selectedData.name);
    setAge(selectedData.age);
    setId(id);
    setIsUpdate(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  const handleAdd = () => {
    if (name && age) {
      setData([...data, { id: data.length + 1, name, age }]);
      handleClear();
    } else {
      alert("Please enter Name and Age!");
    }
  };

  const handleClear = () => {
    setName('');
    setAge('');
    setId(null);
    setIsUpdate(false);
  };

  const handleUpdate = () => {
    if (id !== null) {
      const updatedData = data.map((item) =>
        item.id === id ? { ...item, name, age } : item
      );
      setData(updatedData);
      handleClear();
    }
  };

  const handleSave = () => {
    if (isUpdate) {
      handleUpdate();
    } else {
      handleAdd();
    }
  };

  return (
    <div className="App">
      <h1>CRUD Operation</h1>
      <table className='table table-hover'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>
                <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Edit</button>
                <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div>
          <label>
            Name:
            <input type="text" value={name} placeholder="Enter your Name" className="form-control" onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Age:
            <input type="number" value={age} placeholder="Enter your Age" className="form-control" onChange={(e) => setAge(e.target.value)} />
          </label>
        </div>
        <div>
          <button className='btn btn-success' onClick={handleSave}>{isUpdate ? "Update" : "Save"}</button>
          <button className='btn btn-warning' onClick={handleClear}>Clear</button> 
          
        </div>
      </div>
    </div>
  );
}

export default App;
