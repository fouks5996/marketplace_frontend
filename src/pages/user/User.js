import { useAtomValue } from "jotai";
import Cookies from "js-cookie";
import React, { useEffect, useReducer, useState } from "react";
import Article from "../../components/article/Article";
import { logged } from "../../components/atoms/logged";
import CreateArticle from "../../components/CreateArticle";
import { API } from "../../utils/variables";
import "./user.scss";

function User(props) {
	const token = Cookies.get("token");
	const [data, setData] = useState();
	const loggedd = useAtomValue(logged);
	const [recucerValue, forceUpdate] = useReducer((x) => x + 1, 0);
	const isLogged = useAtomValue(logged);

	useEffect(() => {
		loggedd &&
			fetch(API + "member-data", {
				headers: { Authorization: `Bearer ${token}` },
			})
				.then((response) => {
					return response.json();
				})
				.then((res) => {
					console.log(res);
					setData(res.user);
				});
	}, [loggedd, setData, token, recucerValue]);

	// console.log(data)
	return (
		<div className='flex flex-col justify-center gap-2 relative'>
			{data && (
				<>
					<h1 className='text-2xl font-bold text-center mt-5'>{data.email}</h1>
					<div id='grid-container'>
						{isLogged && (
							<div id='form-container'>
								<h1>Nouvelle annonce</h1>
								<CreateArticle forceUpdate={forceUpdate} />
							</div>
						)}

						<div className='flex gap-8 flex-wrap'>
							{data.articles.map((item) => (
								<Article
									key={item.id}
									article={item}
									allowEdit={true}
									forceUpdate={forceUpdate}
								/>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default User;
