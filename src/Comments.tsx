import React, { useEffect, useCallback } from "react";
import useApi, { IComment } from "./utils/useApi";
import styled from "styled-components";

interface IProps {
  postId: string;
}

const Comment = styled.div`
  margin-top: 2rem;
`;

const CommentEmail = styled.p`
  font-size: 0.875rem;
`;

const Comments = ({ postId }: IProps) => {
  const { data: comments, loading, refetch } = useApi<IComment[]>(`/comments`, {
    postId
  })

  useEffect(() => {
      setInterval(() => {
          refetch()
      }, [5000])
  }, [refetch]) // Refetch is a memoized method and will not change after initialization

  return (
    <div>
      <h2>Comments: </h2>
      {loading && <div>Loading comments</div>}
      {comments?.map(comment => (
        <Comment>
          <p>{comment.body}</p>
          <CommentEmail>-{comment.email}</CommentEmail>
        </Comment>
      ))}
    </div>
  );
};

export default Comments;
