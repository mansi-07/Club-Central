import {React,useState, useEffect, useRef} from 'react'
import Navbar from '../partials/Navbar'
import axios from 'axios'

const UserList = ({user}) => {
    const [userList, setUserList] = useState([])
    const users = (u) => {
        return {
            id: u._id,
            username: u.username,
            email: u.email,
            isAdmin: u.isAdmin
        };
    }
    
    console.log(userList)
    useEffect(() => {
        axios.post(`/api/superadmin/userlist`,  { instituteID: user.instituteName })
            .then(response => {
                const events = response.data.map(users) 
                setUserList(...userList, events)
            });
    }, []);
    const [changeRole, setUser] = useState()
    const handleChange = () => {
        axios.put(`/api/superadmin/change`, {userID: changeRole})
            .then(response => {
                console.log(response.data.msg)
                alert(response.data.msg)
            })
            .catch(err => {
                console.log(err.response.data.msg)
                alert(err.response.data.msg)
            });
    }
    return (
        <>
            <Navbar user={user}/>
            <div className="container">
            <table class="striped responsive-table">
                <thead>
                <tr>
                    <th>UserName</th>
                    <th>Email</th>
                    <th>isAdmin</th>
                </tr>
                </thead>
                <tbody>
                    {
                        userList && userList.map( u=> {
                        return (
                            <tr>
                                <td>{u.username}</td>
                                <td>{u.email}</td>
                                {u.isAdmin===true ? <td>YES</td> : <td>NO</td>}
                                <td onClick={(e)=> {setUser(u.id); handleChange();}} style={{color:"red"}}>Change</td>
                            </tr>
                        )})
                    }
                </tbody>
            </table>
            </div>
        </>
    )
}
export default UserList;