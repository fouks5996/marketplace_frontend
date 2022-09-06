import React, { useEffect, useState } from "react";
import { API } from "../../utils/variables";
import Cookies from "js-cookie";
import { currentuser } from "../../components/atoms/logged";
import { useAtomValue } from "jotai";

function Chatlist() {
	const token = Cookies.get("token");
	const [chatterList, setChatterList] = useState();
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

				console.log(data);
				setSender(filtered);
			});
	}, []);

	function dataParsed(date) {
		return new Date(date).toLocaleDateString("fr-FR", {
			month: "short",
			weekday: "long",
			year: "numeric",
			day: "numeric",
			hour: "numeric",
			second: "numeric",
		});
	}

	const setSender = (dataTofilter) => {
		let senderArray = [];
		console.log(dataTofilter);
		dataTofilter.map((data) => {
			return senderArray.push({
				user: data.sender.email,
				message: data.content,
				date: data.created_at,
			});
		});
		console.log("sendmessage", senderArray);
		return setRecipient(dataTofilter, senderArray);
	};

	const setRecipient = (dataTofilter, senderArray) => {
		let recipientArray = [];
		dataTofilter.map((data) => {
			return recipientArray.push({
				user: data.recipient.email,
				message: data.content,
				date: data.created_at,
			});
		});
		console.log("receive message", recipientArray);
		return mergeArrays(senderArray, recipientArray);
	};

	const mergeArrays = (arr1, arr2) => {
		let mergedArray = arr1
			.concat(arr2)
			.filter((el) => {
				return el.user !== currentUser.email;
			})
			.sort((a, b) => Number(b.date) - Number(a.date))
			.filter((v, i, a) => a.findIndex((t) => t.user === v.user) === i);
		console.log(mergedArray);
		return setChatterList(mergedArray);
	};

	return (
		<div>
			<h1>Liste des conversations :</h1>
			{chatterList &&
				chatterList.map((data) => (
					<div className='border-b border-black'>
						<p> user : {data.user}</p>
						<p> message : {data.message}</p>
						<p> date : {data.date}</p>
					</div>
				))}
		</div>
	);
}

export default Chatlist;
