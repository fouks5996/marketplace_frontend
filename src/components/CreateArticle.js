import React from "react";
import { useForm } from "react-hook-form";
import {
	errorMessageValues,
	errorInput,
	errorMessage,
} from "../components/auth/errors";
import Cookies from "js-cookie";
import { API } from "../utils/variables";

function CreateArticle({ forceUpdate }) {
	const token = Cookies.get("token");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		fetch(API + "articles", {
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
		<>
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
		</>
	);
}

export default CreateArticle;
