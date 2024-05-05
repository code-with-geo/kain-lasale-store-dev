import { KeyboardBackspace } from "@mui/icons-material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Table from "../../components/orders/order-items/Table";
import { Button, Label } from "../../components/Components.styled";
import { useOrders } from "../../context/Orders";
import Axios from "axios";
import { ToggleMessage } from "../../utils/SweetAlert";
import Swal from "sweetalert2";

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
	margin-bottom: 20px;
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

const Body = styled.div``;

const ActionContianer = styled.div`
	display: flex;
	max-width: 60%;
	margin: auto;
	align-content: center;
	flex-direction: column;
`;

const Top = styled.div`
	display: flex;
	align-content: center;
	justify-content: right;
	margin-bottom: 20px;
`;

const Bottom = styled.div`
	display: flex;
	align-content: center;
	justify-content: right;
`;

function ViewOrder() {
	const navigate = useNavigate();
	const { orderID } = useParams();
	const { ordersDataByID } = useOrders();
	const data = ordersDataByID(orderID);
	const completeOrder = () => {
		Swal.fire({
			title: "Complete Order",
			text: "Are you sure you want to complete this order?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#b0c5a4",
			confirmButtonText: "Proceed",
			cancelButtonColor: "#FF204E",
			cancelButtonText: `Cancel`,
		}).then((result) => {
			if (result.isConfirmed) {
				try {
					Axios.post(
						`https://kain-lasalle-backend.onrender.com/orders/complete`,
						{
							orderID,
						}
					)
						.then((res) => {
							if (res.data.responsecode === "402") {
								ToggleMessage("error", res.data.message);
							} else if (res.data.responsecode === "200") {
								ToggleMessage("success", res.data.message);
								navigate("/orders");
							}
						})
						.catch((err) => {
							if (err.response) Error();
						});
				} catch (error) {
					console.log(error);
				}
			}
		});
	};

	const NotifyCustomer = (orderID) => {
		try {
			Axios.post(`https://kain-lasalle-backend.onrender.com/orders/notify`, {
				orderID,
			})
				.then((res) => {
					if (res.data.responsecode === "402") {
						ToggleMessage("error", res.data.message);
					} else if (res.data.responsecode === "200") {
						ToggleMessage("success", res.data.message);
					}
				})
				.catch((err) => {
					if (err.response) Error();
				});
		} catch (error) {
			console.log(error);
		}
	};

	const TagAsPaid = (orderID) => {
		Swal.fire({
			title: "Cash Payment",
			text: "Are you sure you want to tag this order payment as paid?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#b0c5a4",
			confirmButtonText: "Proceed",
			cancelButtonColor: "#FF204E",
			cancelButtonText: `Cancel`,
		}).then((result) => {
			if (result.isConfirmed) {
				try {
					Axios.post(
						`https://kain-lasalle-backend.onrender.com/orders/tag-as-paid`,
						{
							orderID,
						}
					)
						.then((res) => {
							if (res.data.responsecode === "402") {
								ToggleMessage("error", res.data.message);
							} else if (res.data.responsecode === "200") {
								ToggleMessage("success", res.data.message);
							}
						})
						.catch((err) => {
							if (err.response) Error();
						});
				} catch (error) {
					console.log(error);
				}
			}
		});
	};
	return (
		<>
			<Container>
				<Wrapper>
					<Header>
						<Left>
							<BackArrow fontSize='small' onClick={() => navigate("/")} />
							<h2>Ordered Product</h2>
						</Left>
						<Right>
							<Label fontSize='13px' display='flex' alignItems='center'>
								Order Status:
								<Label fontSize='13px' marginLeft='10px'>
									{data != null && data[0].orderStatus}
								</Label>
							</Label>
						</Right>
					</Header>
					<Body>
						<Table orderID={orderID} />
					</Body>
					<ActionContianer>
						<Label fontSize='13px' display='flex' alignItems='center'>
							Payment Status:
							<Label fontSize='13px' marginLeft='10px'>
								{data != null && data[0].paymentStatus}
							</Label>
						</Label>
						<Label fontSize='13px' display='flex' alignItems='center'>
							Payment Type:
							<Label fontSize='13px' marginLeft='10px'>
								{data != null && data[0].paymentType}
							</Label>
						</Label>
						<Top>
							<Label marginRight='10px'>Total</Label>
							<Label>{data != null && data[0].total}</Label>
						</Top>
						<Bottom>
							{data != null && data[0].paymentType === "Cash" && (
								<Button
									marginRight='10px'
									height='40px'
									width='200px'
									bgColor='#b0c5a4'
									color='#fff'
									onClick={() => TagAsPaid()}>
									Paid
								</Button>
							)}
							<Button
								marginRight='10px'
								height='40px'
								width='200px'
								bgColor='#b0c5a4'
								color='#fff'
								onClick={() => NotifyCustomer(data != null && data[0]._id)}>
								Ready to Serve
							</Button>
							<Button
								height='40px'
								width='200px'
								bgColor='#b0c5a4'
								color='#fff'
								onClick={() => completeOrder()}>
								Complete Order
							</Button>
						</Bottom>
					</ActionContianer>
				</Wrapper>
			</Container>
		</>
	);
}

export default ViewOrder;
