import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../../context/authContext";
function AuthFormInput({ subheading, type, placeholder, onChange, value, autoComplete }) {
    return (
        <div className="authForm-subSection">
            <div className="authForm-inputHeading">
                {subheading} <span className="required-star">*</span>
            </div>
            <input type={type} placeholder={placeholder} className="authForm-input" onChange={onChange} value={value} autoComplete={autoComplete} />
        </div>
    )
}

function AuthForm({ mode, heading, subheading, buttonFunction }) {

    const navigate = useNavigate();
    // It extracts setToken property from provider value,which ahs object of token and setToken
    const { setToken } = useContext(AuthContext);
    const [errMessage, setErrMessage] = useState("");

    const [authenticationData, setAuthenticationData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [isLoading, setIsLoading] = useState(false);
    const [showWakeupMessage, setShowWakeupMessage] = useState(false);



    async function submitRegisterForm(e) {
        e.preventDefault();
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(authenticationData)

            }
        )

        const data = await response.json();
        if (!response.ok) {
            setErrMessage(data.message);
            return;
        }
        mode == "Register" ? navigate('/trackhire/authentication/login') : navigate('/trackhire/app/dashboard');


    }

    async function submitLoginForm(e) {
        e.preventDefault();
        setIsLoading(true);
        setShowWakeupMessage(false);
        const timer = setTimeout(() => {
            setShowWakeupMessage(true);
        }, 3000);

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(authenticationData)
            }
        )
        const data = await response.json();
        if (!response.ok) {
            setErrMessage(data.message);
            return;
        }
        localStorage.setItem("token", data.token);
        setToken(data.token);
        clearTimeout(timer);
        setIsLoading(false);
        setShowWakeupMessage(false);
        navigate('/trackhire/app/dashboard');
    }

    return (

        <form className="auth-form" onSubmit={mode == "Register" ? submitRegisterForm : submitLoginForm} >
            <div className="auth-form-headings">
                <h1 className="auth-form-heading">
                    {heading}
                </h1>
                <div className="auth-form-subHeading">
                    {subheading}
                </div>
            </div>
            <div className="authentication-form-section">
                {mode == "Register" && <AuthFormInput subheading="Username" type="text" placeholder="Enter your name" onChange={e => {
                    setAuthenticationData(Prev => ({
                        ...Prev,
                        username: e.target.value
                    }))
                    setErrMessage("");

                }} value={authenticationData.username} />}

                <AuthFormInput subheading="Email Address" type="email" placeholder="you@example.com" onChange={e => {
                    setAuthenticationData(Prev => ({
                        ...Prev,
                        email: e.target.value
                    }))
                    setErrMessage("");

                }} value={authenticationData.email} autoComplete="email" />
                <AuthFormInput subheading="Password" type="password" placeholder="Enter your password" onChange={e => {

                    setAuthenticationData(Prev => ({
                        ...Prev,
                        password: e.target.value
                    })

                    )
                    setErrMessage("")
                }} value={authenticationData.password} autoComplete={mode == "Login" ? "current-password" : "new-password"} />
                {/* {mode == "Login" && <div className="forgot-password"> Forgot Password? </div>} */}
                {mode == "Register" && <AuthFormInput subheading="Confirm Password" type="password" placeholder="Confirm your password" onChange={e => {
                    setAuthenticationData(
                        Prev => ({
                            ...Prev,
                            confirmPassword: e.target.value
                        })
                    )
                    setErrMessage("");

                }} value={authenticationData.confirmPassword} autoComplete="new-password" />}
            </div>
            <div className="authentication-form-buttons">
                <button className="auth-button auth-mode" type="submit" disabled={isLoading}>{mode}</button>
                {/* <div className="auth-button-option">OR</div>
                <button className="auth-button google">Continue with Google</button> */}
            </div>
            {errMessage && <div className="error-message"><span className="error-icon">!</span> {errMessage}</div>}
            <div className="auth-suggestion-section">
                {mode == "Login" ? "Don't" : "Already"} have an account?<button className="auth-suggestion" type="button" onClick={() => {

                    mode == "Register" ? navigate('/trackhire/authentication/login') : navigate('/trackhire/authentication/register');
                }

                }>{mode == "Login" ? " Register" : " Login"}</button>
            </div>

            {isLoading && (
                <div className="login-loading">
                    <div className="loading-spinner"></div>

                    <h3>Connecting to TrackHire...</h3>

                    <p>
                        {showWakeupMessage
                            ? "The server may be waking up after being inactive. This can take up to a minute. Please wait."
                            : "Please wait while we securely sign you in."}
                    </p>
                </div>
            )}
        </form>
    )
}

function Login() {

    return <AuthForm mode="Login" heading="Welcome Back" subheading="Sign in to your account to access" />
}
function Register() {
    return <AuthForm mode="Register" heading="Create your account" subheading="It only takes a minute" />
}



export { Login, Register };