import AuthContext from "./authContext";
import { useState } from "react";

function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    )

}
export default AuthProvider;