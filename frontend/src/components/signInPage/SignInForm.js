import {Form, Button, Link} from '../../Imports'

function SignInForm({submitHandler, setEmail, setPassword, redirect}) {
    return (
        <Form onSubmit={submitHandler()}>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <div className="mb-3">
                <Button type="submit">Sign In</Button>
            </div>
            <div className="mb-3">
                New customer?
                {' '}
                <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
            </div>
            <div className="mb-3">
                Forget Password? <Link to={`/forget-password`}>Reset Password</Link>
            </div>
        </Form>
    )
}
export default SignInForm;