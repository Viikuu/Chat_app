import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom';
import Logo from '../assets/logo.png'
import {useState, useEffect} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {registerRoute} from '../utils/APIRoutes';

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

export function Register() {
	const navigate = useNavigate();
	const [values, setValues] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
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
			console.log('Validation', registerRoute);
			const {password, username, email} = values;
			const {data} = await axios.post(registerRoute, JSON.stringify({
				username,
				email,
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
		const {password, confirmPassword, username, email} = values;
		if (password !== confirmPassword) {
			toast.error('password and confirm password must be the same', toastOptions);
			return false;
		} else if (password.length < 8) {
			toast.error('password must be at least 8 characters',  toastOptions);
			return false;
		} else if (username.length < 3) {
			toast.error('username must be at least 3 characters', toastOptions);
			return false;
		}
		else if (email === "") {
			toast.error('email is required', toastOptions);
			return false;
		} else {
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
					/>
					<input
						type="email"
						placeholder="Email"
						name="email"
						onChange={(event) => handleChange(event)}
					/>
					<input
						type="password"
						placeholder="Password"
						name="password"
						onChange={(event) => handleChange(event)}
					/>
					<input
						type="password"
						placeholder="Confirm Password"
						name="confirmPassword"
						onChange={(event) => handleChange(event)}
					/>
					<button type="submit">Create User</button>
					<span>
					already have an account? <Link to={'/login'}>Login</Link>
				</span>
				</form>
			</FormContainer>
			<ToastContainer/>
		</>
	)
}