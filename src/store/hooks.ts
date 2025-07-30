import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { clearError, setLoading } from './slices/appSlice';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useApp = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.app);

  const handleClearError = () => {
    dispatch(clearError());
  };

  const handleSetLoading = (loading: boolean) => {
    dispatch(setLoading(loading));
  };

  return {
    isLoading,
    error,
    clearError: handleClearError,
    setLoading: handleSetLoading,
  };
}; 