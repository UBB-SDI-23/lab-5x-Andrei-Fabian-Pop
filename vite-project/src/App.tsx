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
import {AllSubscriptions} from "./components/subscription/AllSubscriptions";
import {AddSubscription} from "./components/subscription/AddSubscription";
import {UpdateSubscription} from "./components/subscription/UpdateSubscription";
import {DeleteSubscription} from "./components/subscription/DeleteSubscription";
import {AllEvents} from "./components/event/AllEvents";
import {AddEvent} from "./components/event/AddEvent";
import {UpdateEvent} from "./components/event/UpdateEvent";
import {DeleteEvent} from "./components/event/DeleteEvent";
import {AllEmailToEvent} from "./components/emailtoevent/AllEmailToEvent";
import {AddEmailToEvent} from "./components/emailtoevent/AddEmailToEvent";
import {UpdateEmailToEvent} from "./components/emailtoevent/UpdateEmailToEvent";
import {DeleteEmailToEvent} from "./components/emailtoevent/DeleteEmailToEvent";

function App() {
    return (
        <React.Fragment>
            <Router>
                <Routes>
                    <Route path="/" element={<AppMenu />} />
                    <Route path="/emails" element={<AllEmails />} />
                    <Route path="/emails/add" element={<AddEmail />} />
                    <Route path="/emails/:emailid/details" element={<AllEmails />} />
                    <Route path="/emails/:emailid/edit" element={<UpdateEmail />} />
                    <Route path="/emails/:emailid/delete" element={<DeleteEmail />} />

                    <Route path="/subscriptions" element={<AllSubscriptions />} />
                    <Route path="/subscriptions/add" element={<AddSubscription />} />
                    <Route path="/subscriptions/:subscriptionid/edit" element={<UpdateSubscription />} />
                    <Route path="/subscriptions/:subscriptionid/delete" element={<DeleteSubscription />} />

                    <Route path="/events" element={<AllEvents />} />
                    <Route path="/events/add" element={<AddEvent />} />
                    <Route path="/events/:eventid/edit" element={<UpdateEvent />} />
                    <Route path="/events/:eventid/delete" element={<DeleteEvent />} />

                    <Route path="/emailtoevent" element={<AllEmailToEvent />} />
                    <Route path="/emailtoevent/add" element={<AddEmailToEvent />} />
                    <Route path="/emailtoevent/:emailtoeventid/edit" element={<UpdateEmailToEvent />} />
                    <Route path="/emailtoevent/:emailtoeventid/delete" element={<DeleteEmailToEvent />} />

                    <Route path="/statistics/yearly_pay" element={<StatisticsYearly />}/>
                </Routes>
            </Router>
        </React.Fragment>
    )
}

export default App
