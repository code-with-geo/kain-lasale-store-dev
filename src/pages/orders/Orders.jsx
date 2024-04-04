import { KeyboardBackspace } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Table from "../../components/orders/Table";

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

const Body = styled.div``;

function Orders() {
	const navigate = useNavigate();
	return (
		<>
			<Container>
				<Wrapper>
					<Header>
						<Left>
							<BackArrow fontSize='small' onClick={() => navigate("/")} />
							<h2>Orders</h2>
						</Left>
					</Header>
					<Body>
						<Table />
					</Body>
				</Wrapper>
			</Container>
		</>
	);
}

export default Orders;
