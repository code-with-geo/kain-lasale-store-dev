import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/authentication/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Products from "./pages/products/Products";
import { ProductProvider } from "./context/Products";
import AddProducts from "./pages/products/AddProducts";
import EditProducts from "./pages/products/EditProducts";
import Orders from "./pages/orders/Orders";
import { OrdersProvider } from "./context/Orders";
import ViewOrder from "./pages/orders/ViewOrder";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { AuthProvider } from "./context/Auth";
import Store from "./pages/store/Store";
import { StoreProvider } from "./context/Store";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import ResetPassword from "./pages/authentication/ResetPassword";
import VerifyEmail from "./pages/authentication/VerifyEmail";

function App() {
	return (
		<div className='App'>
			<AuthProvider>
				<StoreProvider>
					<ProductProvider>
						<OrdersProvider>
							<Router>
								<Routes>
									<Route path='/login' element={<Login />} />
									<Route path='/forgot' element={<ForgotPassword />} />
									<Route
										path='/:userID/reset/:token'
										element={<ResetPassword />}
									/>
									<Route
										path='/:userID/verify/:token'
										element={<VerifyEmail />}
									/>
									<Route element={<ProtectedRoutes />}>
										<Route path='/' element={<Dashboard />}>
											<Route index element={<Home />} />
											<Route path='/products' element={<Products />} />
											<Route path='/products/add' element={<AddProducts />} />
											<Route
												path='/products/edit/:id'
												element={<EditProducts />}
											/>
											<Route path='/orders' element={<Orders />} />
											<Route
												path='/orders/view/:orderID'
												element={<ViewOrder />}
											/>
											<Route path='/stores' element={<Store />} />
										</Route>
									</Route>
								</Routes>
							</Router>
						</OrdersProvider>
					</ProductProvider>
				</StoreProvider>
			</AuthProvider>
		</div>
	);
}

export default App;
