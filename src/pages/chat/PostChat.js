import React from 'react';
import {
	errorMessageValues,
	errorInput,
	errorMessage,
} from "../../components/auth/errors";
import { useForm } from "react-hook-form";
import { API } from '../../utils/variables';
import Cookies from "js-cookie";
import { useAtomValue } from 'jotai';
import { currentuser } from "../../components/atoms/logged";

const PostChat = ({forceUpdate, recipient_id}) => {
   const token = Cookies.get("token");
   const currentUser = useAtomValue(currentuser);

   const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();


   const onSubmit = (data) => {
      fetch(API + "messages", {
         method: "POST",
         headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({message: {
            sender_id: currentUser.id, 
            recipient_id,
            content: data.content} }),
      })
         .then((response) => {
            forceUpdate();
            return response.json();
         })
         .then((res) => {
            console.log(res);
         });
   };

   return (
      <div>
         <form
				onSubmit={handleSubmit(onSubmit)}
				className='max-w-[400px] flex flex-col gap-3 mt-10 mb-6'>
				<div className='flex flex-col'>
					<p> Send Message </p>
					<input
						className={`border h-10 pl-3 rounded-md  ${errorInput(
							errors.content
						)}`}
						type='text'
						{...register("content", errorMessageValues.content)}
					/>
					{errorMessage(errors.content)}
				</div>
				<button
					className='py-2 px-4 rounded text-white bg-slate-800'
					type='submit'>
					{" "}
					Submit{" "}
				</button>
			</form>
      </div>
   );
};

export default PostChat;