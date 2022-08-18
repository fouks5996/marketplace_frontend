import { useAtom, useSetAtom } from "jotai";
import Cookies from "js-cookie";
import React from "react";
import { NavLink } from "react-router-dom";
import { logged } from "../atoms/logged";

function Navigation(props) {
	let activeStyle = {
		textDecoration: "underline",
	};
	const [loggedd, setLogged] = useAtom(logged);

	const reset = () => {
		setLogged(false);
		Cookies.remove("token");
	};

	return (
		<div className='flex items-center justify-center gap-20 py-5 bg-slate-100'>
			<NavLink
				style={({ isActive }) => (isActive ? activeStyle : undefined)}
				to='/'>
				Home
			</NavLink>
			<NavLink
				style={({ isActive }) => (isActive ? activeStyle : undefined)}
				to='/about'>
				Profile
			</NavLink>

			{!loggedd ? (
				<>
					{" "}
					<NavLink
						style={({ isActive }) => (isActive ? activeStyle : undefined)}
						to='/register'>
						Register
					</NavLink>
					<NavLink
						style={({ isActive }) => (isActive ? activeStyle : undefined)}
						to='/login'>
						Login
					</NavLink>{" "}
				</>
			) : (
				<button className='py-2 px-4 bg-slate-800 text-white' onClick={reset}>
					{" "}
					Déconnexion{" "}
				</button>
			)}
		</div>
	);
}

export default Navigation;
