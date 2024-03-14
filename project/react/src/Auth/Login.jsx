import FormInput from "./FormInput";

function Login() {
    return (
        <main>
            <h2>Log in</h2>
            <form action="localhost:8000/login" method="post">
                <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address..."
                />
                <FormInput
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                />
                <button type="submit">Submit</button>
                <div className="form-footer">
                    <a href="/forgot-password">Forgot your password?</a>
                    <p>
                        Don`t have an account? <a href="/signup">Sign up</a>
                    </p>
                </div>
            </form>
        </main>
    );
}

export default Login;
