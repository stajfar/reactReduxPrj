import React, { useEffect } from 'react';
import PostsList from './features/posts/PostsList'
import { useSelector } from 'react-redux';
import { useAppDispatch } from './app/store';
import { PostsState, Post, selectAllPosts, fetchPosts } from './features/posts/PostsSlice';

function Home() {
    
    return (
        <main className="Home">
                <PostsList ></PostsList>
        </main>
    );
}

export default Home;