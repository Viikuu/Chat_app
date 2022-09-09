import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;

  .loader-container {
    height: 20rem;
    width: 20rem;
    border-radius: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;

    .loader {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 80px;
      height: 80px;
      margin: 8px;
      border: 8px solid;
      border-radius: 50%;
      animation: lds-ring 1.3s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: #fff transparent #b02a2a transparent;
    }
  }

  .loader-container .loader:nth-child(1) {
    animation-delay: -0.45s;
  }

  .loader-container .loader:nth-child(2) {
    animation-delay: -0.3s;
  }

  .loader-container .loader:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

`;

export function Loader() {
	return (
		<Container>
			<div className={'loader-container'}>
				<div className={'loader'}/>
				<div className={'loader'}/>
				<div className={'loader'}/>
			</div>
		</Container>

	)
}