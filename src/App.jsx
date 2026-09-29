import { TrackHireLayout } from "./Components/layouts/layout"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Dashboard } from "./Components/pages/dashboard/dashboard"
import { Application } from "./Components/pages/application/application"
import PasteEmail from "./Components/pages/PasteEmail"
import {AddApplication} from "./Components/pages/addApplication/addApplication"
import Authentication from "./Components/Authentication/authentication"
import AuthForm from "./Components/Authentication/authenticationForm"
import './dashboard.css'
import './application.css'
import './authentication.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
     <Route path="/trackhire" >
     <Route path="authentication" element={<Authentication />}>
     <Route path="login" element={<AuthForm mode="Login" heading="Welcome Back" subheading="Sign in to your account to access" buttonFunction=""/>}/>
     <Route path="register" element={<AuthForm mode="Register" heading="Create your account" subheading="It only takes a minute" buttonFunction=""/>}/>
     </Route>

     <Route path="app" element={<TrackHireLayout/>}>
     <Route path="dashboard" element={<Dashboard/>}/>
     <Route path="application" element={<Application/>}/>
     <Route path="addApplication" element={<AddApplication/>}/>
     <Route path="pasteEmail" element={<PasteEmail/>}/>
     </Route>
     </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
