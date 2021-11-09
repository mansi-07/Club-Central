import {React,useState, useEffect, useRef} from 'react'
import Navbar from '../partials/Navbar'
import axios from 'axios'

const Status = ({user}) => {
    const [userList, setUserList] = useState([])
    const users = (u) => {
        return {
            ClubName: u.clubName,
            status: u.status.status,
            
        };
    }
    
    console.log(userList)
    useEffect(() => {
        axios.post(`/api/recs/status`,  { id: user.user_id })
            .then(response => {
                const events = response.data.map(users) 
                setUserList(...userList, events)
            });
    }, []);
    return (
        <>
            <Navbar user={user}/>
            <div className="container">
            <table class="striped responsive-table">
                <thead>
                <tr>
                    <th>Club</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                    {
                        userList && userList.map( u=> {
                        return (
                            <tr>
                                <td>{u.name}</td>
                                {u.status.status===0 ? <td>Rejected!</td>
                                    : u.status.status===1 ? <td>Ongoing!</td>
                                    : <td>Selected!</td>
                                }
                            </tr>
                        )})
                    }
                </tbody>
            </table>
            </div>
        </>
    )
}
export default Status;