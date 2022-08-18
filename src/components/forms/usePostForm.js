import Cookies from "js-cookie";

function usePostForm(url, data, setLogged, navigate, path) {
	fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((res) => res.json())
		.then((res) => {
			Cookies.set("token", res.jwt);
			setLogged && setLogged(true);
			navigate && navigate(path);
		});
}

export default usePostForm;
