import { SideNavbar, TopNavbar } from "../Navbars/navbars"
import { Outlet } from "react-router-dom"
function TrackHireLayout() {
    return (
        <div className="layouts">
                <SideNavbar />
         
            <div className="right-body">
                <TopNavbar />
                <Outlet />
            </div>
        </div>
    )
}
export { TrackHireLayout }