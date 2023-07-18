import React, { useState } from 'react';

import './App.css';
import Home from './Home';
import About from './About';
import Missing from './Missing';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';

import Counter from './features/Counter';
import NewPost2 from './features/posts/NewPost2';
import PostDetail from './features/posts/PostDetail';
import EditPost from './features/posts/EditPost';


function App() {
  
    const [search, setSearch] = useState('');

    return (
        <Routes>
            <Route path="/" element={<Layout search={search} setSearch={setSearch} />}>
                <Route index element={<Home/>} />
                <Route path='post'>
                    {/*<Route index element={<NewPost submissionState={submissionState} handleFormChange={handleFormChange} handleFormSubmit={handleFormSubmit} />} />*/}
                    {/* <Route path=':id' element={<PostPage/>} />*/}
                    <Route path=':id' element={<PostDetail />} />
                    <Route path='edit/:id' element={<EditPost />} />
                </Route>
                <Route path='about' element={<About />} />
                <Route path='counter' element={<Counter />} />               
                <Route path='post2'>
                    <Route index element={<NewPost2 />} />
                   
                </Route>
                <Route path='*' element={<Missing />} />
            </Route>
        </Routes>
    );
}

export default App;
