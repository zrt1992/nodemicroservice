import React from "react";
import axios from "axios";

const commentsList = ({comments}) => {
    const renderedComments = comments.map(comment => {
        return <li key={comment.id}>{comment.content}</li>
    })
    return (
        <ul>
            {renderedComments}
        </ul>
    );
}
export default commentsList;