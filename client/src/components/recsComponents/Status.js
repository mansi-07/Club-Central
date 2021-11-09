import {React,useState, useEffect, useRef} from 'react'
import Navbar from '../partials/Navbar'
import axios from 'axios'

const Status = ({user}) => {
    const [userList, setUserList] = useState([])
    const users = (u) => {
        return {
            ClubName: u.clubName,
            status: u.status.status,
            sigName : u.sigName
        };
    }
    
    console.log(userList)

    useEffect(() => {
        console.log(user.user_id)
        axios.post(`/api/recs/getstatus`,  { id: user.user_id })
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
                    <th>Sig</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                    {
                        userList && userList.map( u=> {
                        return (
                            <tr>
                                <td>{u.ClubName}</td>
                                <td>{u.sigName}</td>
                                {u.status===0 ? <td style={{color: "red"}}>Rejected!</td>
                                    : u.status===1 ? <td style={{color: "blue"}}>Ongoing!</td>
                                    : <td style={{color: "green"}}>Selected!</td>
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