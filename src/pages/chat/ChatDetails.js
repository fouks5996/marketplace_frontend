import React, { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { currentuser } from "../../components/atoms/logged";
import { API } from "../../utils/variables";
import Cookies from "js-cookie";

function ChatDetails({ data }) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState();
  const currentUser = useAtomValue(currentuser);
  const token = Cookies.get("token");

  useEffect(() => {
    fetch(API + "messages", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMessage(data);
      });
  }, []);

  return (
    <div>
      {!visible && (
        <div className="contain" onClick={() => setVisible(true)}>
          <p> user : {data.user}</p>
          <p> message : {data.message}</p>
          <p> date : {data.date}</p>
        </div>
      )}
      {visible && (
        <>
          <div className="contain" onClick={() => setVisible(false)}>
            <p> user : {data.user}</p>
            <p> message : {data.message}</p>
            <p> date : {data.date}</p>
          </div>

          <div className="border border-black absolute top-10 right-10 w-80">
            {message &&
              message
                .filter(
                  (mess) =>
                    (mess.sender_id === data.id &&
                    mess.recipient_id === currentUser.id) ||
                    (mess.recipient_id === data.id &&
                    mess.sender_id === currentUser.id)
                ).sort((a,b) => {
                    return new Date(a.created_at) - new Date(b.created_at)
                })
                .map((mess) =>
                <div className="relative" >
                {mess.sender_id === currentUser.id ?
                <p className="text-red-500 text-right"> Moi: {mess.content}</p> 
                : <p className="text-blue-500"> {mess.content}</p>
                }
                </div>)}
          </div>
        </>
      )}
    </div>
  );
}

export default ChatDetails;
