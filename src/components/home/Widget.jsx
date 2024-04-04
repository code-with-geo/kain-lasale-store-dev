import { Label } from "../Components.styled";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
	flex: 1;
	padding: 20px;
`;

const Wrapper = styled.div`
	height: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	box-shadow: 2px 0px 32px -1px rgba(0, 0, 0, 0.15);
	-webkit-box-shadow: 2px 0px 32px -1px rgba(0, 0, 0, 0.15);
	-moz-box-shadow: 2px 0px 32px -1px rgba(0, 0, 0, 0.15);
`;

function Widget({ title, value }) {
	return (
		<>
			<Container>
				<Wrapper>
					<Label
						fontSize='18px'
						fontWeight='500'
						color='#98ca7a'
						marginBottom='10px'>
						{value}
					</Label>
					<Label fontSize='12px' fontWeight='400'>
						{title}
					</Label>
				</Wrapper>
			</Container>
		</>
	);
}

export default Widget;
