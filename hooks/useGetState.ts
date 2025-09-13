'use client';
import { useRef, useState } from 'react';

type Dispatch<T> = (value: T) => void;

type SetStateAction<T> = T | ((prevState: T) => T);

type Result<T> = [state: T, setStateAction: Dispatch<SetStateAction<T>>, getState: () => T];

type InitState<T> = T | (() => T);

function useGetState<T>(initState: InitState<T>): Result<T> {
  const [state, setState] = useState<T>(initState);
  const stateRef = useRef<T>(state);

  const getState = () => stateRef.current;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setStateAction = (action: any) => {
    const value = typeof action === 'function' ? action(getState()) : action;
    stateRef.current = value;
    setState(value);
  };

  return [state, setStateAction, getState];
}

export default useGetState;
