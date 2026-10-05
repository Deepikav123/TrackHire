import { createContext } from "react";
import { Dashboard } from "../src/Components/pages/dashboard/dashboard";
import { Application } from "../src/Components/pages/application/application";
const AuthContext=createContext(null);
<AuthContext.Provider value="abc">
    <Dashboard/>
    <Application/>
</AuthContext.Provider>
export default AuthContext;