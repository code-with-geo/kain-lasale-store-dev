import React, { createContext, useContext, useEffect, useState } from "react";
import Axios from "axios";

const StoreContext = createContext();

const GetStoreByID = (storeID) => {
	const [store, setStore] = useState(null);
	useEffect(() => {
		const getStore = () => {
			try {
				Axios.post(`https://kain-lasalle-backend.onrender.com/stores/`, {
					storeID,
				})
					.then((res) => {
						setStore(res.data.store);
					})
					.catch((err) => {
						if (err.response) Error();
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		};
		getStore();
	}, [storeID]);
	return store;
};

export const StoreProvider = (props) => {
	const storeDataByID = (storeID) => GetStoreByID(storeID);

	const storeMethod = {
		storeDataByID,
	};
	return (
		<StoreContext.Provider value={storeMethod}>
			{props.children}
		</StoreContext.Provider>
	);
};

export const useStore = () => {
	return useContext(StoreContext);
};
