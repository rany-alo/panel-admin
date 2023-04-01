import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../../api/axios';
import { useParams } from "react-router-dom";
import { getJwtToken } from '../../api/axios';
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles.css';
import { useNavigate } from 'react-router-dom';

function ArticleEdit() {

  const params = useParams();
  const  id  = params.id;
  const [article, setArticle] = useState({});
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getJwtToken();
    async function getArticle() {
      const response = await axios.get(`/article/${id}`);
      setArticle(response.data);
      setTitle(response.data.title);
      setContent(response.data.content);
    }
    getArticle();
  }, [id]);
  console.log(article);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/merge-patch+json'
      }
    };
    const data = {
      title,
      content
    };
    await axios.patch(`/articleEdit/${id}`, data, config);
    navigate(-1);
  };  

  return (
    <div className='dashboard-content'>
      <div className='dashboard-content-container'>

        <div className='dashboard-content-header'>
              <h2>Edit Article</h2>
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
            <label>Content:
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
          type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>

  );
}

export default ArticleEdit;