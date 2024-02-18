import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export const useShapes = () => {
    useSelector(
        createSelector(
            (state: AppState) => state.board,
            (board) => board.shapes,
        ),
    );
};
