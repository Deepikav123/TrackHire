import { Navigate,Outlet } from "react-router-dom";
function ProtectedRoute({ tokenData }) {
    if (!tokenData) {
       return <Navigate to='/trackhire/authentication/login' replace/>
    }
    return <Outlet/>
}
export default ProtectedRoute;