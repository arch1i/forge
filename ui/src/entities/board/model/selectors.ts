import { useSelector } from 'react-redux';

export const useElements = () => useSelector((state: AppState) => state.board.elements);
