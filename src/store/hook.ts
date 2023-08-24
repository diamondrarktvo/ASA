import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import type { AppDispatch, RootState } from "./store";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";

//FIXME: find the problem of this type of useAppDispatch
export const useAppDispatch = useDispatch;
//export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
