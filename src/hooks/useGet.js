import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function useFetch(url, token = "", method = "GET") {
	const [data, setData] = useState();

	useEffect(() => {
		fetch(url, {
			method: method,
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((res) => res.json())
			.then((res) => {
				setData(res);
			});
	}, [url, token, method]);

	return [data];
}

export default useFetch;
