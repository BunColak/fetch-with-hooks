import React, { useEffect } from "react";
import useApi, { IComment } from "./utils/useApi";
import styled from "styled-components";

interface IProps {
  postId: string;
}

const Comment = styled.div`
  margin-top: 2rem;
`;

const CommentEmail = styled.p`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #5A5A5A;
`;

const CommentBody = styled.p`
  margin: 0;
`;

const Comments = ({ postId }: IProps) => {
  const { data: comments, loading, refetch } = useApi<IComment[]>(`/comments`, {
    postId
  });

  useEffect(() => {
    setInterval(() => {
      refetch();
    }, [5000]);
  }, [refetch]); // Refetch is a memoized method and will not change after initialization

  return (
    <div>
      <h2>Comments: </h2>
      {loading && !comments && <div>Loading comments</div>}
      {comments?.map(comment => (
        <Comment>
          <CommentBody>{comment.body}</CommentBody>
          <CommentEmail>-{comment.email}</CommentEmail>
        </Comment>
      ))}
    </div>
  );
};

export default Comments;
