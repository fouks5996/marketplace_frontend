import { useEffect, useState } from "react";

function useFetch(url, token = "", method = "GET") {
	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetch(url, {
			method: method,
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((res) => res.json())
			.then((res) => {
				setData(res);
				setLoading(true);
			});
	}, [url, token, method]);

	return [data, loading];
}

export default useFetch;
