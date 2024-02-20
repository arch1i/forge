import { useSelector } from 'react-redux';

export const useElements = () => useSelector((state: AppState) => state.board.elements);

export const usePointerStatus = () => useSelector((state: AppState) => state.board.pointer.status);
