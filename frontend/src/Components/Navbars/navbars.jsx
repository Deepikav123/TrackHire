import '../../navbars.css'
import dashboardIcon from '../../images/icons/dash.png'
import applicationIcon from '../../images/icons/application.png'
import addIcon from '../../images/icons/add.png'
import reminderIcon from '../../images/icons/notification.png'
// import analyticsIcon from '../../images/icons/analytics.png'
import Logo from '../../images/trackHire.png'
import profileImage from '../../images/profile.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
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
    const navigate = useNavigate();
    const { setToken } = useContext(AuthContext);

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
            <div className="logout">
                <button className="logout-button" onClick={() => {
                    localStorage.removeItem("token");
                    setToken(null);
                    navigate('/trackhire/authentication/login');
                }}>Logout</button>

            </div>

        </div>
    )
}

function TopNavbar() {
    const { token, setToken } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {
            if (!token) {
                setUser(null);
                return;
            }
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/user`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            const data = await response.json();
             if (response.status === 401) {
                    localStorage.removeItem("token");
                    setToken(null);
                    navigate("/trackhire/authentication/login", {
                        replace: true
                    });
                    return;
                }

                if (!response.ok) {
                    throw new Error("Failed to fetch user");
                }
            setUser(data);
        }
        fetchUser();
    }, [token,setToken,navigate])


    return (
        <div className="topNavbar">
            <div className="right-topNavbar">
                <div className="profile-info">
                    <img src={profileImage} alt="" className="profile-img" />
                    <span className="profile-user-name">{user?.username || "User"}</span>

                </div>
            </div>
        </div>
    )
}
export { SideNavbar, TopNavbar };