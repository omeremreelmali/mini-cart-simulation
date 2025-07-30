import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  isLoading: boolean;
  error: string | null;
}

const initialState: AppState = {
  isLoading: false,
  error: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    startRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    
    finishRequest: (state) => {
      state.isLoading = false;
    },
    
    setError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    
    clearError: (state) => {
      state.error = null;
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  startRequest,
  finishRequest,
  setError,
  clearError,
  setLoading,
} = appSlice.actions;

export default appSlice.reducer; 