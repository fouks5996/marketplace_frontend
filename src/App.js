import { Route, Routes } from "react-router-dom";
import FormLogin from "./components/auth/login";
import Form from "./components/auth/register/register";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import ReinitPassword from "./pages/ReinitPassword";
import Sendemail from "./pages/Sendemail";
import User from "./pages/user/User";
import ArticleDetails from "./pages/articleDetails/ArticleDetails";

function App() {
	return (
		<Layout>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/user' element={<User />} />
				<Route path='/register' element={<Form />} />
				<Route path='/sendemail' element={<Sendemail />} />
				<Route path='/new_password/:tokenId' element={<ReinitPassword />} />
				<Route path='/login' element={<FormLogin />} />
				<Route path='/show/:articleId' element={<ArticleDetails />} />
			</Routes>
		</Layout>
	);
}

export default App;
