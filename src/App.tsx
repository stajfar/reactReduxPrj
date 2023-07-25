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
import Launch from './features/FHIR/Launch'
import LaunchRedirect from './features/FHIR/LaunchRedirect';
import { FhirClientContextProvider } from './features/FHIR/FhirClientContext';
import FhirForm from './features/eforms/FhirForm';



function App() {

    const [search, setSearch] = useState('');
    return (
        <FhirClientContextProvider>
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
                        <Route path='launch.html' element={<Launch />} />
                    <Route path='launchredirect.html' element={<LaunchRedirect />} />
                    <Route path='fhirform' element={<FhirForm />} />
                        <Route path='counter' element={<Counter />} />               
                        <Route path='post2'>
                            <Route index element={<NewPost2 />} />
                            </Route>
                
                  {/*  <Route path='*' element={<Missing />} />*/}
                </Route>
            </Routes>
        </FhirClientContextProvider>
    );
}

export default App;
