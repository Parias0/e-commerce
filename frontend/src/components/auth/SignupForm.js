import React, { useState, useContext } from "react"
import {
	Form,
	Button,
	Container,
	Row,
	Col,
	Tooltip,
	OverlayTrigger,
} from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

const SignupForm = () => {
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [errors, setErrors] = useState({})
	const navigate = useNavigate()
	const { register } = useContext(AuthContext)

	const validate = () => {
		let tempErrors = {}
		if (!username) tempErrors.username = "Username is required"
		if (!email.includes("@")) tempErrors.email = "Email is invalid"
		if (
			!password.match(
				/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/
			)
		)
			tempErrors.password = "Password does not meet criteria"
		if (password !== confirmPassword)
			tempErrors.confirmPassword = "Passwords do not match"
		setErrors(tempErrors)
		return Object.keys(tempErrors).length === 0
	}

	const handleSignUp = async () => {
		if (!validate()) return
		try {
			await register(username, email, password)
			navigate("/login")
		} catch (error) {
			setErrors({ form: "Failed to sign up" })
		}
	}

	const renderTooltip = props => (
		<Tooltip id='button-tooltip' {...props}>
			Your password must contain at least one digit, one lowercase letter, one
			uppercase letter, and one special character.
		</Tooltip>
	)

	return (
		<Container>
			<Row className='justify-content-md-center mt-5'>
				<Col xs={12} md={6}>
					<Form>
						{/* Username */}
						<Form.Group className='mb-3' controlId='formUsername'>
							<Form.Label>Username:</Form.Label>
							<Form.Control
								type='text'
								isInvalid={!!errors.username}
								value={username}
								onChange={e => setUsername(e.target.value)}
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.username}
							</Form.Control.Feedback>
						</Form.Group>

						{/* Email */}
						<Form.Group className='mb-3' controlId='formEmail'>
							<Form.Label>Email:</Form.Label>
							<Form.Control
								type='email'
								isInvalid={!!errors.email}
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.email}
							</Form.Control.Feedback>
						</Form.Group>

						{/* Password */}
						<Form.Group className='mb-3' controlId='formPassword'>
							<Form.Label>Password:</Form.Label>
							<OverlayTrigger
								placement='right'
								delay={{ show: 250, hide: 400 }}
								overlay={renderTooltip}>
								<Form.Control
									type='password'
									isInvalid={!!errors.password}
									value={password}
									onChange={e => setPassword(e.target.value)}
								/>
							</OverlayTrigger>
							<Form.Control.Feedback type='invalid'>
								{errors.password}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group className='mb-3' controlId='formConfirmPassword'>
							<Form.Label>Confirm Password:</Form.Label>
							<Form.Control
								type='password'
								isInvalid={!!errors.confirmPassword}
								value={confirmPassword}
								onChange={e => setConfirmPassword(e.target.value)}
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.confirmPassword}
							</Form.Control.Feedback>
						</Form.Group>

						{/* Buttons */}
						<div className='d-grid gap-3 mt-3'>
							<Button variant='primary' type='button' onClick={handleSignUp}>
								Sign Up
							</Button>
							<Button variant='secondary' onClick={() => navigate("/login")}>
								Back to Login
							</Button>
						</div>

						{errors.form && <div className='text-danger'>{errors.form}</div>}
					</Form>
				</Col>
			</Row>
		</Container>
	)
}

export default SignupForm
