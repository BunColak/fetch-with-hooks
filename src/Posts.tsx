import React from "react";
import useApi, { IPost } from "./utils/useApi";
import Layout from "./Layout";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
`;

const Post = styled.div`
background: white;
border-radius: 0.25rem;
box-shadow: 0 0 1px 2px rgba(0,0,0,0.05);
padding: 1rem;
transition: 400ms;

&:hover {
  cursor: pointer;
  box-shadow: 0 0 3px 6px rgba(0,0,0,0.1);
}
`

const Posts = () => {
  const history = useHistory()
  const { data: posts, error, loading, refetch } = useApi<IPost[]>("/posts");

  const onPostClick = (id: number) => {
    history.push(`/posts/${id}`)
  }

  if(error) {
    return <div>ERror</div>
  }

  if (loading) {
    return <div>Loading</div>
  }

  return (
    <Layout>
      <PostsContainer>
        {posts?.map(post => (
            <Post key={post.id} onClick={() => onPostClick(post.id)}>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
            </Post>
          ))}
      </PostsContainer>
    </Layout>
  );
};

export default Posts;
