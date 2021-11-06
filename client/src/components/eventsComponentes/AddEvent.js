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
// const events = [
//   {
//     id: 0,
//     title: 'All Day Event very long title',
//     start: new Date(2021, 10, 11,0,0,0),
//     end: new Date(2021, 10, 11,0,0,0),
//   },
//   {
//     id: 14,
//     title: 'Today',
//     start: new Date(new Date().setHours(new Date().getHours() - 3)),
//     end: new Date(new Date().setHours(new Date().getHours() + 3)),
//   },
// ];

function AddEvent({user}) {
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
    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent]);
        console.log(user.user_id)
        console.log(user.instituteName)
        axios.post("/api/club/addevent",{name: newEvent.title, startDate: Date.parse(newEvent.start), endDate: Date.parse(newEvent.end), clubID: user.user_id, instituteID: user.instituteName} )
        .then((res) => {
            if (res.status === 201) {
                alert("Successful!")
          }
        })
        .catch(err => {
            console.log(err.response.data.msg)
            alert(err.response.data.msg)
        })
    }

  return (
    <><div>
      <Navbar user={user} />
    </div><div className="App">
        <h1>Calendar</h1>
        <h2>Add New Event</h2>
        <div>
          <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
          <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
          <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
          <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
            Add Event
          </button>
        </div>
        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor='start'
          endAccessor='end'
          style={{ height: '100vh', margin: '20px' }} />
      </div></>
  );
}

export default AddEvent;