import axios from "axios";
import {Navigate} from "react-router-dom";
import {useState} from "react";
import  "../../api/axios";
import { decodeToken } from "react-jwt";


export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentToken, setCurrentToken] = useState('');
    

    const setAuthToken = token => {
      if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      else
          delete axios.defaults.headers.common["Authorization"];
   }

    const submit = async e => {
        e.preventDefault();

        await axios.post('login_check', {
            email, password
        }).then(response => {
          const token  =  response.data.token;
          localStorage.setItem("token", token);
          setCurrentToken(token);
          setAuthToken(token);
        })
        .catch(error => window.alert('Wrong email or password'));
    }
    const myDecodedToken = decodeToken(currentToken);
    if(myDecodedToken){
      if(!myDecodedToken['roles'].includes('ROLE_ADMIN')){
        window.alert('Sorry you are not an admin');
        window.location.reload();
      }
      if(myDecodedToken['roles'].includes('ROLE_ADMIN')){
        return <Navigate to="/dashboard/users"/>;
      }
    }
    
  return (
    <>
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={submit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              id="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value )}
              value={email ? email : ''}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              value={password ? password : ''}
              required
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
    </>
  )
}
export default Login