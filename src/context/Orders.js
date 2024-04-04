import React, { createContext, useContext, useEffect, useState } from "react";
import Axios from "axios";

const OrdersContext = createContext();

const GetAllOrders = (storeID) => {
	const [orders, setOrders] = useState(null);

	useEffect(() => {
		const getAllOrders = () => {
			try {
				Axios.post(
					`https://kain-lasalle-backend.onrender.com/orders/get-by-id`,
					{
						storeID,
					}
				)
					.then((res) => {
						setOrders(res.data.orders);
					})
					.catch((err) => {
						if (err.response) Error();
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		};
		const interval = setInterval(getAllOrders, 1000);
		return () => clearInterval(interval);
	}, [storeID]);
	return orders;
};

const GetOrdersByID = (orderID) => {
	const [orders, setOrders] = useState(null);

	useEffect(() => {
		const getOrders = () => {
			try {
				Axios.post(
					`https://kain-lasalle-backend.onrender.com/orders/get-by-order-id`,
					{
						orderID,
					}
				)
					.then((res) => {
						setOrders(res.data.orders);
					})
					.catch((err) => {
						if (err.response) Error();
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		};
		const interval = setInterval(getOrders, 1000);
		return () => clearInterval(interval);
	}, [orderID]);
	return orders;
};

const GetOrderItems = (orderID) => {
	const [items, setItems] = useState(null);

	useEffect(() => {
		const getAllItems = () => {
			try {
				Axios.post(
					`https://kain-lasalle-backend.onrender.com/orders/get-products`,
					{
						orderID,
					}
				)
					.then((res) => {
						setItems(res.data.orders);
					})
					.catch((err) => {
						if (err.response) Error();
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		};
		const interval = setInterval(getAllItems, 1000);
		return () => clearInterval(interval);
	}, [orderID]);
	return items;
};

const GetAllPending = (storeID) => {
	const [orders, setOrders] = useState(null);

	useEffect(() => {
		const getAllPendingOrders = () => {
			try {
				Axios.post(`https://kain-lasalle-backend.onrender.com/orders/pending`, {
					storeID,
				})
					.then((res) => {
						setOrders(res.data.orders);
					})
					.catch((err) => {
						if (err.response) Error();
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		};
		const interval = setInterval(getAllPendingOrders, 1000);
		return () => clearInterval(interval);
	}, [storeID]);
	return orders;
};

const GetOrdersCount = (storeID) => {
	const [orders, setOrders] = useState(null);

	useEffect(() => {
		const getOrderCount = () => {
			try {
				Axios.post(`https://kain-lasalle-backend.onrender.com/orders/count`, {
					storeID,
				})
					.then((res) => {
						if (res.data.responsecode === "200") {
							setOrders(res.data.orders);
						} else {
							setOrders("0");
						}
					})
					.catch((err) => {
						if (err.response) Error();
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		};
		const interval = setInterval(getOrderCount, 1000);
		return () => clearInterval(interval);
	}, [storeID]);
	return orders;
};

const GetUnpaidOrderCount = (storeID) => {
	const [orders, setOrders] = useState(null);

	useEffect(() => {
		const getUnpaidOrderCount = () => {
			try {
				Axios.post(`https://kain-lasalle-backend.onrender.com/orders/unpaid`, {
					storeID,
				})
					.then((res) => {
						if (res.data.responsecode === "200") {
							setOrders(res.data.orders);
						} else {
							setOrders("0");
						}
					})
					.catch((err) => {
						if (err.response) Error();
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		};
		const interval = setInterval(getUnpaidOrderCount, 1000);
		return () => clearInterval(interval);
	}, [storeID]);
	return orders;
};

const GetSoldOutProduct = (storeID) => {
	const [products, setProducts] = useState(null);

	useEffect(() => {
		const getSoldOutProducts = () => {
			try {
				Axios.post(`https://kain-lasalle-backend.onrender.com/orders/soldout`, {
					storeID,
				})
					.then((res) => {
						if (res.data.responsecode === "200") {
							setProducts(res.data.products);
						} else {
							setProducts("0");
						}
					})
					.catch((err) => {
						if (err.response) Error();
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		};
		const interval = setInterval(getSoldOutProducts, 1000);
		return () => clearInterval(interval);
	}, [storeID]);
	return products;
};

const GetCancelledOrders = (storeID) => {
	const [orders, setOrders] = useState(null);

	useEffect(() => {
		const getCancelledCount = () => {
			try {
				Axios.post(
					`https://kain-lasalle-backend.onrender.com/orders/cancelled`,
					{
						storeID,
					}
				)
					.then((res) => {
						if (res.data.responsecode === "200") {
							setOrders(res.data.orders);
						} else {
							setOrders("0");
						}
					})
					.catch((err) => {
						if (err.response) Error();
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		};
		const interval = setInterval(getCancelledCount, 1000);
		return () => clearInterval(interval);
	}, [storeID]);
	return orders;
};

export const OrdersProvider = (props) => {
	const ordersData = (storeID) => GetAllOrders(storeID);
	const ordersItemData = (orderID) => GetOrderItems(orderID);
	const ordersDataByID = (orderID) => GetOrdersByID(orderID);
	const pendingOrdersData = (storeID) => GetAllPending(storeID);
	const countOrdersData = (storeID) => GetOrdersCount(storeID);
	const countUnpaidData = (storeID) => GetUnpaidOrderCount(storeID);
	const countSoldOutData = (storeID) => GetSoldOutProduct(storeID);
	const countCancelledOrdersData = (storeID) => GetCancelledOrders(storeID);

	const ordersMethod = {
		ordersData,
		ordersItemData,
		ordersDataByID,
		pendingOrdersData,
		countOrdersData,
		countUnpaidData,
		countSoldOutData,
		countCancelledOrdersData,
	};
	return (
		<OrdersContext.Provider value={ordersMethod}>
			{props.children}
		</OrdersContext.Provider>
	);
};

export const useOrders = () => {
	return useContext(OrdersContext);
};
