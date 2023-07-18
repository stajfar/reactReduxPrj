import React from 'react';
import { Post, selectPostById } from './PostsSlice';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import { useSelector } from 'react-redux';

//it is recommended to pass in the ids to child components like this component as following
function PostSummaryOptimized({ id }: any) {
   

    
    const post = useSelector((state) => selectPostById(state, id));

    return (
        <article className="post">
            { post && <>
                <Link to={`/post/${id}`}>
                    <h2>{post.title}</h2>
                </Link>
                <p className="PostBody">
                    {post.body}
                </p>
                <p>
                    <PostAuthor userId={post.userId} ></PostAuthor>
                </p>
            </>}
            {!post && <>
                <h2>Post not found</h2>
                <p>This is not expected</p>
            </>}
        </article>
    );
}

export default PostSummaryOptimized;