import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../../api/axios';
import { useParams } from "react-router-dom";
import { getJwtToken } from '../../api/axios';
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles.css';
import { useNavigate } from 'react-router-dom';

function UserEdit() {

  const params = useParams();
  const  id  = params.id;
  const [user, setUser] = useState({});
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [roles, setRoles] = useState([]);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getJwtToken();
    async function getUser() {
      const response = await axios.get(`/user/${id}`);
      setUser(response.data);
      setFirstname(response.data.firstname);
      setLastname(response.data.lastname);
      setEmail(response.data.email);
      setRoles(response.data.roles);
      setPassword(response.data.password);
    }
    getUser();
  }, [id]);
  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/merge-patch+json'
      }
    };
    const data = {
      firstname,
      lastname,
      email,
      roles,
      password
    };
    await axios.patch(`/userProfileEdit/${id}`, data, config);
    navigate(-1);
  };  

  return (
    <div className='dashboard-content'>
      <div className='dashboard-content-container'>

        <div className='dashboard-content-header'>
              <h2>Edit User</h2>
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
            <label>
                  Roles:
                  <select
                  value={roles}
                  className="form-control mt-1"
                  onChange={(e) => setRoles([e.target.value])}>
                  <option value="ROLE_ADMIN">Admin</option>
                  <option value="ROLE_USER">User</option>
                  </select>
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
          type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>

  );
}

export default UserEdit;