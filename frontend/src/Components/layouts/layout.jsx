import { SideNavbar, TopNavbar } from "../Navbars/navbars"
import { Outlet } from "react-router-dom"
import { useState } from "react";
function TrackHireLayout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="layouts">
         
                <SideNavbar   isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <div className="right-body">
                <TopNavbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
                <Outlet />
            </div>
        </div>
    )
}
export { TrackHireLayout }