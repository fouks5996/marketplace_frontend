import React, { useEffect, useReducer, useState } from "react";
import { API } from "../../utils/variables";
import Article from "../../components/article/Article";
import hero from "../../assets/images/hero.jpeg";
import { Link } from "react-router-dom";
import "./home.scss";
import { logged } from "../../components/atoms/logged";
import { useAtomValue } from "jotai";
import ScrollReveal from "scrollreveal";

function Home(props) {
	const [data, setData] = useState();
	const [recucerValue, forceUpdate] = useReducer((x) => x + 1, 0);
	const isLogged = useAtomValue(logged);

	useEffect(() => {
		fetch(API + "articles")
			.then((response) => {
				return response.json();
			})
			.then((res) => {
				setData(res);
			});
	}, [setData, recucerValue]);

	useEffect(() => {
		let slideUp = {
			distance: "10px",
			origin: "bottom",
			opacity: 1,
			duration: 300,
			reset: true,
			easing: "ease-in-out",
		};
		ScrollReveal().reveal(".reveal", slideUp);
	}, []);

	return (
		<div className='home'>
			<div className='hero-container'>
				<div className='img-container'>
					<img src={hero} alt='' />
					<h1>Bienvenue sur notre MarketPlace</h1>
					<div className='btn-container'>
						<Link to={isLogged ? "/user" : "/login"}>
							<button>Acheter des biens</button>
						</Link>
						<Link to={isLogged ? "/user" : "/login"}>
							<button>Vendre des biens</button>
						</Link>
					</div>
				</div>
			</div>

			<h1 className='text-center font-bold text-2xl my-10 mb-10 reveal'>
				{" "}
				Voici les appartements qui peuvent vous intéresser{" "}
			</h1>
			<div className='flex gap-10 flex-wrap mx-24 mt-4'>
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
