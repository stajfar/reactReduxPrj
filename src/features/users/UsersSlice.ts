import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../../api/Posts';


//#region TS Data Types
export interface User {
    id: string,
    name: string,
    username?: string,
    email?: string,   
    phone?: string,
    website?: string   
}

export interface UserState {
    users: User[],
    status: string,
    errors: string
}
//#endregion


const initialState: UserState = {
    users: [],
    status: 'idle',
    errors:''
}


export const fetchUsers = createAsyncThunk('fetchUsers/users', async () => {
    console.log('geting users by AsyncThunk');
    const response = await userApi.get('/users');
    return response.data as User[];
});

//create slice
const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {// just to change the state
        getUsers: (state, action) => { state.users = action.payload; },// no need for this, componet gets from the store directly
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state, action) => { state.status = 'loading' })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = state.users.concat(action.payload)
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.errors = action.error.message ?? 'unknown error message';
            })
    }
});

export const selectAllUsers = (state: any) => state.storeUsers as UserState;

//destruct into const, actions and export them
export const { getUsers } = usersSlice.actions;
//export reducer to be available for the store
export default usersSlice.reducer;
