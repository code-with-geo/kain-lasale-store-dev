import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { KeyboardBackspace } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Button, Label, TextBox } from "../../components/Components.styled";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { useGetStoreID } from "../../hooks/Products";
import { useStore } from "../../context/Store";
import { ToggleMessage } from "../../utils/SweetAlert";

const Container = styled.div``;

const Wrapper = styled.div`
	max-width: 50%;
	margin: auto;
	padding: 10px;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
	& h2 {
		margin-left: 10px;
		font-size: 15px;
		font-weight: 400;
	}
`;

const BackArrow = styled(KeyboardBackspace)`
	cursor: pointer;
`;

const Body = styled.div``;

const List = styled.ul`
	display: flex;
	align-items: center;
	flex-direction: column;
	list-style: none;
	gap: 10px;
`;

const ListItem = styled.li`
	display: ${(props) => props.display};
	align-items: ${(props) => props.alignItems};
	flex-direction: ${(props) => props.flexDirection};
`;

const Image = styled.img`
	width: 150px;
	height: 150px;
	margin-bottom: 10px;
`;

const TextArea = styled.textarea`
	resize: none;
	line-height: 28px;
	padding: 0 0.5rem;
	border: 2px solid transparent;
	border-radius: 5px;
	outline: none;
	background-color: #fff;
	color: rgba(0, 0, 0, 0.7);
	transition: 0.3s ease;
	border-color: #e2e8ec;
	width: 515px;
	height: 150px;
	&:focus {
		outline: none;
		border-color: #b0c5a4;
		background-color: #fff;
	}

	&:hover {
		border-color: #b0c5a4;
	}
`;

function Store() {
	const storeID = useGetStoreID();
	const { storeDataByID } = useStore();
	const store = storeDataByID(storeID);
	const navigate = useNavigate(storeID);
	const { handleSubmit } = useForm();

	const [files, setFiles] = useState(null);
	const [preview, setPreview] = useState();
	const [image, setImage] = useState();

	const [name, setName] = useState();
	const [address, setAddress] = useState();
	const [description, setDescription] = useState();
	const [contactPerson, setContactPerson] = useState();
	const [contactNo, setContactNo] = useState();
	const [storeHour, setStoreHour] = useState();

	useEffect(() => {
		if (store != null) {
			setName(store.name);
			setAddress(store.address);
			setDescription(store.description);
			setContactPerson(store.contactperson);
			setContactNo(store.contactno);
			setStoreHour(store.storehour);
			setImage(store.image);
		}

		if (!files) return;

		let tmp = [];
		for (let i = 0; i < files.length; i++) {
			tmp.push(URL.createObjectURL(files[i]));
		}

		const objectUrls = tmp;
		setPreview(objectUrls);

		for (let i = 0; i < objectUrls.length; i++) {
			return () => {
				URL.revokeObjectURL(objectUrls[i]);
			};
		}
	}, [files, store]);

	const _editStore = (data, event) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append("storeID", storeID);
		formData.append("name", name);
		formData.append("address", address);
		formData.append("description", description);
		formData.append("contactperson", contactPerson);
		formData.append("contactno", contactNo);
		formData.append("storehour", storeHour);

		if (files !== null) {
			formData.append("file", files[0]);
		}

		try {
			Axios.post(
				`https://kain-lasalle-backend.onrender.com/stores/edit`,
				formData,
				{
					storeID,
					name,
					address,
					description,
					contactperson: contactPerson,
					contactno: contactNo,
					storehour: storeHour,
				}
			)
				.then((res) => {
					if (res.data.responsecode === "402") {
						console.log(res.data.message);
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

	return (
		<>
			<Container>
				<Wrapper>
					<Header>
						<BackArrow fontSize='small' onClick={() => navigate("/")} />
						<h2>Store</h2>
					</Header>
					<Body>
						<form onSubmit={handleSubmit(_editStore)}>
							<List>
								<ListItem
									display='flex'
									alignItems='center'
									flexDirection='column'>
									{files ? <Image src={preview} /> : <Image src={image} />}
									<Label
										name='Image'
										marginBottom='10px'
										fontSize='15px'
										fontWeight='400'
										color='#a8a8a9'>
										Store Image
									</Label>
									<TextBox
										type='file'
										height='30px'
										width='515px'
										accept='image/jpg, image/png, image/jpeg'
										onChange={(e) => {
											if (e.target.files && e.target.files.length > 0) {
												setFiles(e.target.files);
											}
										}}
									/>
								</ListItem>

								<ListItem>
									<TextBox
										type='text'
										height='30px'
										width='515px'
										placeholder='Please enter product name'
										required
										value={name}
										onChange={(e) => {
											setName(e.target.value);
										}}
									/>
								</ListItem>
								<ListItem>
									<TextArea
										placeholder='Please enter address'
										required
										value={address}
										onChange={(e) => {
											setAddress(e.target.value);
										}}
									/>
								</ListItem>
								<ListItem>
									<TextArea
										placeholder='Please enter product description'
										required
										value={description}
										onChange={(e) => {
											setDescription(e.target.value);
										}}
									/>
								</ListItem>
								<ListItem>
									<TextBox
										type='text'
										height='30px'
										width='515px'
										placeholder='Please enter contact person'
										required
										value={contactPerson}
										onChange={(e) => {
											setContactPerson(e.target.value);
										}}
									/>
								</ListItem>
								<ListItem>
									<TextBox
										type='text'
										height='30px'
										width='515px'
										placeholder='Please enter contact no.'
										required
										value={contactNo}
										onChange={(e) => {
											setContactNo(e.target.value);
										}}
									/>
								</ListItem>
								<ListItem>
									<TextBox
										type='text'
										height='30px'
										width='515px'
										placeholder='Please enter store hour'
										required
										value={name}
										onChange={(e) => {
											setStoreHour(e.target.value);
										}}
									/>
								</ListItem>
								<ListItem>
									<Button
										width='535px'
										height='40px'
										color='#fff'
										borderRadius='5px'
										bgColor='#343a40'
										type='submit'>
										Save
									</Button>
								</ListItem>
							</List>
						</form>
					</Body>
				</Wrapper>
			</Container>
		</>
	);
}

export default Store;
