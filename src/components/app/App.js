import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import Layout from '../layout/Layout.js';
import ArticleList from '../articleList/ArticleList.js';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ArticleList />} />
          <Route path="/articles" element={<ArticleList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
