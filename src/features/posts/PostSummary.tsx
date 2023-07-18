import React from 'react';
import { Post } from './PostsSlice';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';

let PostSummary = ({ userId, id, title, body }: Post) => {
    return (
        <article className="post">
            <Link to={`/post/${id}`}>
                <h2>{title}</h2>              
            </Link>
            <p className="PostBody">
                {body}
            </p>
            <p>
                <PostAuthor userId={userId} ></PostAuthor>
            </p>
        </article>
    );
}


let PostSummary2 = React.memo(PostSummary);

export default PostSummary2;