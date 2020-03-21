import React, { useState, useEffect } from "react";
import useApi, { IPost } from "./utils/useApi";
import Layout from "./Layout";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { debounce } from "debounce";

const PostsContainer = styled.div`
  display: grid;
  grid-gap: 2rem;
`;

const Post = styled(Link)`
  display: flex;
  flex-direction: column;
  background: white;
  color: black;
  text-decoration: none;
  margin-top: 1rem;

  &:hover {
    cursor: pointer;

    .title {
      border-bottom: 2px solid black;
    }
  }

  .title {
    font-size: 1.25rem;
    font-weight: bold;
    align-self: flex-start;
    margin: 0;
    margin-bottom: 0.5rem;
    border-bottom: 2px solid transparent;
    transition: 200ms;
  }

  .excerpt {
    margin: 0.25rem 0;
  }
`;

const Posts = () => {
  const [currentCount, setCurrentCount] = useState(10);
  const { data: posts, error, loading, changeParams } = useApi<IPost[]>(
    "/posts",
    { _limit: currentCount }
  );

  useEffect(() => {
    changeParams({ _limit: currentCount });
  }, [currentCount, changeParams])

  const generateExcerpt = (postBody: string) => {
    if (postBody.length > 100) {
      return `${postBody.substr(0, 100)}....`;
    }
    return `${postBody.substr(0, 95)}...`;
  };

  window.onscroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setCurrentCount(currentCount + 10);
    }
  }, 100);

  if (error) {
    return <div>Error</div>;
  }

  if (loading && !posts) {
    return <div>Loading</div>;
  }

  return (
    <Layout>
      <h1>Latest posts: </h1>
      <PostsContainer>
        {posts?.map(post => (
          <Post to={`/posts/${post.id}`} key={post.id}>
            <h4 className="title">{post.title}</h4>
            <p className="excerpt">{generateExcerpt(post.body)}</p>
          </Post>
        ))}
      </PostsContainer>
    </Layout>
  );
};

export default Posts;
