import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../../api/axios';
import { useParams } from "react-router-dom";
import { getJwtToken } from '../../api/axios';
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles.css';
import { useNavigate } from 'react-router-dom';

function CommentEdit() {

  const params = useParams();
  const  id  = params.id;
  const [comment, setComment] = useState({});
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getJwtToken();
    async function getComment() {
      const response = await axios.get(`/comment/${id}`);
      setComment(response.data);
      setContent(response.data.content);
    }
    getComment();
  }, [id]);
  console.log(comment);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/merge-patch+json'
      }
    };
    const data = {
      content
    };
    await axios.patch(`/commentEdit/${id}`, data, config);
    navigate(-1);
  };  

  return (
    <div className='dashboard-content'>
      <div className='dashboard-content-container'>

        <div className='dashboard-content-header'>
              <h2>Edit Comment</h2>
        </div>
        <form onSubmit={handleSubmit}>
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

export default CommentEdit;