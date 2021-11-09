import "../../css/post.css";
//import { useHistory } from 'react-router-dom'
import React, { useState, useEffect, useReducer } from "react";
//import { Link } from "react-router-dom";
import axios from "axios";
import EditSigModal from "./EditSigModal";


const ViewSig = ({ user }) => {
  const t = user['token']
  const [data, setData] = useState([])
  //const history = useHistory()


  useEffect(() => {

    
      axios.get('/viewsig',{headers: { "Authorization": `Bearer ${t}` }})
      .then((res) => {
        //console.log(res.data.sigs)
        setData(res.data.sigs)
      })
      .catch(err => {
        console.log(err)
    
      })

  })


  const deleteSig = (sigId) => {
    
    axios.delete(`/deletesig/${sigId}`, { headers: { "Authorization": `Bearer ${t}` } })
      .then((res) => {
        console.log(res)
        alert("Deleted successfully!")
        //history.push("/clubadmin")
      })
      .catch(err => {
        console.log(err)
        alert(err.response.data.msg)
      })

  }

  

  return (
    <div className="home">
      {
        data.map(item => {
          return (
            <div className="card home-card">

              <h5>{item.SigName}
                <i style={{ float: "right", cursor: "pointer" }} class="material-icons ed-icons" onClick={() => deleteSig(item._id)}>delete</i>
                <EditSigModal theSig={item}/>
              </h5>
            
              <div className="card-content">
                <p>{item.SigDesc}</p>
              </div>
              <a class="waves-effect waves-light btn" onclick="window.location.href='/roundModal.js'">Add Round</a>
              
          
            </div>

          )
        })
      }
    </div>
  
  )


}

export default ViewSig;