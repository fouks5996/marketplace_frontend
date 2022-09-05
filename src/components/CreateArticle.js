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

	const updateCoordinate = (lat, lon, article) => {
		fetch(`${API}articles/${article}`, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				article: {
					lat,
					lon,
				},
			}),
		})
			.then((res) => res.json())
			.then((data) => {});
	};

	const getCoordinate = (location, articleId) => {
		fetch(
			`https://api.geoapify.com/v1/geocode/search?text=${location}&format=json&apiKey=9aa5158850824f25b76a238e1d875cc8`
		)
			.then((response) => response.json())
			.then((data) => {
				updateCoordinate(data.results[0].lat, data.results[0].lon, articleId);
			})
			.catch((err) => console.error(err));
	};

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
			.then((res) => {
				getCoordinate(res.location, res.id);
			});
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
				<div className='flex flex-col'>
					<p> Autres charges </p>
					<input
						className={`border h-10 pl-3 rounded-md  ${errorInput(
							errors.otherCharges
						)}`}
						type='number'
						{...register("other_charges", errorMessageValues.otherCharges)}
					/>
					{errorMessage(errors.price)}
				</div>
				<div className='flex flex-col'>
					<p> Location </p>
					<input
						className={`border h-10 pl-3 rounded-md  ${errorInput(
							errors.location
						)}`}
						type='text'
						{...register("location", errorMessageValues.location)}
					/>
					{errorMessage(errors.location)}
				</div>
				<div className='flex items-center gap-2'>
					<input type="checkbox"					
						className={`border h-10 pl-3 rounded-md  ${errorInput(
							errors.furnished
						)}`}
						{...register("furnished", errorMessageValues.furnished)}
					/>
					<p> Meublé </p>
					{errorMessage(errors.furnished)}
				</div>
				<div className='flex items-center gap-2'>
					<input type="checkbox"					
						className={`border h-10 pl-3 rounded-md  ${errorInput(
							errors.includedCharges
						)}`}
						{...register("included_charges", errorMessageValues.includedCharges)}
					/>
					<p> Charges comprises </p>
					{errorMessage(errors.includedCharges)}
				</div>
				
				<div className='flex flex-col'>
					<p> Surface </p>
					<input
						className={`border h-10 pl-3 rounded-md  ${errorInput(
							errors.surface
						)}`}
						type='number'
						{...register("surface", errorMessageValues.surface)}
					/>
					{errorMessage(errors.surface)}
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
