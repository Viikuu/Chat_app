import React from "react";
import styled from "styled-components";
import {Loader} from './Loader';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  span {
    color: #4e0eff;
  }
`;

export default function Welcome({currentUser}) {
	return (
		<Container>
			<Loader/>
			<h1>
				Welcome {currentUser.username}
			</h1>
			<h3>Please select a chat to Start messaging.</h3>
		</Container>
	);
};
