import React, { useEffect, useReducer, useState } from "react";
import { useAtomValue } from "jotai";
import { currentuser } from "../../components/atoms/logged";
import { API } from "../../utils/variables";
import Cookies from "js-cookie";
import PostChat from "./PostChat";

function ChatDetails({ data }) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState();
  console.log(message);
  const currentUser = useAtomValue(currentuser);
  const token = Cookies.get("token");
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  const checkVisible = () => {
    setVisible(!visible);
  };

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
  }, [reducerValue]);

  return (
    <div>
      {
        <div className="contain" onClick={() => checkVisible()}>
          <p> user : {data.user}</p>
          <p> message : {data.message}</p>
          <p> date : {data.date}</p>
        </div>
      }
      {visible && (
        <>
          <div className="border border-black absolute top-10 right-10 w-80">
            {message &&
              message
                .filter(
                  (mess) =>
                    (mess.sender_id === data.id &&
                      mess.recipient_id === currentUser.id) ||
                    (mess.recipient_id === data.id &&
                      mess.sender_id === currentUser.id)
                )
                .sort((a, b) => {
                  return new Date(a.created_at) - new Date(b.created_at);
                })
                .map((mess) => (
                  <div className="relative">
                    {mess.sender_id === currentUser.id ? (
                      <p className="text-red-500 text-right">
                        {" "}
                        Moi: {mess.content}
                      </p>
                    ) : (
                      <p className="text-blue-500"> {mess.content}</p>
                    )}
                  </div>
                ))}
                 <PostChat forceUpdate={forceUpdate} recipient_id={data.id}/>
          </div>
         
        </>
      )}
    </div>
  );
}

export default ChatDetails;
