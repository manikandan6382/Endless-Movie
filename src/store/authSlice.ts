import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type SerializableUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  metadata: { creationTime?: string };
};

interface AuthState {
  currentUser: SerializableUser | null;
  loading: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  loading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<SerializableUser | null>) {
      state.currentUser = action.payload;
      state.loading = false;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
