// src/components/Post/index.js
import "../../css/post.css";
import { useHistory } from 'react-router-dom'
import React, { useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "./EditPostModal";

const Post = ({ user }) => {
  const t = user['token']
  const [data, setData] = useState([])
  const history = useHistory()


  useEffect(() => {
    if (user.isAdmin) {
      fetch('/clubpost', {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + t
        }
      }).then(res => res.json())
        .then(result => {
          //console.log(result)
          setData(result.posts)
        })
    }
    else {
      fetch('/allpost', {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + t
        }
      }).then(res => res.json())
        .then(result => {
          //console.log(result)
          setData(result.posts)
        })
    }
  })

  const makeComment = (commentMessage, postId) => {
    fetch('/comment', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + t
      },
      body: JSON.stringify({
        postId,
        commentMessage
      })
    }).then(res => res.json())
      .then(result => {
        console.log(result)
        const newData = data.map(item => {
          if (item._id == result._id) {
            return result
          } else {
            return item
          }
        })
        setData(newData)
      }).catch(err => {
        console.log(err)
      })
  }

  const deletePost = (postId) => {
    axios.delete(`/deletepost/${postId}`, { headers: { "Authorization": `Bearer ${t}` } })
      .then((res) => {
        alert("Deleted successfully!")
        history.push("/clubadmin")
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

              <h5>{item.club.name}

                <i style={{ float: "right", cursor: "pointer" }} class="material-icons ed-icons" onClick={() => deletePost(item._id)}>delete</i>
                <i style={{ float: "right", cursor: "pointer" }} class="material-icons ed-icons">edit</i>
                
              </h5>
              <Modal />
              <div style={{ align: "left" }} className="card-image">
                <img src={item.imageLink}></img>
              </div>
              <div className="card-content">
                <h6>{item.title}</h6>
                <p>{item.description}</p>
                {
                  item.comments.map(record => {
                    <h6><span style={{ fontWeight: "400" }}>{record.commentBy.name}</span>{record.commentMessage}</h6>
                  })
                }
                <form onSubmit={(e) => {
                  e.preventDefault()
                  makeComment(e.target[0].value, item._id)
                }}>
                  <input type="text" placeholder="Add comment" />
                </form>
              </div>
            </div>

          )
        })
      }
    </div>

  )


}

export default Post;
