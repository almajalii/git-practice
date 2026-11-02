import {
  configureStore,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Role } from "./ability";
const preferences = createSlice({
  name: "preferences",
  initialState: { role: "editor" as Role, compact: false },
  reducers: {
    setRole(state, action: PayloadAction<Role>) {
      state.role = action.payload;
    },
    toggleCompact(state) {
      state.compact = !state.compact;
    },
  },
});
export const { setRole, toggleCompact } = preferences.actions;
export const makeStore = () =>
  configureStore({ reducer: { preferences: preferences.reducer } });
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
