import { useAtomValue } from "jotai";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { currentuser } from "../atoms/logged";
import { errorMessageValues, errorInput, errorMessage } from "../auth/errors";
import { API } from "../../utils/variables";
import { logged } from "../atoms/logged";
import { Link } from "react-router-dom";
import "./article.scss";
import ScrollReveal from "scrollreveal";

function Article({ article, allowEdit, forceUpdate }) {
	const [editing, setEditing] = useState(false);
	const current_user = useAtomValue(currentuser);
	const token = Cookies.get("token");
	const [animation, setAnimation] = useState(false);
	const isLogged = useAtomValue(logged);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const deleteArticle = (id) => {
		fetch(`${API}/articles/${id}`, {
			method: "DELETE",
			headers: { Authorization: `Bearer ${token}` },
		}).then((response) => {
			forceUpdate();
		});
	};

	const onSubmit = (data) => {
		fetch(`${API}/articles/${article.id}`, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ article: data }),
		})
			.then((response) => {
				forceUpdate();
				setEditing(false);
				return response.json();
			})
			.then((res) => {});
	};

	useEffect(() => {
		let card = {
			distance: "14%",
			origin: "bottom",
			opacity: 0,
			delay: 300,
			interval: 150,
			scale: 0.85,
		};
		setAnimation(true);

		ScrollReveal().reveal(".revealCard", card);
	}, []);

	return (
		<>
			{editing && (
				<>
					<div
						id='beforeEl'
						className='flex items-center justify-center h-screen w-screen z-10 fixed top-0 left-0 '>
						<div className='bg-white border shadow-2xl	 border-black opacity-100 absolute top-[50%] left-[50%] pb-10 px-10 rounded-2xl translate-x-[-50%] translate-y-[-50%]'>
							<h1 className='my-6 text-xl font-semibold'> Edition </h1>
							<form
								onSubmit={handleSubmit(onSubmit)}
								className='max-w-[400px] flex flex-col gap-3 '>
								<div className='flex items-center justify-between gap-2'>
									<p> Titre </p>
									<input
										defaultValue={article.title}
										className={`border h-10 pl-3 ml-10  rounded-md  ${errorInput(
											errors.titre
										)}`}
										type='text'
										{...register("title", errorMessageValues.titre)}
									/>
									{errorMessage(errors.titre)}
								</div>
								<div className='flex items-center justify-between gap-2'>
									<p> Content </p>
									<input
										defaultValue={article.content}
										className={`border h-16 pl-3 rounded-md  ${errorInput(
											errors.content
										)}`}
										type='text'
										{...register("content", errorMessageValues.content)}
									/>
									{errorMessage(errors.content)}
								</div>
								<div className='flex items-center justify-between gap-2'>
									<p> Price </p>
									<input
										defaultValue={article.price}
										className={`border h-10 pl-3 rounded-md  ${errorInput(
											errors.price
										)}`}
										type='number'
										{...register("price", errorMessageValues.price)}
									/>
									{errorMessage(errors.price)}
								</div>
								<button
									className='py-2 px-4 rounded text-white bg-slate-800 mt-4'
									type='submit'>
									Editer
								</button>
							</form>
						</div>
					</div>
				</>
			)}
			<div
				className={`border border-black w-fit p-2 ${
					!animation && "hidden"
				} rounded-xl relative revealCard`}>
				<img
					alt=''
					className=' rounded-lg mb-2 w-full max-h-[190px] max-w-[280px] min-w-[280px]'
					src='https://d1fmx1rbmqrxrr.cloudfront.net/zdnet/i/edit/ne/2017/09/issy_610.jpg'
				/>

				<>
					<Link to={`/show/${article.id}`}>
						<h1 className='text-2xl font-bold'>{article.title}</h1>
					</Link>
					<h1 className='max-w-[250px]'> {article.content}</h1>
					<span className='font-medium text-lg absolute top-5 left-5 bg-black text-white py-1 px-2 rounded'>
						{article.price}€
					</span>
				</>

				{allowEdit ? (
					current_user.id === article.user_id &&
					isLogged && (
						<div className='flex gap-3 my-2'>
							<p
								className='text-orange-500 cursor-pointer'
								onClick={() => setEditing(true)}>
								Editer
							</p>

							<p
								className='text-red-500 cursor-pointer'
								onClick={() => deleteArticle(article.id)}>
								Supprimer
							</p>
						</div>
					)
				) : (
					<h1> User : {article.user.email} </h1>
				)}
			</div>
		</>
	);
}

export default Article;
