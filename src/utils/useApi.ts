import { useState, useEffect, useCallback } from "react";
import qs from "query-string";

const API_URL = "https://jsonplaceholder.typicode.com";

interface FilterParams {
  userId?: string;
  postId?: string;
  _page?: number;
  _limit?: number;
}

export interface IPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface IComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
}

type ResponseTypes = IPost | IPost[] | IComment | IComment[] | IUser | IUser[];

const useApi = <T extends ResponseTypes>(
  path: string,
  params?: FilterParams
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filterParams, setFilterParams] = useState(params);
  const [refetchToggle, setRefetchToggle] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoading(true);
        const responseData = await fetch(
          `${API_URL}${path}?${qs.stringify(filterParams || {})}`
        ).then(res => res.json());
        setData(responseData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };

    fetchApi();
  }, [path, filterParams, refetchToggle]);

  const changeParams = (newParams: FilterParams) => {
    setFilterParams(newParams);
  };

  const refetch = useCallback(() => {
      setRefetchToggle(r => !r);
  }, [])

  return { data, loading, error, changeParams, refetch };
};

export default useApi;
