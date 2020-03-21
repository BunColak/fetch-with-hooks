import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import useApi, { IPost } from "./utils/useApi";
import Layout from "./Layout";
import AuthorField from "./AuthorField";
import Comments from "./Comments";

const PostDetails = () => {
  const match = useRouteMatch<{ id: string }>();
  const { id } = match.params;
  const { data: post, loading: loadingPost } = useApi<IPost>(`/posts/${id}`);


  return (
    <Layout>
      <Link to="/">Home</Link>
      <div>
        {loadingPost && <div>Loading Post</div>}
        <h1>{post?.title}</h1>
        {post && <AuthorField id={post.userId} />}
        <p>{post?.body}</p>
        <Comments postId={id} />
      </div>
      
    </Layout>
  );
};

export default PostDetails;
