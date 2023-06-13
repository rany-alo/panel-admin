import axios from 'axios';
import React, { useEffect, useState} from 'react';
import '../../api/axios';
import { getJwtToken } from '../../api/axios';
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles.css';
import { useNavigate } from 'react-router-dom';

function CommentAdd() {

  const [allArticles, setAllArticles] = useState('');
  const [articleId, setArticleId] = useState('');
  const [articleTitle, setArticleTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  getJwtToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      content,
    };
    try {
      await axios.post(`/commentPost/article/${articleId}`, data);
      navigate(-1);
    }
    catch (error) {
      window.alert(error.response.data['hydra:description']); 
    }
  };

  const getAllArticles = async () => {
    try {
      const { data } = await axios.get(`/allArticles`);
      setAllArticles(data);
    }
    catch (error) {
      window.alert(error.response.data['hydra:description']);
    }
  };
  useEffect(() => {
    getAllArticles();
  }, []);

  console.log(articleId);

  return (
    <div className='dashboard-content'>
      <div className='dashboard-content-container'>
        <div className='dashboard-content-header'>
              <h2>Add Comment</h2>
        </div>
        <form onSubmit={handleSubmit}>
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
          <div className="form-group row">
            <label>   Article:
              <select
                value={articleTitle}
                className="form-control mt-1"
                onChange={(e) => {
                  const selectedIndex = e.target.selectedIndex;
                  const selectedArticleId = allArticles['hydra:member'][selectedIndex - 1].id;
                  setArticleId(selectedArticleId);
                  setArticleTitle(e.target.value);
                  }}>
                    <option value="">Select un article ....</option>
                    {allArticles && allArticles['hydra:member'].map(article => {return (
                    <option key={article.id} value={article.title}>
                        {article.title}
                    </option>)
                    })}
                </select>
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

export default CommentAdd;