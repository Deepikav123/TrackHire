import '../../navbars.css'
import dashboardIcon from '../../images/icons/dash.png'
import applicationIcon from '../../images/icons/application.png'
import addIcon from '../../images/icons/add.png'
import reminderIcon from '../../images/icons/notification.png'
import analyticsIcon from '../../images/icons/analytics.png'
import Logo from '../../images/trackHire.png'
import profileImage from '../../images/profile.jpg'
import { Link,NavLink } from 'react-router-dom'
function SidebarItems({to, name, icon }) {
    return (<NavLink to={to} className="sidebar-navItem">
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
                <SidebarItems to='dashboard'  name="Dashboard" icon={dashboardIcon} />
                <SidebarItems to='application'  name="Applications" icon={applicationIcon} />
                <SidebarItems to='addApplication'  name="Add Application" icon={addIcon} />
                <SidebarItems to='dashboard'  name="Reminders" icon={reminderIcon} />
                <SidebarItems to='dashboard'  name="Analytics" icon={analyticsIcon} />
            </div>
            <div className="paste-email-card">
                <h4 className="paste-email-title">
                    Paste Email to Add
                </h4>
                <span className="paste-email-subLine">
                    Paste any job update email content here
                </span>
                <Link to='pasteEmail' className='paste-email-button'><span className="email-plus-sign">+ </span>Paste Email </Link>
            </div>
        </div>
    )
}

function TopNavbar() {
    return (
        <div className="topNavbar">
            <div className="right-topNavbar">
                <img src={reminderIcon} alt="" className="notification-icon" />
                <div className="profile-info">
                    <img src={profileImage} alt="" className="profile-img" />
                    <span className="profile-user-name">Sarah</span>

                </div>
            </div>
        </div>
    )
}
export { SideNavbar, TopNavbar };