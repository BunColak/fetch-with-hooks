import React from "react";
import useApi, { IUser } from "./utils/useApi";

interface IProps {
  id: number;
}

const AuthorField = ({ id }: IProps) => {
  const { data: author } = useApi<IUser>(`/users/${id}`);

  return <span>- by {author?.name}</span>;
};

export default AuthorField;
