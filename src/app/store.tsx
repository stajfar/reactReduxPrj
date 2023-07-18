import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'
import counterReducer from '../features/counterSlice';
import postsReducer from '../features/posts/PostsSlice';
import userReducer from '../features/users/UsersSlice';

export const store = configureStore(
    {
        reducer: {
            storeCounter: counterReducer, //import slice reducers
            storePosts: postsReducer,
            storeUsers: userReducer
        }

    });


    //this is a custom hook to overcome javascript validations
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch