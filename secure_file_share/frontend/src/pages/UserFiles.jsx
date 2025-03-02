import React from 'react';
import FilesDataGrid from './FilesDataGrid';
import { useSelector } from 'react-redux';

const UserFiles = ({ username, token }) => {
    const {user, token, loading, error} = useSelector((state) => state.auth);
    return (
        <div>
            <h2>Files for {username}</h2>
            <FilesDataGrid username={user.username} token={token} />
        </div>
    );
};

export default UserFiles;
