import React, { useState } from 'react';

const AddUser = () => {
    const [user, setUser] = useState({});

    const handleAddUser = (event) => {
        event.preventDefault();
        console.log(user);

        fetch(`http://localhost:5000/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    alert('Data updated successfully')
                }
                console.log(data)
            })

        event.target.reset();
    }

    const handleInputBlur = (event) => {
        const field = event.target.name;
        const value = event.target.value;

        const newUser = { ...user };
        newUser[field] = value;
        setUser(newUser);
    }

    return (
        <div>
            <h1>Please Add User: </h1>

            <form onSubmit={handleAddUser}>
                <input onChange={handleInputBlur} type="text" name="name" id="name" placeholder="Enter your name" />
                <br></br>
                <input onChange={handleInputBlur} type="text" name="address" id="address" placeholder='Your address' />
                <br></br>
                <input onChange={handleInputBlur} type="email" name="email" id="email" placeholder="Enter your email" />
                <br></br>
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default AddUser;