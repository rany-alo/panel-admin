import React from 'react';
import { Routes, Route  } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./pages/Login";
import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';
import Users from './pages/Users';
import Articles from './pages/Articles';
import Comments from './pages/Comments';
import './App.css';
import UserEdit from './pages/UserEdit';
import UserAdd from './pages/UserAdd';
import ArticleEdit from './pages/ArticleEdit';
import ArticleAdd from './pages/ArticleAdd';
import CommentEdit from './pages/CommentEdit';
import CommentAdd from './pages/CommentAdd';


function App() {
  return (
    <Routes>
      <Route path="/" element={< Login/>} />
      <Route exact path="/dashboard/*" element={
      
      <div className='dashboard-container'>
        <SideBar menu={sidebar_menu} />
          
          <div className='dashboard-body'>
              <Routes>
                  <Route path="*" element={<div></div>} />
                  <Route exact path="/" element={<div></div>} />
                  <Route exact path="/users" element={< Users/>} />
                  <Route path="/users/add" element={< UserAdd/>} />
                  <Route path="/users/:id" element={< UserEdit/>} />
                  <Route exact path="/articles" element={< Articles/>} />
                  <Route path="/articles/add" element={< ArticleAdd/>} />
                  <Route path="/articles/:id" element={< ArticleEdit/>} />
                  <Route exact path="/comments" element={< Comments/>} />
                  <Route path="/comments/add" element={< CommentAdd/>} />
                  <Route path="/comments/:id" element={< CommentEdit/>} />
              </Routes>
          </div>
      </div>
      }/>
     </Routes>
  )
}

export default App;
