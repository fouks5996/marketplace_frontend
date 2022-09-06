import React, { useEffect, useState } from 'react';
import { API } from '../../utils/variables';
import Cookies from 'js-cookie';
import { currentuser } from '../../components/atoms/logged';
import { useAtomValue } from 'jotai';

function Chatlist(props) {

    const token = Cookies.get('token');
    const [ messagesList, setMessagesList ] = useState();
    const currentUser = useAtomValue(currentuser);

    useEffect( () => {
        fetch(API + "messages", {
            method: "GET",
            headers: { 'Authorization' : `Bearer ${token}` }
        })
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(data =>{
            console.log(data);
            setMessagesList(data);
        })
    }, [])

    return (
        <div>
            <h1>Liste des conversations :</h1>
            {
                messagesList && messagesList.filter(message => (
                    (message.sender_id === currentUser.id || message.recipient_id === currentUser.id) 
                ))
                .map(message => (
                    <div className='border-b border-black'>
                    {message.content}<br/>
                    sender : {message.sender.email}<br/>
                    recipient : {message.recipient.email}<br/>
                    createdAt : {message.created_at}
                    </div>
                ))
            }
        </div>
    );
}

export default Chatlist;