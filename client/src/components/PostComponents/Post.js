// src/components/Post/index.js
import "../../css/post.css";
import { useHistory } from 'react-router-dom'
import React, { useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "./EditPostModal";

const PostClubView = ({ user }) => {
  const t = user['token']
  const [data, setData] = useState([])
  const history = useHistory()


  useEffect(() => {


    // axios.get('/api/post/clubpost',{headers: { "Authorization": `Bearer ${t}` }})
    // .then((res) => {
    //   //console.log(res.data)
    //   setData(res.data.posts)
    // })
    // .catch(err => {
    //   console.log(err)

    // })
    fetch('/api/post/clubpost', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + t
      }
    }).then(res => res.json())
      .then(result => {
        //console.log(result.posts)
        setData(result.posts)
      })

  })



  const makeComment = (commentMessage, postId) => {
    fetch('/api/post/comment', {
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
        //console.log(result)
        const newData = data.map(item => {
          if (item._id == result._id) {
            return result
          } else {
            return item
          }
        })
        setData(newData)
        //console.log(data)
      }).catch(err => {
        console.log(err)
      })

    // axios.put(`/api/post/comment`, { headers: { "Authorization": `Bearer ${t}`, "Content-Type": "application/json" } })
    //   .then((res) => {
    //     console.log(res)
    //     history.push("/clubadmin")
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }

  const deletePost = (postId) => {
    axios.delete(`/api/post/deletepost/${postId}`, { headers: { "Authorization": `Bearer ${t}` } })
      .then((res) => {
        console.log(res)
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
                <Modal thePost={item} idpost={item._id} />
              </h5>

              <div style={{ align: "left" }} className="card-image">
                <img src={item.imageLink}></img>
              </div>
              <div className="card-content">
                <h4>{item.title}</h4>
                
                <h6>{item.description}</h6>
                <div>Comments:</div>
                {
                  item.comments.map(record => {
                    return(
                    <div><span style={{fontWeight:"500"}}>{record.commentBy.username}</span>     {record.commentMessage}</div>
                    )
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




const PostUserView = ({ user }) => {
  const t = user['token']
  const [data, setData] = useState([])
  const history = useHistory()


  useEffect(() => {

    axios.get('/api/post/allpost', { headers: { "Authorization": `Bearer ${t}` } })
      .then((res) => {
        //console.log(res.data)
        setData(res.data.posts)
      })
      .catch(err => {
        console.log(err)
      })

  })

  const makeComment = (commentMessage, postId) => {
    fetch('/api/post/comment', {
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
        //console.log(result)
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

  return (
    <div className="home">
      {
        data.map(item => {
          return (
            <div className="card home-card">

              <h5>{item.club.name}


              </h5>
              <div style={{ align: "left" }} className="card-image">
                <img src={item.imageLink}></img>
              </div>
              <div className="card-content">
                <h6>{item.title}</h6>
                <p>{item.description}</p>
                <div>Comments:</div>
                {
                  item.comments.map(record => {
                    return(
                    <div><span style={{fontWeight:"400"}}>{record.commentBy.username}</span>{record.commentMessage}</div>
                    )
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



const Post = ({ user }) => {

  return user.isAdmin ? <PostClubView user={user} /> : <PostUserView user={user} />

}

export default Post;
