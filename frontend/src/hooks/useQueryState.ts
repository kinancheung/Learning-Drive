import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const parseQuery = (key: string, params: URLSearchParams) => {
  const query = params.get(key);
  if (query) {
    const value = JSON.parse(query);
    return value;
  }
};

/**
 * useState hook that stores its state in the url query params. This allows state to be linked to the url
 * @param key the key of the query param to store the state in
 * @param fallback default state value, if no value can be determined from the query param
 */
export const useQueryState = <T>(key: string, fallback: T): [T, Dispatch<SetStateAction<T>>] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState<T>(parseQuery(key, searchParams) || fallback);

  useEffect(() => {
    const value = parseQuery(key, searchParams);
    if (value) {
      setState(value);
    }
  }, [key]);

  useEffect(() => {
    const serializedState = JSON.stringify(state);
    if (serializedState !== '{}') {
      searchParams.set(key, JSON.stringify(state));
    } else {
      searchParams.delete(key);
    }
    setSearchParams(searchParams.toString(), { replace: true });
  }, [key, state, setSearchParams]);

  return [state, setState];
};
