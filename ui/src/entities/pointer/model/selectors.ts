import { useSelector } from 'react-redux';

export const useStatus = () => useSelector((state: AppState) => state.pointer.status);

export const useDraftingMode = () =>
    useSelector((state: AppState) => state.pointer.info['drafting-an-element']?.mode);
