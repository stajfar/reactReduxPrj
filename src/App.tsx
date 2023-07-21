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
import Launch from './features/eforms/Launch'
import LaunchRedirect from './features/eforms/LaunchRedirect';

import FHIR from "fhirclient";
import { oauth2 as SMART } from "fhirclient";


function App() {
  
   


    //SMART.init({
    //    iss:
    //        "https://launch.smarthealthit.org/v/r3/sim/eyJoIjoiMSIsImIiOiJzbWFydC0xNjQyMDY4IiwiZSI6InNtYXJ0LVByYWN0aXRpb25lci03MTYxNDUwMiJ9/fhir",
    //    redirectUri: "test.html",
    //    clientId: "whatever",
    //    scope: "launch/patient offline_access openid fhirUser",

    //    // WARNING: completeInTarget=true is needed to make this work in the codesandbox
    //    // frame. It is otherwise not needed if the target is not another frame or window
    //    // but since the entire example works in a frame here, it gets confused without
    //    // setting this!
    //    //completeInTarget: true
    //})



    //return (
    //    <p>Hello worldfffff!</p>
    //);


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
                <Route path='launch.html' element={<Launch />} />
                <Route path='launchredirect.html' element={<LaunchRedirect />} />
                <Route path='counter' element={<Counter />} />               
                <Route path='post2'>
                    <Route index element={<NewPost2 />} />
                   
                </Route>
              {/*  <Route path='*' element={<Missing />} />*/}
            </Route>
        </Routes>
    );
}

export default App;
