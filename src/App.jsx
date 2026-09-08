import { TrackHireLayout } from "./Components/layouts/layout"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Dashboard } from "./Components/pages/dashboard/dashboard"
import { Application } from "./Components/pages/application/application"
import PasteEmail from "./Components/pages/PasteEmail"
import {AddApplication} from "./Components/pages/addApplication/addApplication"
import './dashboard.css'
import './application.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
     <Route path="/trackhire" element={<TrackHireLayout />}>
     <Route path="dashboard" element={<Dashboard/>}/>
     <Route path="application" element={<Application/>}/>
     <Route path="addApplication" element={<AddApplication/>}/>
     <Route path="pasteEmail" element={<PasteEmail/>}/>
     </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
