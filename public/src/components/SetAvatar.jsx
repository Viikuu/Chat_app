import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';
import loader from '../assets/loader.gif';
import axios from 'axios';
import {setAvatarRoute} from '../utils/APIRoutes';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition:0.5s ease-in-out;
      img {
        height: 6rem;
      }
    }

    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }

  .randomize-button {
    background: linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%);
    color: white;
    padding: 0.8rem 1.8rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.3rem;
    font-size: 0.8rem;
    text-transform: uppercase;
  }

  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;

    &:hover {
      background-color: #4e0eff;
    }
  }

  @keyframes hover {
    0% {
      transform: scale(110%);
    }
    100% {
      transform: scale(110%);
    }
  }
  @keyframes click {
    0% {
      transform: scale(105%);
    }
    100% {
      transform: scale(105%);
    }
  }

  .avatar-button {
    background: inherit;
    border: none;
    cursor: pointer;
  }

  .avatar-button:hover {
    animation: hover;
    animation-fill-mode: forwards;
    animation-duration: 1s;
  }

  .avatar-button:active {
    animation: click;
    animation-duration: 1s;
  }
`;

export default function SetAvatar() {
	const navigate = useNavigate();
	const [avatars, setAvatars] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedAvatar, setSelectedAvatar] = useState(undefined);
	const toastOptions = {
		position: 'bottom-right',
		autoClose: 8000,
		pauseOnHover: true,
		draggable: true,
		theme: 'dark'
	};

	useEffect(() => {
		if(!localStorage.getItem("chat-app-user")){
			navigate("/login");
		}
	})

	const setProfilePicture = async () => {
		if (selectedAvatar === undefined) {
			toast.error('Please select an avatar', toastOptions);
		} else {
			const user = await JSON.parse(
				localStorage.getItem('chat-app-user')
			);

			const {data} = await axios.post(`${setAvatarRoute}/${user._id}`, {
				avatarColor: JSON.stringify(avatars[selectedAvatar]),
			});

			if (data.isSet) {
				user.isAvatarColorSet = true;
				user.avatarColor = data.avatarColor;
				localStorage.setItem(
					'chat-app-user',
					JSON.stringify(user)
				);
				navigate('/');
			} else {
				toast.error('Error setting avatar. Please try again.', toastOptions);
			}
		}
	};
	const randomAvatars = () => {
		const data = [];
		for (let i = 0; i < 4; i++) {
			data.push({background: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`} );
		}
		setAvatars(data);
		setIsLoading(false);
	}

	useEffect(() => {
		randomAvatars();
	}, []);

	return (
		<>
			{isLoading ? (
					<Container>
						{loader}
					</Container>
				) :
				(
					<Container>
						<div className="title-container">
							<h1>Pick an Avatar as your profile picture</h1>
						</div>
						<button className="randomize-button" onClick={() => randomAvatars()}>Randomize Avatars!</button>
						<div className="avatars">
							{avatars.map((avatar, index) => {
								return (
									<div
										key={index}
										className={`avatar ${
											selectedAvatar === index ? 'selected' : ''
										}`}
									>
										<button className="avatar-button" onClick={() => setSelectedAvatar(index)}>
											<div className={`avatar }`} style={avatar} />
										</button>
									</div>
								);
							})}
						</div>
						<button onClick={setProfilePicture} className="submit-btn">
							Set as Profile Picture
						</button>
						<ToastContainer/>
					</Container>
				)}
			)}
		</>
	);
};
