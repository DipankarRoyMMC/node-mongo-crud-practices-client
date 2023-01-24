import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';


const Update = () => {
    const storedUser = useLoaderData();
    const [user, setUser] = useState(storedUser);

    const handleUpdatedUser = (event) => {
        event.preventDefault();
        console.log(user);

        fetch(`http://localhost:5000/users/${storedUser._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Data updated successfully!!');
                }
                console.log(data);
            })

    }

    const handleInputChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;

        const newUser = { ...user };
        newUser[field] = value;
        setUser(newUser);
    }
    return (
        <div>
            <h1>Update Your Data:  {user.name}</h1>

            <form onSubmit={handleUpdatedUser}>
                <input onChange={handleInputChange} defaultValue={storedUser.name} type="text" name="name" id="name" placeholder="Enter your name" />
                <br></br>
                <input onChange={handleInputChange} defaultValue={storedUser.address} type="text" name="address" id="address" placeholder='Your address' />
                <br></br>
                <input onChange={handleInputChange} defaultValue={storedUser.email} type="email" name="email" id="email" placeholder="Enter your email" />
                <br></br>
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default Update;