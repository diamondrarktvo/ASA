import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import type { AppDispatch, RootState } from "./store";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";

export declare const useAppDispatch: <
  AppDispatch extends Dispatch<AnyAction> = Dispatch<AnyAction>,
>() => AppDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
