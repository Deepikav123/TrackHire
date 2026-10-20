import '../../navbars.css'
import dashboardIcon from '../../images/icons/dash.png'
import applicationIcon from '../../images/icons/application.png'
import addIcon from '../../images/icons/add.png'
import reminderIcon from '../../images/icons/notification.png'
// import analyticsIcon from '../../images/icons/analytics.png'
import Logo from '../../images/trackHire.png'
import profileImage from '../../images/profile.png'
import { Link, NavLink } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../context/authContext'
function SidebarItems({ to, name, icon }) {
    return (<NavLink to={to} className={({ isActive }) =>
        isActive ? "sidebar-navItem active" : "sidebar-navItem"
    } >
        <img src={icon} className="sidebar-icon" />
        {name}
    </NavLink>
    )
}

function SideNavbar() {
    return (
        <div className="sideNavbar">


            <div className="logo">
                <img src={Logo} className="trackHire-logo" />
                <div className="slogan">Track.Prepare.Succeed</div>
            </div>
            <div className="sidebar-navItems">
                <SidebarItems to='dashboard' name="Dashboard" icon={dashboardIcon} />
                <SidebarItems to='application' name="Applications" icon={applicationIcon} />
                <SidebarItems to='addApplication' name="Add Application" icon={addIcon} />
                {/* <SidebarItems to='dashboard'  name="Reminders" icon={reminderIcon} />
                <SidebarItems to='dashboard'  name="Analytics" icon={analyticsIcon} /> */}
            </div>
            <div className="paste-email-card">
                <h4 className="paste-email-title">
                    Paste Email to Add
                </h4>
                <span className="paste-email-subLine">
                    Paste any job update email content here
                </span>
                <NavLink to='pasteEmail' className={({ isActive }) =>
                    isActive ? "paste-email-button active" : "paste-email-button"} ><span className="email-plus-sign">+ </span>Paste Email </NavLink>
            </div>
        </div>
    )
}

function TopNavbar() {
    const { token } = useContext(AuthContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            const response = await fetch("http://localhost:3000/api/auth/user", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            const data = await response.json();
            setUser(data);
        }

    }, [token])


    return (
        <div className="topNavbar">
            <div className="right-topNavbar">
                <div className="profile-info">
                    <img src={profileImage} alt="" className="profile-img" />
                    <span className="profile-user-name">{user?.username||"User"}</span>

                </div>
            </div>
        </div>
    )
}
export { SideNavbar, TopNavbar };