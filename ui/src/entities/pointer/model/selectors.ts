import { useSelector } from 'react-redux';

export const usePointerStatus = () => useSelector((state: AppState) => state.pointer.status);
