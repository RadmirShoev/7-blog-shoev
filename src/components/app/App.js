import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import Layout from '../layout/Layout.js';
import ArticleList from '../articleList/ArticleList.js';
import FullArticle from '../article/fullArticle/fullArticle.js';
import SignUp from '../forms/signUp';
import SignIn from '../forms/signIn.js';
import Profile from '../forms/profile.js';

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
        </Route>
      </Routes>
    </div>
  );
}

export default App;
