import { useAtomValue } from "jotai";
import Cookies from "js-cookie";
import React, { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { logged } from "../components/atoms/logged";
import {
	errorMessageValues,
	errorInput,
	errorMessage,
} from "../components/forms/errors";
import Post from "../components/Post";

function Home(props) {
	const API = "http://127.0.0.1:3000/articles";
	const [data, setData] = useState();
	const [recucerValue, forceUpdate] = useReducer((x) => x + 1, 0);
	const loggedd = useAtomValue(logged);
	const token = Cookies.get("token");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		loggedd &&
			fetch(API)
				.then((response) => {
					return response.json();
				})
				.then((res) => {
					setData(res);
				});
	}, [loggedd, setData, recucerValue]);

	const onSubmit = (data) => {
		fetch(API, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ article: data }),
		})
			.then((response) => {
				forceUpdate();
				return response.json();
			})
			.then((res) => {});
	};

	return (
		<div>
			<h1 className='text-3xl font-bold underline'>Hello Home!</h1>
			{loggedd && (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='max-w-[400px] flex flex-col gap-3 mt-10 mb-6'>
					<div className='flex flex-col'>
						<p> Titre </p>
						<input
							className={`border h-10 pl-3 rounded-md  ${errorInput(
								errors.title
							)}`}
							type='text'
							{...register("title", errorMessageValues.title)}
						/>
						{errorMessage(errors.title)}
					</div>
					<div className='flex flex-col'>
						<p> Content </p>
						<input
							className={`border h-10 pl-3 rounded-md  ${errorInput(
								errors.content
							)}`}
							type='text'
							{...register("content", errorMessageValues.content)}
						/>
						{errorMessage(errors.content)}
					</div>
					<div className='flex flex-col'>
						<p> Price </p>
						<input
							className={`border h-10 pl-3 rounded-md  ${errorInput(
								errors.price
							)}`}
							type='number'
							{...register("price", errorMessageValues.price)}
						/>
						{errorMessage(errors.price)}
					</div>
					<button
						className='py-2 px-4 rounded text-white bg-slate-800'
						type='submit'>
						{" "}
						Submit{" "}
					</button>
				</form>
			)}

			<div className='flex gap-2'>
				{data &&
					data.map((article) => (
						<Post article={article} forceUpdate={forceUpdate} />
					))}
			</div>
		</div>
	);
}

export default Home;
