import React, { useEffect, useState } from "react";
import { API } from "../../utils/variables";
import Cookies from "js-cookie";
import { currentuser } from "../../components/atoms/logged";
import { useAtomValue } from "jotai";
import ChatDetails from "./ChatDetails";

function Chatlist() {
	const token = Cookies.get("token");
	const [chatterList, setChatterList] = useState();
	const [currentMessage, setCurrentMessage] = useState(false);
	const currentUser = useAtomValue(currentuser);

	useEffect(() => {
		fetch(API + "messages", {
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				let filtered = data.filter(
					(message) =>
						message.sender_id === currentUser.id ||
						message.recipient_id === currentUser.id
				);

				filtered = filtered.filter(
					(message) => message.sender_id !== message.recipient_id
				);

				setSender(filtered);
			});
	}, []);

	const setSender = (dataTofilter) => {
		let senderArray = [];
		dataTofilter.map((data) => {
			return senderArray.push({
				user: data.sender.email,
				message: data.content,
				date: data.created_at,
				id: data.sender_id,
			});
		});
		return setRecipient(dataTofilter, senderArray);
	};

	const setRecipient = (dataTofilter, senderArray) => {
		let recipientArray = [];
		dataTofilter.map((data) => {
			return recipientArray.push({
				user: data.recipient.email,
				message: data.content,
				date: data.created_at,
				id: data.recipient_id,
			});
		});
		return mergeArrays(senderArray, recipientArray);
	};

	const mergeArrays = (arr1, arr2) => {
		let mergedArray = arr1
			.concat(arr2)
			.filter((el) => {
				return el.user !== currentUser.email;
			})
			.filter((v, i, a) => a.findIndex((t) => t.user === v.user) === i);
		return setChatterList(mergedArray);
	};

	console.log(currentMessage);

	return (
		<div className='relative'>
			<h1>Liste des conversations :</h1>
			{chatterList &&
				chatterList.map((data) => (
					<div className='border-b border-gray mb-4 w-fit'>
						<ChatDetails
							data={data}
							setCurrentMessage={setCurrentMessage}
							currentMessage={currentMessage}
						/>
					</div>
				))}
		</div>
	);
}

export default Chatlist;
