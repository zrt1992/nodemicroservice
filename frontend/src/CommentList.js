import React, {useState, useEffect} from "react";
import axios from "axios";

export default ({postId}) => {
    const [comments, setComments] = useState([]);
    const fetchData = async () => {
        const res = await axios(`http://localhost:6002/posts/${postId}/comments`);
        setComments(res.data);
    }
    useEffect(() => {
        fetchData();
    }, []);
    const renderedComments = comments.map(comment => {
        return <li key={comment.id}>{comment.content}</li>
    })
    return (
        <ul>
            {renderedComments}
        </ul>
    );
}