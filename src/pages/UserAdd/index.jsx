import axios from 'axios';
import React, { useState} from 'react';
import '../../api/axios';
import { getJwtToken } from '../../api/axios';
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles.css';
import { useNavigate } from 'react-router-dom';

function UserAdd() {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  getJwtToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstname,
      lastname,
      email,
      password
    };
    try {
      await axios.post(`/inscription`, data);
      navigate(-1);
    }
    catch (error) {
      window.alert(error.response.data['hydra:description']); 
    }
  };  

  return (
    <div className='dashboard-content'>
      <div className='dashboard-content-container'>
        <div className='dashboard-content-header'>
              <h2>Add User</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label> Firstname:
                <input
                type="text"
                className="form-control mt-1"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                />
            </label>
          </div>
          <br />
          <div className="form-group row">
            <label> Lastname:
                <input
                type="text"
                className="form-control mt-1"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                />
            </label>
          </div>
          <br />
          <div className="form-group row">
            <label>Email:
                <input
                type="text"
                className="form-control mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </label>
          </div>
          <br />
          <div className="form-group row">
            <label>Password:
                <input
                type="text"
                className="form-control mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </label>
          </div>
          <br />
          <div className='dashbord-header-container'>
          <button className='dashbord-header-btn'
            onClick={() => navigate(-1)}  
           >Cancel</button>
          <button className='dashbord-header-btn' 
            onClick={() => handleSubmit}
          type="submit"> Add </button>
          </div>
        </form>
      </div>
    </div>

  );
}

export default UserAdd;