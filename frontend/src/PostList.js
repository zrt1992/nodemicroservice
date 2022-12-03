import React, {useState, useEffect} from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
export default () => {
    const [posts,setPosts]= useState({});
    const fetchPosts = async ()=>{
            var result = await axios.get('http://localhost:6001/posts');
            setPosts(result.data);
    }

    useEffect(() => {
        fetchPosts();
    }, []);  //Runs only on the first render
   const renderPosts = Object.values(posts).map(post=>{
       return(
           <div className="card" style={{width:'30',marginBottom:'20px'}} key={post.id}>
               <div className="card-body">
                   <h3>{post.title} {post.id}</h3>
                   <CommentList postId={post.id}/>
                   <CommentCreate postId={post.id}/>


               </div>

           </div>
       )
   })
    return (
        <div className="d-flex flex-wrap flex-row justify-content-between">
            {renderPosts}
        </div>
    )
}