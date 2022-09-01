import React, { useEffect, useReducer, useState } from "react";
import { API } from "../../utils/variables";
import Article from "../../components/article/Article";
import hero from "../../assets/images/hero.jpeg";
import "./home.scss";

function Home(props) {
	const [data, setData] = useState();
	const [recucerValue, forceUpdate] = useReducer((x) => x + 1, 0);

	useEffect(() => {
		fetch(API + "articles")
			.then((response) => {
				return response.json();
			})
			.then((res) => {
				setData(res);
			});
	}, [setData, recucerValue]);

	return (
		<div className='home'>
			<div className='hero-container'>
				<div className='img-container'>
					<img src={hero} alt='' />
					<h1>Bienvenue sur notre MarketPlace</h1>
					<div className='btn-container'>
						<button>Acheter des biens</button>
						<button>Vendre des biens</button>
					</div>
				</div>
			</div>

			<div className='flex gap-2 flex-wrap'>
				{data &&
					data.map((article) => (
						<Article
							key={article.id}
							article={article}
							forceUpdate={forceUpdate}
							allowEdit={false}
						/>
					))}
			</div>
		</div>
	);
}

export default Home;
