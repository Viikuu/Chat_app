import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom';
import Logo from '../assets/logo.png'
import {useEffect, useState} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {loginRoute} from '../utils/APIRoutes';

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .form-brand {
    display: flex;
    justify-content: center;
    gap: 1rem;
    align-items: center;

    img {
      height: 5rem;
    }

    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    align-items: center;
    background-color: #00000076;
    padding: 3rem 5rem;

    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.5rem;
      color: white;
      width: 100%;
      font-size: 1rem;

      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }

    button {
      background-color: #997af0;
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
  }

  span {
    color: white;
    text-transform: uppercase;

    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export function Login() {
	const navigate = useNavigate();
	const [values, setValues] = useState({
		username: '',
		password: '',
	});

	const toastOptions = {
		position: 'bottom-right',
		autoClose: 8000,
		pauseOnHover: true,
		draggable: true,
		theme: 'dark'
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if(handleValidation()){
			const {password, username} = values;
			const {data} = await axios.post(loginRoute, JSON.stringify({
				username,
				password,
			}), {
				headers: {
					"Content-Type": "application/json",
				}
			});
			if(data.status === false) {
				toast.error(data.message,toastOptions);
			}
			if(data.status === true) {
				localStorage.setItem('chat-app-user', JSON.stringify(data.user));
				navigate('/');
			}
		}

	};

	const handleValidation = () => {
		const {password, username} = values;
		if (password === "") {
			toast.error('password and username is required', toastOptions);
			return false;
		} else if (username.length === "") {
			toast.error('password and username is required', toastOptions);
			return false;
		}
		else {
			return true;
		}
	};

	const handleChange = (event) => {
		setValues({...values, [event.target.name]: event.target.value});
	};
	return (
		<>
			<FormContainer>
				<form onSubmit={handleSubmit}>
					<div className="form-brand">
						<img src={Logo} alt="logo"/>
						<h1>Hi</h1>
					</div>
					<input
						type="text"
						placeholder="Username"
						name="username"
						onChange={(event) => handleChange(event)}
						min="3"
					/>
					<input
						type="password"
						placeholder="Password"
						name="password"
						onChange={(event) => handleChange(event)}
					/>
					<button type="submit">Login</button>
					<span>
					Don't have an account? <Link to={'/register'}>Register</Link>
				</span>
				</form>
			</FormContainer>
			<ToastContainer/>
		</>
	)
}