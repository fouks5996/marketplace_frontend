import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useGet";
import Cookies from "js-cookie";
import { API } from "../utils/variables";

function ArticleDetails() {
	const articleId = useParams().articleId;

	const [data, loading] = useFetch(
		`${API}/articles/${articleId}`,
		Cookies.get("token")
	);

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
