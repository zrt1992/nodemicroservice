import React, {useState, useEffect} from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const postsList = () => {
    const [posts, setPosts] = useState({});
    const fetchPosts = async () => {
        var result = await axios.get('posts.com/posts');
        // console.log(result.data);
        setPosts(result.data);
    }

    useEffect(() => {
        fetchPosts();
    }, []);  //Runs only on the first render
    const renderPosts = Object.values(posts).map(post => {
        return (
            <div className="card" style={{width: '30', marginBottom: '20px'}} key={post.id}>
                <div className="card-body">
                    <h3>{post.title} {post.id}</h3>
                    <CommentList comments={post.comments}/>
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
export default postsList;