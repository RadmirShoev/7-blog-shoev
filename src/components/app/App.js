import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import Layout from '../layout/Layout.js';
import FullArticle from '../article/fullArticle/fullArticle.js';
import SignUp from '../forms/signUp';
import SignIn from '../forms/signIn.js';
import Profile from '../forms/profile.js';
import NewArticle from '../article/newAtrticle/newArticle.js';
import ArticleList from '../articleList/articleList';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ArticleList />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:id" element={<FullArticle />} />
          <Route path="/articles/sign-up" element={<SignUp />} />
          <Route path="/articles/sign-in" element={<SignIn />} />
          <Route path="/articles/profile" element={<Profile />} />
          <Route path="/articles/new-article" element={<NewArticle />} />
          <Route path="/articles/:id/edit" element={<NewArticle />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
