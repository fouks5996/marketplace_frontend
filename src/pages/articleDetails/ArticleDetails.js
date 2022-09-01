import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useGet";
import Cookies from "js-cookie";
import { API } from "../../utils/variables";
import './ArticleDetails.scss';

function ArticleDetails() {
	const articleId = useParams().articleId;

	const [data, loading] = useFetch(
		`${API}/articles/${articleId}`,
		Cookies.get("token")
	);

	return (
		<div id="details-container">
			{loading && (
				<>
				<div >
					<img src='https://d1fmx1rbmqrxrr.cloudfront.net/zdnet/i/edit/ne/2017/09/issy_610.jpg' alt="bien immobilier"/>
				</div>

			
					
				<div>
					<h1>
						{data.title} : {data.price}€
					</h1>
					<ul>
						<li>Descripition : {data.content}</li>
						<li>Propriétaire : {data.user.email}</li>
					</ul>
					
				</div>
				
				</>
			
				
			)}
		</div>
	);
}

export default ArticleDetails;
