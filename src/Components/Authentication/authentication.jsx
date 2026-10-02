import Logo from '../../images/trackHire.png'
import Formal from '../../images/authentication.png'
import { Outlet } from "react-router-dom"

function LeftSection() {
    return (
        <div className="authentication-left-section">
            <div className="authentication-logo">
                <img src={Logo} className="trackHire-logo" />
                <div className="slogan">Track.Prepare.Succeed</div>
            </div>
            <div className="trackHire-text-info">
                <h1 className="trackHire-text-info1">
                    Your next opportunity is here
                </h1>
                <div className="trackHire-text-info2">
                    Track your job applications,get organized and move closer to your dream career 
                </div>
            </div>
            <div className="authentication-image">
                <img src={Formal} alt="" className="authentication-formalImage" />
            </div>
        </div>
    )
}

function Authentication(){
    return(
        <div className="authetication-page">
            <LeftSection/>
            <div className="authentication-right-section">
            <Outlet/>
            </div>
        </div>
    )
}

export default Authentication;

