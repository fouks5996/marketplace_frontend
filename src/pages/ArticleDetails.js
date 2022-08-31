import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useGet";
import Cookies from "js-cookie";

function ArticleDetails() {
	const articleId = useParams().articleId;

	const [data, loading] = useFetch(
		`http://localhost:3000/articles/${articleId}`,
		Cookies.get("token")
	);
	console.log(data);

	return (
		<>
			{loading && (
				<>
					<h1>Page de détails : {articleId}</h1>
					<div>
						<h1>
							{data.title} : {data.price}
						</h1>
						<p>{data.content}</p>
						<p>{data.user.email}</p>
					</div>
				</>
			)}
		</>
	);
}

export default ArticleDetails;
