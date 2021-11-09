import "../../css/post.css";
//import { useHistory } from 'react-router-dom'
import React, { useState, useEffect, useReducer } from "react";
//import { Link } from "react-router-dom";
import axios from "axios";
//import Modal from "./EditSigModal";
//import AddModeratorIcon from '@mui/icons-material/AddModerator';
//import RoundModal from "./roundModal";

const Pref_order = ({ user }) => {
    const t = user['token']
    const [data, setData] = useState([])
    //const history = useHistory()


    useEffect(() => {
        axios.post('/api/order/preferenceorder',{id:user.user_id},{ headers: { "Authorization": `Bearer ${t}` } })
            .then((res) => {
                console.log(res.data)
                setData(res.data.clubs)
            })
            .catch(err => {
                console.log(err)

            })

    })


    const givePref = (clubId) => {

        axios.put(`/api/order/prference/${clubId}`, { headers: { "Authorization": `Bearer ${t}` } })
            .then((res) => {
                console.log(res)
                //alert("Deleted successfully!")
                //history.push("/clubadmin")
            })
            .catch(err => {
                console.log(err)
                alert(err.response.data.msg)
            })

    }



    return (
        <table className="tat">
            <tr><th>Club</th><th>Preference</th></tr>
            {
                data.map((dynamicData) =>
                    <tr className="trow"> 
                    <td>  
                        {dynamicData.clubName}
                    </td> 
                    <td>
                    <input type="text" onInput={() => givePref(dynamicData._id)}>Preference number</input>
                    </td>
                    </tr>
                )}
        </table>

    )


}

export default Pref_order;