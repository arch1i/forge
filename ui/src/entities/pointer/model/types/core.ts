export type PointerPosition = Pick<MouseEvent, 'clientX' | 'clientY'> & {
    targetRect: Pick<DOMRect, 'x' | 'y'>;
};
