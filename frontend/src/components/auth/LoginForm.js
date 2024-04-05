import React, { useState, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const LoginForm = () => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const [touched, setTouched] = useState({ username: false, password: false })
	const navigate = useNavigate()
	const { login } = useContext(AuthContext)

	const handleLogin = async () => {
		setTouched({ username: true, password: true })
		if (!username || !password) {
			setError("Please fill in all fields")
			return
		}

		try {
			await login(username, password)
			navigate("/")
		} catch (error) {
			setError("Failed to log in: Incorrect username or password")
		}
	}

	const getFormControlClassName = fieldName => {
		const fieldVal = fieldName === "username" ? username : password
		return touched[fieldName] && !fieldVal ? "is-invalid" : ""
	}

	return (
		<Container>
			<Row className='justify-content-md-center'>
				<Col xs={12} md={6}>
					<div>
						<Link to='/'>
							<img
								src='images/logoEcommerce.png'
								alt='Logo'
								className='login-logo img-fluid'
							/>
						</Link>
						<Form>
							<Form.Group className='mb-3' controlId='formUsername'>
								<Form.Label>Username</Form.Label>
								<Form.Control
									type='text'
									value={username}
									onChange={e => setUsername(e.target.value)}
									className={getFormControlClassName("username")}
								/>
								<Form.Control.Feedback type='invalid'>
									Please enter a username.
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group className='mb-3' controlId='formPassword'>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type='password'
									value={password}
									onChange={e => setPassword(e.target.value)}
									className={getFormControlClassName("password")}
								/>
								<Form.Control.Feedback type='invalid'>
									Please enter a password.
								</Form.Control.Feedback>
							</Form.Group>

							<Button variant='primary' type='button' onClick={handleLogin}>
								Log In
							</Button>

							<Link to='/reset-password-request' className='btn btn-link ms-2'>
								Forgot password?
							</Link>

							<Link to='/register' className='btn btn-link ms-2'>
								Register new account
							</Link>

							{error && <div className='text-danger'>{error}</div>}
						</Form>
					</div>
				</Col>
			</Row>
		</Container>
	)
}

export default LoginForm
