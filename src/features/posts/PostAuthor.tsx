import React from 'react';
import { useSelector } from 'react-redux';
import { User, selectAllUsers } from '../users/UsersSlice';

function PostAuthor({ userId }: any) {
    const users: User[] = useSelector(selectAllUsers).users;//.users?.find(u => u.id === userId);
   // assertNonNullish(users, 'users are not provided in state');
    const user = users.find(u => u.id === userId);


    return (
        <span>By {user ? user.name : 'Unknown Author!'}</span>
    );

    function assertNonNullish<TValue>(
        value: TValue,
        message: string
    ): asserts value is NonNullable<TValue> {
        if (value === null || value === undefined) {
            throw Error(message);
        }
    }
}

export default PostAuthor;