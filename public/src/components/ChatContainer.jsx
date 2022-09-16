import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import {receiveMessageRoute, sendMessageRoute} from '../utils/APIRoutes';

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }

  .avatar {
    height: 3rem;
    width: 3rem;
    max-inline-size: 100%;
    padding: 10px;
  !important;
    border-radius: 2rem;
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;

      .avatar {
        img {
          height: 3rem;
        }
      }

      .username {
        h3 {
          color: white;
        }
      }
    }
  }

  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0.2rem;

      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .message {
      display: flex;
      align-items: center;

      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }

    .sended {
      justify-content: flex-end;

      .content {
        background-color: #4f04ff21;
      }
    }

    .received {
      justify-content: flex-start;

      .content {
        background-color: #9900ff20;
      }
    }
  }
`;

export function ChatContainer({currentChat, socket, currentUser}) {
	const [messages, setMessages] = useState([]);
	const scrollRef = useRef();
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const messages = async () => {
			const response = await axios.post(receiveMessageRoute, {
				from: currentUser._id,
				to: currentChat._id
			});
			setMessages(response.data);
			setIsLoading(false);
		}
		messages();
	}, [currentChat]);

	const handleSendMsg = async (msg) => {
		socket.current.emit('send-msg', {
			to: currentChat._id,
			from: currentUser._id,
			msg
		});
		await axios.post(sendMessageRoute, {
			from: currentUser._id,
			to: currentChat._id,
			message: msg
		});

		const msgs = [...messages];
		msgs.push({fromSelf: true, message: msg});
		setMessages(msgs);
	};

	useEffect(() => {
		if (socket.current) {
			socket.current.on('msg-receive', (msg) => {
				setArrivalMessage({fromSelf: false, message: msg});
			});
		}
	}, [socket]);

	useEffect(() => {
		arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage]);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({behavior: 'smooth'});
	}, [messages]);

	return (
		<Container>
			<div className="chat-header">
				<div className="user-details">
					<div className="avatar" style={currentChat.avatarColor === "" ? {} : JSON.parse(currentChat.avatarColor)}>
					</div>
					<div className="username">
						<h3>{currentChat.username}</h3>
					</div>
				</div>
			</div>
			<div className="chat-messages">
				{isLoading ? (<div/>) :
					(
						messages.map((message) => {
							return (
								<div ref={scrollRef} key={uuidv4()}>
									<div
										className={`message ${
											message.fromSelf ? 'sended' : 'received'
										}`}
									>
										<div className="content ">
											<p>{message.message}</p>
										</div>
									</div>
								</div>
							);
						})
					)}
			</div>
			<ChatInput handleSendMsg={handleSendMsg}/>
		</Container>
	);
}
