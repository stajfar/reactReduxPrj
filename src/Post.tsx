import React from 'react';
import { PostType } from './Model';
import { Link } from 'react-router-dom';

function Post({ id, title, body, datetime }: PostType) {
    return (
        <article className="post">
            <Link to={`/post/${id}`}>
                <h2>{title}</h2>
                <p>{datetime}</p>
            </Link>
            <p className="PostBody">
                {body.length <= 25 ?
                    body :
                    `${body.slice(0, 25)}...`
                }
            </p>
        </article>
    );
}

export default Post;