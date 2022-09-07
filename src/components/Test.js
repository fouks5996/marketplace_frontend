import React from 'react';
import { useEffect } from 'react';
import { API } from '../utils/variables';
import Cookies from 'js-cookie'

function Test(props) {

    const token = Cookies.get('token');



    useEffect(() => {
        // fetch(API + "update_user", {
        //     method: "PUT",
        //     headers: {'Authorization': `Bearer ${token}`, "Content-Type": ["application/json", "image/jpeg"] },
        //     body: JSON.stringify({ user: {
        //             email: "jean@mail.com",
        //             name:"Jean de Florette"
        //             }})
        // })
        // .then(response => {
        //     console.log(response);
        //     return response.json();
        // })
        // .then(data => {
        //     console.log(data)
        // })
        // .catch(error => console.log(error.message))
    }, [])

    const handleSubmitFile = (e) => {
        e.preventDefault();
        const data = new FormData();
        
       data.append("user[title]", e.target.title.value);
       data.append("user[avatar]", e.target.avatar.files[0]);
       console.log('data', e.target.title.value) 
       submitToAPI(data);
    }

    const submitToAPI = (data) => {
        const requestOptions = {
            method: "POST",
            headers: {'Authorization': `Bearer ${token}`},
            body: data
        };
        fetch(API + "add_avatar", requestOptions)
            .then((response) => response.json())
            .then((res) => console.log(res));
    };
    


    return (
        <>

        TEST ACTIVE STORAGE
        <form onSubmit={ (e) => handleSubmitFile(e)}>
            <label htmlFor='title'>Title:</label>
            <input type="text" name="title" id="title"/>
            <br/>

            <label htmlFor='avatar'>Avatar:</label>
            <input type="file" name="avatar" id="avatar"/>
            <br />

            <button type="submit">UPLOAD</button>
        </form>
        </>
    );
}

export default Test;