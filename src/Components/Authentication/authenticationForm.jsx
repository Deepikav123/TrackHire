import { useState } from "react"

function AuthFormInput({ subheading, type, placeholder, onChange, value, autoComplete }) {
    return (
        <div className="authForm-subSection">
            <div className="authForm-inputHeading">
                {subheading}
            </div>
            <input type={type} placeholder={placeholder} className="authForm-input" onChange={onChange} value={value} autoComplete={autoComplete} />
        </div>
    )
}

function AuthForm({ mode, heading, subheading, buttonFunction }) {

    const [authenticationData, setAuthenticationData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })



    async function submitForm(e) {
        e.preventDefault();
        const loginFetch = await fetch("/")
    }

    return (
        <form className="auth-form" onSubmit={submitForm} >
            <div className="auth-form-headings">
                <h1 className="auth-form-heading">
                    {heading}
                </h1>
                <div className="auth-form-subHeading">
                    {subheading}
                </div>
            </div>
            <div className="authentication-form-section">
                <AuthFormInput subheading="Email Address" type="email" placeholder="you@example.com" onChange={e => {
                    setAuthenticationData(Prev => ({
                        ...Prev,
                        email: e.target.value
                    }))
                }} value={authenticationData.email} autoComplete="email" />
                <AuthFormInput subheading="Password" type="password" placeholder="Enter your password" onChange={e => {

                    setAuthenticationData(Prev => ({
                        ...Prev,
                        password: e.target.value
                    })
                    )
                }} value={authenticationData.password} autoComplete={mode == "Login" ? "current-password" : "new-password"} />
                {mode == "Login" && <div className="forgot-password"> Forgot Password? </div>}
                {mode == "Register" && <AuthFormInput subheading="Confirm Password" type="password" placeholder="Confirm your password" onChange={e => {
                    setAuthenticationData(
                        Prev => ({
                            ...Prev,
                            confirmPassword: e.target.value
                        })
                    )

                }} value={authenticationData.confirmPassword} autoComplete="new-password" />}
            </div>
            <div className="authentication-form-buttons">
                <button className="auth-button auth-mode" type="submit">{mode}</button>
                <div className="auth-button-option">OR</div>
                <button className="auth-button google">Continue with Google</button>
            </div>
            <div className="auth-suggestion-section">
                {mode == "Login" ? "Don't" : "Already"} have an account?<span className="auth-suggestion">{mode == "Login" ? " Register" : " Login"}</span>
            </div>
        </form>
    )
}

function Login() {

    return <AuthForm mode="Login" heading="Welcome Back" subheading="Sign in to your account to access" buttonFunction="" />
}
function Register() {
    return <AuthForm mode="Register" heading="Create your account" subheading="It only takes a minute" buttonFunction="" />
}



export { Login, Register };