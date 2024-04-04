import React from "react";

import styled from "styled-components";
import Widget from "../components/home/Widget";
import Table from "../components/home/Table";
import { useOrders } from "../context/Orders";
import { useGetStoreID } from "../hooks/Products";

const Container = styled.div``;

const Wrapper = styled.div``;

const WidgetContainer = styled.div`
	flex: 1;
	display: flex;
	max-width: 80%;
	margin: auto;
	padding: 10px;
`;

const TableContainer = styled.div`
	max-width: 80%;
	margin: auto;
	padding: 10px;
`;

function Home() {
	const storeID = useGetStoreID();
	const {
		countOrdersData,
		countUnpaidData,
		countSoldOutData,
		countCancelledOrdersData,
	} = useOrders();
	const count = countOrdersData(storeID);
	const unpaid = countUnpaidData(storeID);
	const soldout = countSoldOutData(storeID);
	const cancelled = countCancelledOrdersData(storeID);
	return (
		<>
			<Container>
				<Wrapper>
					<WidgetContainer>
						<Widget title='Orders' value={count != null && count} />
						<Widget title='Unpaid' value={unpaid != null && unpaid} />
						<Widget
							title='Sold Out Products'
							value={soldout != null && soldout}
						/>
						<Widget
							title='Canceled Order'
							value={cancelled != null && cancelled}
						/>
					</WidgetContainer>
					<TableContainer>
						<Table />
					</TableContainer>
				</Wrapper>
			</Container>
		</>
	);
}

export default Home;
