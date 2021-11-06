import {React,  useState, useEffect } from "react";
import '../../css/event.css'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../partials/Navbar";
import axios from "axios";

const localizer = momentLocalizer(moment);


function Event({user}) {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState([]);
    function mapFun(eve){
        return {
            id: eve._id,
            start: eve.startDate,
            end: eve.endDate,
            title: eve.name
        }
    }
    useEffect(() => {
        axios.post(`/api/club/getevents`,  { instituteID: user.instituteName })
            .then(response => {
                const events = response.data.map(mapFun) 
                setAllEvents(...allEvents, events)
            });
    }, []);

  return (
    <><div>
      <Navbar user={user} />
    </div><div className="App">
        <h1>Calendar</h1>
        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor='start'
          endAccessor='end'
          style={{ height: '100vh', margin: '20px' }} />
      </div></>
  );
}

export default Event;