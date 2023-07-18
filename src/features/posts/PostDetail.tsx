import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectPostById } from './PostsSlice';
import { deletePost } from './PostsSlice';
import { useAppDispatch } from '../../app/store';

function PostDetail() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();// to dispatch slice ations

    const { id } = useParams();

  
    const post = useSelector((state: any) => selectPostById(state, id ?? ''));

    //if the post.id does not exist inside the state, it sould be because state is empty, then we need to fetch posts from API
    
   

    const handlePostDelete = async (id: string) => {
        try {
            console.log(id);
            dispatch(deletePost(id));
            navigate('/');
        } catch (error: any) {
            console.log(error.message);
        } finally {

        }
    }

    const handlePostUpdate = async (id: string) => {
        try {
            console.log(id);
          
            navigate(`/post/edit/${id}`);
        } catch (error: any) {
            console.log(error.message);
        } finally {

        }
    }

    return (
        <article className="PostPage">
            {post && handlePostDelete &&
                <>
                    <h2>{post?.title}</h2>                   
                    <p className="PostBody">{post?.body}</p>

                <button onClick={() => handlePostDelete(post.id)}>Delete Post</button>
                <button onClick={() => handlePostUpdate(post.id)}>Update Post</button>
                </>
            }
            {!post &&
                <>
                    <h2>Post not found</h2>
                    <p>This is not expected</p>
                    <p>
                        <Link to='/'>Go to home page</Link>
                    </p>
                </>
            }

        </article >
    );
}

export default PostDetail;