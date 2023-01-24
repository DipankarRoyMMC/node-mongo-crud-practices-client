import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Home = () => {
    const users = useLoaderData();
    const [displayUsers, setDisplayUsers] = useState(users);

    const handleDelete = (user) => {
        const agree = window.confirm(`Are you sure want to delete ${user.name}`);
        if (agree) {
            alert(`Deleting this user Id: ${user.name}`);
            fetch(`http://localhost:5000/users/${user._id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('deleted data successfully!');
                        const remainingUser = displayUsers.filter(usr => usr._id !== user._id);
                        setDisplayUsers(remainingUser);
                    }
                    console.log(data)
                })
        }

        console.log(user._id)
    }

    return (
        <div>
            <h1>Users: {displayUsers.length}</h1>
            {
                displayUsers.map(user => <li key={user._id}>{user.name}, {user.email}
                    <button onClick={() => handleDelete(user)}>X</button>
                </li>)
            }
        </div>
    );
};

export default Home;