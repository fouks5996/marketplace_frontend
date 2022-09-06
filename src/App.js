import { Route, Routes } from "react-router-dom";
import FormLogin from "./components/auth/login";
import Form from "./components/auth/register/register";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import ReinitPassword from "./pages/ReinitPassword";
import Sendemail from "./pages/Sendemail";
import User from "./pages/user/User";
import ArticleDetails from "./pages/articleDetails/ArticleDetails";
import Map from "./pages/map/Map";
import Chat from "./pages/chat/Chat";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {

	return (

			<Layout>
				<Routes>
					<Route path='/' element={<Home/>} />
					<Route element={<ProtectedRoutes/>}>
						<Route path='/user' element={<User />} />
						<Route path="/user/chat" element={<Chat/>}/>
					</Route>
					<Route path='/register' element={<Form />} />
					<Route path='/sendemail' element={<Sendemail />} />
					<Route path='/new_password/:tokenId' element={<ReinitPassword />} />
					<Route path='/login' element={<FormLogin />} />
					<Route path='/show/:articleId' element={<ArticleDetails />} />
					<Route path="/map" element={<Map/>}/>
					
				</Routes>
			</Layout>

	);
}

export default App;
