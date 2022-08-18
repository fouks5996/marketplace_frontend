import { Route, Routes } from "react-router-dom";
import FormLogin from "./components/forms/login";
import Form from "./components/forms/register";
import Layout from "./components/layout/Layout";
import About from "./pages/About";
import Home from "./pages/Home";

function App() {
	return (
		<Layout>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route path='/register' element={<Form />} />
				<Route path='/login' element={<FormLogin />} />
			</Routes>
		</Layout>
	);
}

export default App;
