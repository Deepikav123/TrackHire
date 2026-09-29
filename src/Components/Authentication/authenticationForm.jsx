function AuthFormInput({ subheading, type, placeholder }) {
    return (
        <div className="authForm-subSection">
            <div className="authForm-inputHeading">
                {subheading}
            </div>
            <input type={type} placeholder={placeholder} className="authForm-input" />
        </div>
    )
}

function AuthForm({ mode, heading, subheading, buttonFunction }) {
    return (
        <div className="auth-form">
            <div className="auth-form-headings">
                <h1 className="auth-form-heading">
                    {heading}
                </h1>
                <div className="auth-form-subHeading">
                    {subheading}
                </div>
            </div>
            <div className="authentication-form-section">
                <AuthFormInput subheading="Email Address" type="email" placeholder="you@example.com" />
                <AuthFormInput subheading="Password" type="password" placeholder="Enter your password" />
                {mode == "Login" && <div className="forgot-password"> Forgot Password? </div>}
                {mode == "Register" && <AuthFormInput subheading="Confirm Password" type="password" placeholder="Confirm your password" />}
            </div>
            <div className="authentication-form-buttons">
                <button className="auth-button auth-mode" >{mode}</button>
                <div className="auth-button-option">OR</div>
                <button className="auth-button google">Continue with Google</button>
            </div>
            <div className="auth-suggestion-section">
               {mode=="Login"?"Don't":"Already"} have an account?<span className="auth-suggestion">{mode == "Login" ? " Register" : " Login"}</span>
            </div>

        </div>
    )
}
export default AuthForm;