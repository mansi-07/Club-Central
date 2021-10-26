// src/components/Post/index.js
import logo from "../../assets/images/logo.png"
import "../../css/post.css";
import React, { useState, useEffect, useReducer } from "react";

const Post = ({user}) => {
  const t=user['token']
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('/allpost', {
      headers: {
        "Content-Type":"application/json",
        "Authorization": "Bearer " + t
      }
    }).then(res => res.json())
      .then(result => {
        console.log(result)
        setData(result.posts)
      })
  })

  const makeComment = (commentMessage,postId)=>{
    fetch('/comment',{
      method:"put",
      headers:{
          "Content-Type":"application/json",
          //"Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
          postId,
          commentMessage
      })
  }).then(res=>res.json())
  .then(result=>{
      console.log(result)
      const newData = data.map(item=>{
        if(item._id==result._id){
            return result
        }else{
            return item
        }
     })
    setData(newData)
  }).catch(err=>{
      console.log(err)
  })
  }
  return (
    <div className="home">
      {
        data.map(item => {
          return (
            <div className="card home-card">
              <h5>{item.club.name}</h5>
              <div className="card-image">
                <img src={item.imageLink}></img>
              </div>
              <div className="card-content">
                <h6>{item.title}</h6>
                <p>{item.description}</p>
                <form onSubmit={(e)=>{
                  e.preventDefault()
                  console.log(e.target)
                }}>
                <input type="text" placeholder="add comment" />
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
