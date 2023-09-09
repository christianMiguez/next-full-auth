"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { increment, decrement, reset } from "@/redux/features/counterSlice";

/*
  This component is just a simple counter that uses the redux store.
*/
export const Counter = () => {
  const count = useAppSelector((state) => state.counterReducer.counter);
  const dispatch = useAppDispatch();
  return (
    <>
      <p className="py-2 px-4 rounded m-3 mt-0 text-center text-white">
        Counter: {count}
      </p>
      <div className="text-white flex justify-center">
        <button
          onClick={() => {
            dispatch(reset());
          }}
          className="bg-slate-600 py-2 px-4 rounded m-3"
        >
          reset
        </button>
        <button
          onClick={() => {
            dispatch(increment());
          }}
          className="bg-slate-600 py-2 px-4 rounded m-3"
        >
          +1
        </button>
        <button
          onClick={() => {
            dispatch(decrement());
          }}
          className="bg-slate-600 py-2 px-4 rounded m-3"
        >
          -1
        </button>
      </div>
    </>
  );
};
