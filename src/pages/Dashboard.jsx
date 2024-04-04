import React, { useState } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import TopNav from "../components/navigator/TopNav";
import SideNav from "../components/navigator/SideNav";
const Container = styled.div`
	display: flex;
`;

const Flex = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`;

function Dashboard() {
	const [open, setOpen] = useState(true);
	const onHandleClick = () => {
		setOpen(!open);
	};
	return (
		<>
			<Container>
				<SideNav open={open} />
				<Flex>
					<TopNav handleClick={onHandleClick} />
					<Outlet />
				</Flex>
			</Container>
		</>
	);
}

export default Dashboard;
