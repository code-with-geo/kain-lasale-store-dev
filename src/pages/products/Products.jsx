import { KeyboardBackspace } from "@mui/icons-material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Table from "../../components/products/Table";

const Container = styled.div``;

const Wrapper = styled.div`
	max-width: 80%;
	margin: auto;
	padding: 10px;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Left = styled.div`
	display: flex;
	align-items: center;
	& h2 {
		font-size: 15px;
		margin-left: 10px;
		font-weight: 500;
	}
`;

const BackArrow = styled(KeyboardBackspace)`
	cursor: pointer;
`;

const Right = styled.div`
	display: flex;
	align-items: center;
`;

const Links = styled(Link)`
	background-color: #343a40;
	text-decoration: none;
	color: #fff;
	padding: 8px;
	font-size: 12px;
	font-weight: 400;
`;

const Body = styled.div``;

function Store() {
	const navigate = useNavigate();
	return (
		<>
			<Container>
				<Wrapper>
					<Header>
						<Left>
							<BackArrow fontSize='small' onClick={() => navigate("/")} />
							<h2>Products</h2>
						</Left>
						<Right>
							<Links to='/products/add'>Add Product</Links>
						</Right>
					</Header>
					<Body>
						<Table />
					</Body>
				</Wrapper>
			</Container>
		</>
	);
}

export default Store;
