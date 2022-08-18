import { useSetAtom } from "jotai";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API } from "../../utils/variables";
import { logged } from "../atoms/logged";
import { errorMessageValues, errorInput, errorMessage } from "./errors";
import usePostForm from "./usePostForm";

function FormLogin(props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const setLogged = useSetAtom(logged);
	const navigate = useNavigate();

	const OnSubmit = (data) => {
		usePostForm(API + "api/auth/local", data, setLogged, navigate, "/about");
	};

	return (
		<div>
			<form
				className={`max-w-[400px] flex flex-col gap-3 mt-10`}
				onSubmit={handleSubmit(OnSubmit)}>
				<div className='flex flex-col'>
					<p> Identifier </p>
					<input
						className={`border h-10 pl-3 rounded-md  ${errorInput(
							errors.identifier
						)}`}
						type='text'
						{...register("identifier", errorMessageValues.identifier)}
					/>
					{errorMessage(errors.identifier)}
				</div>
				<div className='flex flex-col'>
					<p> Password </p>
					<input
						className={`border h-10 pl-3 rounded-md ${errorInput(
							errors.password
						)}`}
						type='Password'
						{...register("password", errorMessageValues.password)}
					/>
					{errorMessage(errors.password)}
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
}

export default FormLogin;
