import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/store';
import {
    
    // selectAllPosts,
    selectPostIds,
    fetchPosts,
    selectPostsState
} from './PostsSlice';
import PostSummary from './PostSummary';
import PostSummaryOptimized from './PostSummaryOptimized';


function Posts() {
    //const postsState: PostsState = useSelector(selectAllPosts);// useSelector is used to grab the piece of state you need from the store and makes it usable.
    const orderedPostIds = useSelector(selectPostIds);
    const postsState = useSelector(selectPostsState);

    const dispatch = useAppDispatch();

   
    //this calls on load and filles postState above
    useEffect(() => {
        console.log('use efect exectuted to get all posts inside Post list');
        const fetchedPosts = async () => {
            try {
                console.log(postsState);
                if (postsState === 'idle')
                    dispatch(fetchPosts());
            } catch (error: any) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.headers);
                    console.log(error.response.status);
                } else {
                    console.log(error.message);
                }
            }
        }
        fetchedPosts();
    }, [dispatch, postsState]);


    

    const createElement = () => {
        let content: JSX.Element = <></>;
        if (postsState === 'loading') {
            content = <p> loading posts </p >;
        } else if (postsState === 'succeeded') {
            //console.log(postIds);
            //1- use selectore runs every time an action is dispatched (increaseTestCount in the header)
            //2- map() and filter() both return a new array (reference value is returned) --> if a new reference value is returned (the new array), it forces rerender
            //3- to optimize, we have to create a memoized selector in the slice: createSelector
           // content = <> {postsState.posts.map((post: Post) => (<PostSummary key={post.id} userId={post.userId} id={post.id} title={post.title} body={post.body} ></PostSummary>))} </>;
            content = <>{orderedPostIds.map(postId => (<PostSummaryOptimized key={postId} id={postId}></PostSummaryOptimized>))}</>
        } else if (postsState === 'failed') {
            <p> Error in loading posts' </p >
        }

        return content;
    }

   

    return (
        <>
            {createElement()}
        </>
    );
}

export default Posts;