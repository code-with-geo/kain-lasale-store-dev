import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "../Components.styled";
import { Logout, Menu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useAuth } from "../../context/Auth";

const Container = styled.div`
	height: 80px;
	display: flex;
	align-items: center;
	top: 0;
	position: sticky;
	z-index: 999;
	justify-content: space-between;
	background-color: #fff;
	border-bottom: 1px solid #dcdee1;
`;

const Left = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Right = styled.div``;

const List = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	list-style: none;
`;

const ListItem = styled.div`
	display: flex;
	align-items: center;
	margin-right: ${(props) => props.marginRight};
`;

export const PageLinks = styled(Link)`
	width: 100%;
	height: ${(props) => props.height};
	padding: 5px;
	color: #323232;
	text-decoration: none;
	font-size: 13px;
	text-align: ${(props) => props.textAlign};
	margin-left: ${(props) => props.marginLeft};
	margin-right: ${(props) => props.marginRight};
	margin-top: ${(props) => props.marginTop};
	margin-bottom: ${(props) => props.marginBottom};
	transition: 0.3s ease;
	display: flex;
	align-items: center;
	justify-content: left;
	border-radius: 5px;
`;

function TopNav({ handleClick }) {
	const [cookies, setCookies] = useCookies(["access_token"]);
	const navigate = useNavigate();
	const { logout } = useAuth();
	const _logout = () => {
		logout();
		setCookies("access_token", "");
		window.localStorage.clear();
	};

	return (
		<>
			<Container>
				<Left>
					<Button
						marginLeft='20px'
						bgColor='#fff'
						onClick={() => handleClick()}>
						<Menu fontSize='small' />
					</Button>
				</Left>
				<Right>
					<List>
						<ListItem marginRight='20px'>
							<PageLinks
								padding='5px'
								display='flex'
								alignItems='center'
								textAlign='center'
								justifyContent='left'>
								<Logout
									fontSize='small'
									onClick={() => {
										_logout();
									}}
								/>
							</PageLinks>
						</ListItem>
					</List>
				</Right>
			</Container>
		</>
	);
}

export default TopNav;
