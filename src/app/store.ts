import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import membershipReducer from '../features/memberships/membershipSlice';
import userReducer from "../features/user/userSlice";
import adminReducer from "../features/admin/adminSlice";
import atpReducer from "../features/atp/atpSlice";

export function makeStore() {
  return configureStore({
    reducer: { 
      user: userReducer,
      membership: membershipReducer,
      admin: adminReducer,
      atp: atpReducer,
    },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
