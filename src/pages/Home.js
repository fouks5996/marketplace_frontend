import { useAtomValue } from "jotai";

import React, { useEffect, useReducer, useState } from "react";

import { logged } from "../components/atoms/logged";

import Article from "../components/Article";
import CreateArticle from "../components/CreateArticle";

function Home(props) {
	const API = "http://127.0.0.1:3000/articles";
	const [data, setData] = useState();
	const [recucerValue, forceUpdate] = useReducer((x) => x + 1, 0);
	const isLogged = useAtomValue(logged);

	useEffect(() => {
		fetch(API)
			.then((response) => {
				return response.json();
			})
			.then((res) => {
				setData(res);
			});
	}, [setData, recucerValue]);

	return (
		<div>
			<h1 className='text-3xl font-bold underline'>Hello Home!</h1>
			{isLogged && <CreateArticle forceUpdate={forceUpdate} />}

			<div className='flex gap-2'>
				{data &&
					data.map((article) => (
						<Article article={article} forceUpdate={forceUpdate} />
					))}
			</div>
		</div>
	);
}

export default Home;
