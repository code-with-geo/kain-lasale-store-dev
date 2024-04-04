import React from "react";
import styled from "styled-components";
import { Label } from "../Components.styled";
import { Link } from "react-router-dom";
import {
	FactCheck,
	Home,
	Inventory,
	ShowChart,
	Store,
} from "@mui/icons-material";

const Container = styled.div`
	width: ${(props) => props.width};
	overflow-x: hidden;
	height: 100vh;
	transition: 0.3s ease;
	top: 0;
	position: sticky;
	z-index: 999;
	border-right: 1px solid #dcdee1;

	@media (max-width: ${({ theme }) => theme.mobile}) {
		width: ${(props) => props.mediaWidth};
	}
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 10px;
`;

const List = styled.ul`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
	list-style: none;
`;

const ListItem = styled.li`
	width: 200px;
	display: flex;
	align-items: center;
	border-radius: 5px;
	@media (max-width: ${({ theme }) => theme.mobile}) {
		width: 100px;
	}
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
	&:hover {
		background-color: #c8c6c6;
	}
`;

function SideNav(props) {
	return (
		<>
			<Container
				width={!props.open ? "220px" : "0px"}
				mediaWidth={!props.open ? "120px" : "0px"}>
				<Wrapper>
					<List>
						<ListItem>
							<PageLinks to='/'>
								<Home fontSize='small' />
								<Label marginLeft='5px' fontSize='12px'>
									Home
								</Label>
							</PageLinks>
						</ListItem>
						<ListItem>
							<PageLinks to='/orders'>
								<FactCheck fontSize='small' />
								<Label marginLeft='5px' fontSize='12px'>
									Order
								</Label>
							</PageLinks>
						</ListItem>
						<ListItem>
							<PageLinks to='/products'>
								<Inventory fontSize='small' />
								<Label marginLeft='5px' fontSize='12px'>
									Product
								</Label>
							</PageLinks>
						</ListItem>
						<ListItem>
							<PageLinks to='/stores'>
								<Store fontSize='small' />
								<Label marginLeft='5px' fontSize='12px'>
									Store
								</Label>
							</PageLinks>
						</ListItem>
					</List>
				</Wrapper>
			</Container>
		</>
	);
}

export default SideNav;
