import {
    createSlice,
    createAsyncThunk,
    createSelector,// to get posts by userid
    createEntityAdapter
} from '@reduxjs/toolkit';
import Post from '../../Post';
import postsApi from '../../api/Posts';

//#region TS Data Types
export interface Post {
    userId: string,
    id: string,
    title: string,   
    body: string,
}

export interface PostsState {
    posts: Post[],
    status: string,
    errors: string,
    testCounter: number
}
//#endregion


export const postsAdapter = createEntityAdapter<Post>({
    // Keep the "all IDs" array sorted based on post titles
    sortComparer: (a, b) => a.title.localeCompare(b.title),

});

const initialState = postsAdapter.getInitialState({
    // posts: [],
    status: 'idle',
    errors: '',
    testCounter: 0
});


export const addNewPost = createAsyncThunk('posts/addnewpost', async (post: Post) => {
    console.log('add new post in AsyncThunk');
    try {
        const response = await postsApi.post('/posts', post);
        if (response?.status === 201) {
            console.log('Success to add post on server');
            console.log(response.data);
            return response.data as Post;
        }

        return `${response.status} ${response.statusText}`;// could not add post

    } catch (error: any) {
        console.log(error.message);
        return error.message;
    }
});


export const fetchPosts = createAsyncThunk('posts/fatchposts', async () => {
    console.log('fetch Posts in AsyncThunk');
    const response = await postsApi.get('/posts');

    return response.data as Post[]
});

export const updatePost = createAsyncThunk('posts/updatePost', async (post: Post) => {
    try {
        console.log('update post in AsyncThunk');
      
        const response = await postsApi.put(`/posts/${post.id}`, post);

        if (response?.status === 200)
            return response.data
        return `${response.status} ${response.statusText}`;// could not update

    } catch (error: any) {
        console.log(error.message);
        return error.message;
    }
   
});

export const deletePost = createAsyncThunk('posts/deletepost', async (id: string) => {
    console.log('delete post by AsyncThunk');
    try {
        const response = await postsApi.delete(`/posts/${id}`);
        if (response?.status === 200)
            return { id };
         return `${response.status} ${response.statusText}`;// could not delete
    } catch (error: any) {
        console.log(error.message);
        return error.message;
    }
});


//create slice
const postsSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    //redux reducers are sync, to do async operation like api calls, use AsyncThunk
    reducers: {// A reducer in Redux describes how actions transform the current state into the next state. The reducer does this by looking at which action you did and based on that actions it will modify the store.
       // getPosts: (state, action) => { state.posts = action.payload; },// no need for this, componet gets from the store directly

        //deletePost: (state, action) => { state.posts.filter(post => post.id !== action.payload) },

        //addPost: (state, action) => {
        //    state.posts.push(action.payload);
        //    console.log('inside addPost');
        //    console.log(action.payload);
        //},
        increaseTestCounter: (state) => {
            console.log('increasing test counter');
            state.testCounter = state.testCounter + 1;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
               
                //const posts = state.posts.concat(action.payload);

                //const uniqPosts = Array.from(new Map(posts.map(e => [e.id, e])).values());
                //console.log(uniqPosts)
                //state.posts = uniqPosts;

                postsAdapter.upsertMany(state, action.payload);


            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.errors = action.error.message ?? 'unknown error message';
            })

            .addCase(addNewPost.fulfilled, (state, action) => {
               
                //state.posts.push(action.payload as Post);
                postsAdapter.addOne(state, action.payload as Post);

               

            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('update could not be completed');
                    return;
                }

                //const  id: string = action.payload.id;
                //const posts = state.posts.filter(post => post.id !== id);
                //state.posts = [...posts, action.payload as Post];
                postsAdapter.upsertOne(state, action.payload as Post);

            })

            .addCase(deletePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    return;
                }

                const { id } = action.payload;
                //state.posts = state.posts.filter(post => post.id !== id);

                postsAdapter.removeOne(state, id)
            })
           

    }
});


//state.storePosts is defined in store.tsx file.

// we moved it up here because if state structure changes in future, we don't want to update every component
//export const selectAllPosts = (state: any) => state.storePosts as PostsState;
//export const selectPostById = (state: any, id: string) => (state.storePosts as PostsState).posts.find(p => p.id?.toString() === id);
export const getTestCounter = (state: any) => (state.storePosts as PostsState).testCounter;
export const selectPostsState = (state: any) => (state.storePosts.status as string);

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postsAdapter.getSelectors((state: any) => state.storePosts)


// to get posts by userid
export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.userId === userId)
)


//destruct into const, actions and export them
export const { increaseTestCounter } = postsSlice.actions;
//export reducer to be available for the store
export default postsSlice.reducer;
