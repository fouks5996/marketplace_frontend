import React, { useState } from "react";
import useFetch from "../hooks/useGet";

function About(props) {
	const [data, test] = useFetch("http://localhost:1337/api/posts", "", "GET");

	const [data1] = useFetch("http://localhost:1337/api/posts", "", "GET");

	return (
		<div>
			{" "}
			<h1 className='text-3xl font-bold underline'>Hello About!</h1>
		</div>
	);
}

export default About;
