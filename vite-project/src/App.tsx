import {useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css'
import React from 'react'
import {AllEmails} from "./components/emails/AllEmails";
import {AppMenu} from "./components/AppMenu";
import {AddEmail} from "./components/emails/AddEmail";
import {DeleteEmail} from "./components/emails/DeleteEmail";
import {UpdateEmail} from "./components/emails/UpdateEmail";
import {StatisticsYearly} from "./components/statistics/StatisticsYearly";

function App() {
    return (
        <React.Fragment>
            <Router>
                <Routes>
                    <Route path="/" element={<AppMenu />} />
                    {/*<Route path="/emails" element={<AllEmails />} />*/}
                    {/*<Route path="/emails/add" element={<AddEmail />} />*/}
                    {/*<Route path="/emails/:emailid/details" element={<AllEmails />} />*/}
                    {/*<Route path="/emails/:emailid/edit" element={<UpdateEmail />} />*/}
                    {/*<Route path="/emails/:emailid/delete" element={<DeleteEmail />} />*/}
                    {/*<Route path="/statistics/yearly_pay" element={<StatisticsYearly />}/>*/}
                </Routes>
            </Router>
        </React.Fragment>
    )
}

export default App
