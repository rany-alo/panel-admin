import axios from 'axios';
import React, { useState} from 'react';
import '../../api/axios';
import { getJwtToken } from '../../api/axios';
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles.css';
import { useNavigate } from 'react-router-dom';

function ArticleAdd() {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  getJwtToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title,
      content,
    };
    try {
      await axios.post(`/articlePost`, data);
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
              <h2>Add Article</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label> Title:
                <input
                type="text"
                className="form-control mt-1"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            </label>
          </div>
          <br />
          <div className="form-group row">
            <label> Content:
                <input
                type="text"
                className="form-control mt-1"
                value={content}
                onChange={(e) => setContent(e.target.value)}
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

export default ArticleAdd;