import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import ActionButton from "./ActionButton";
import { useGetStoreID } from "../../hooks/Products";
import { useOrders } from "../../context/Orders";

const Container = styled.div`
	margin-top: 20px;
	height: 500px;
`;

const Image = styled.img`
	width: 50px;
	height: 50px;
`;
const TableColumns = [
	{
		field: "_id",
		headerName: "Order ID",
		flex: 1,
		resizable: false,
		headerClassName: "theme-header",
	},
	{
		field: "total",
		headerName: "Total",
		flex: 1,
		headerClassName: "theme-header",
		resizable: false,
	},
	{
		field: "orderStatus",
		headerName: "Status",
		flex: 1,
		headerClassName: "theme-header",
		resizable: false,
	},
	{
		field: "orderDateTime",
		headerName: "Date/Time",
		flex: 1,
		headerClassName: "theme-header",
		resizable: false,
	},
	{
		field: "actions",
		headerName: "Actions",
		type: "actions",
		flex: 1,
		headerClassName: "theme-header",
		resizable: false,
		renderCell: (params) => <ActionButton {...{ params }} />,
	},
];
function Table() {
	const storeID = useGetStoreID();
	const { ordersData } = useOrders();
	const data = ordersData(storeID);
	return (
		<>
			<Container>
				<DataGrid
					sx={{
						fontSize: "10px",
						overflowX: "auto",
						"& .theme-header": {
							backgroundColor: "#343a40",
							color: "#fff",

							":hover": { color: "#fff" },
						},
						"& .css-ptiqhd-MuiSvgIcon-root": {
							color: "#fff",
						},
					}}
					getRowId={(row) => row._id}
					rows={data != null && data}
					columns={TableColumns}
					initialState={{
						pagination: {
							paginationModel: { page: 0, pageSize: 5 },
						},
					}}
					pageSizeOptions={[5, 10]}
				/>
			</Container>
		</>
	);
}

export default Table;
