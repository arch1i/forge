import { useSelector } from 'react-redux';

export const useShapes = () => useSelector((state: AppState) => state.board.shapes);

export const usePointerStatus = () => useSelector((state: AppState) => state.board.pointer.status);
