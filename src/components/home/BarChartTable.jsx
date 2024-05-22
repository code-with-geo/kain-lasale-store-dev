import React from "react";
import {
	BarChart,
	CartesianGrid,
	Legend,
	XAxis,
	YAxis,
	Bar,
	Tooltip,
} from "recharts";
import styled from "styled-components";
import { Label } from "../Components.styled";
import { useGetStoreID } from "../../hooks/Products";
import { useOrders } from "../../context/Orders";

const Container = styled.div`
	margin-top: 20px;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

function BarChartTable() {
	const storeID = useGetStoreID();
	const { todaysSaleData, yesterdaysSaleData } = useOrders();
	let todaysSale = todaysSaleData(storeID);
	let yesterdaysSale = yesterdaysSaleData(storeID);
	const data = [
		{
			Day: "Yesterday",
			Sale: yesterdaysSale != null && yesterdaysSale,
		},
		{
			Day: "Today",
			Sale: todaysSale != null && todaysSale,
		},
	];

	return (
		<>
			<Container>
				<Header>
					<Label>Daily Sales</Label>
				</Header>
				<BarChart width={1000} height={250} data={data}>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='Day' />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey='Sale' fill='#8884d8' />
				</BarChart>
			</Container>
		</>
	);
}

export default BarChartTable;
