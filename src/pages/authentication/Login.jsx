import React from "react";
import styled from "styled-components";
import {
	Button,
	Label,
	PageLinks,
	TextBox,
} from "../../components/Components.styled";
import Axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/Auth";
import { ToggleMessage } from "../../utils/SweetAlert";

const Container = styled.div`
	height: 100vh;
`;

const Header = styled.header`
	height: 100px;
	display: flex;
	align-items: center;
	box-shadow: 1px 8px 13px -9px rgba(0, 0, 0, 0.21);
	-webkit-box-shadow: 1px 8px 13px -9px rgba(0, 0, 0, 0.21);
	-moz-box-shadow: 1px 8px 13px -9px rgba(0, 0, 0, 0.21);
`;

const Nav = styled.div`
	width: 100%;
	max-width: 80%;
	margin: auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #fff;
`;

const Left = styled.div`
	display: flex;
	align-items: center;
`;

const Logo = styled.img`
	width: 120px;
	height: 100px;
	cursor: pointer;
`;

const Right = styled.div``;

const Body = styled.body`
	height: calc(100vh - 101px);
`;

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	max-width: 80%;
	margin: auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const BodyLeft = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 100%;
`;
const BodyRight = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
`;

const Image = styled.img`
	width: 400px;
	height: 400px;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	border: 1px solid #dcdee1;
`;

function Login() {
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm();
	const [_, setCookies] = useCookies(["access_token"]);
	const { login } = useAuth();

	const _login = (data, event) => {
		event.preventDefault();
		try {
			Axios.post(`https://kain-lasalle-backend.onrender.com/vendors/login`, {
				email: data.Email,
				password: data.Password,
			})
				.then((res) => {
					if (res.data.responsecode === "402") {
						ToggleMessage("error", res.data.message);
					} else if (res.data.responsecode === "200") {
						login();
						setCookies("access_token", res.data.token);
						window.localStorage.setItem("vendorID", res.data.vendorID);
						window.localStorage.setItem("storeID", res.data.storeID);
						window.localStorage.setItem("isAuthenticated", "true");
						navigate("/");
					}
				})
				.catch((err) => {
					if (err.response) Error();
				});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Container>
				<Header>
					<Nav>
						<Left>
							<Logo
								src='https://firebasestorage.googleapis.com/v0/b/studies-14951.appspot.com/o/assets%2Flogo-1.png?alt=media&token=6cefb280-8676-4b1a-8857-20b5da4757e6'
								alt=''
							/>
						</Left>
						<Right></Right>
					</Nav>
				</Header>
				<Body>
					<Wrapper>
						<BodyLeft>
							<Label fontSize='18px' fontWeight='400' marginRight='200px'>
								Manage your store on
								<Label color='#98ca7a' fontSize='25px' fontWeight='600'>
									Kain La Salle
								</Label>
							</Label>
							<Image
								src='https://firebasestorage.googleapis.com/v0/b/studies-14951.appspot.com/o/assets%2Fshop-logo%20(1).svg?alt=media&token=2207d5ad-21ee-4b5f-86d0-1d28b6ac7ad1'
								alt=''
							/>
						</BodyLeft>
						<BodyRight>
							<Form onSubmit={handleSubmit(_login)}>
								<Label
									marginRight='180px'
									fontSize='20px'
									color='#98ca7a'
									fontWeight='500'>
									Secured Login
								</Label>
								<Label
									fontSize='13px'
									fontWeight='400'
									marginBottom='20px'
									marginRight='140px'>
									Enter your registered email
								</Label>
								<TextBox
									type='email'
									width='300px'
									height='40px'
									marginBottom='10px'
									placeholder='Please enter your email'
									required='true'
									{...register("Email")}
								/>
								<TextBox
									type='password'
									width='300px'
									height='40px'
									marginBottom='10px'
									placeholder='Please enter your password'
									required='true'
									minLength={8}
									{...register("Password")}
								/>
								<PageLinks
									marginBottom='10px'
									color='#000000'
									fontSize='12px'
									marginRight='205px'
									to='/forgot'>
									Forgot Password?
								</PageLinks>
								<Button
									width='320px'
									height='40px'
									bgColor='#b0c5a4'
									color='#fff'>
									Continue
								</Button>
							</Form>
						</BodyRight>
					</Wrapper>
				</Body>
			</Container>
		</>
	);
}

export default Login;
