import { TrackHireLayout } from "./Components/layouts/layout"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Dashboard } from "./Components/pages/dashboard/dashboard"
import { Application } from "./Components/pages/application/application"
import PasteEmail from "./Components/pages/PasteEmail"
import {AddApplication} from "./Components/pages/addApplication/addApplication"
import Authentication from "./Components/Authentication/authentication"
import {Login,Register} from "./Components/Authentication/authenticationForm"
import './dashboard.css'
import './application.css'
import './authentication.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
     <Route path="/trackhire" >
     <Route path="authentication" element={<Authentication />}>
     <Route path="login" element={<Login/>}/>
     <Route path="register" element={<Register/>}/>
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
