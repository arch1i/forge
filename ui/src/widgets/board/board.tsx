import { useAppDispatch } from '~/app/store/hooks';
import { boardModel, Element, getCursorStyle } from '~/entities/board';
import { pointerModel } from '~/entities/pointer';
import { PointerEventHandler, useRef } from 'react';

export const Board = () => {
    const dispatch = useAppDispatch();
    const nodeRef = useRef<HTMLDivElement | null>(null);

    const draftingMode = pointerModel.selectors.useDraftingMode();
    const elements = boardModel.subscribes.useElements();

    const handlePointerDown: PointerEventHandler = (ev) => {
        const { x, y } = ev.currentTarget.getBoundingClientRect();
        dispatch(
            pointerModel.actions.down({
                clientX: ev.clientX,
                clientY: ev.clientY,
                targetRect: { x, y },
            }),
        );
    };

    const handlePointerUp: PointerEventHandler = () => {
        dispatch(pointerModel.actions.up());
    };

    const handlePointerMove: PointerEventHandler = (ev) => {
        const { x, y } = ev.currentTarget.getBoundingClientRect();
        dispatch(
            pointerModel.actions.moved({
                clientX: ev.clientX,
                clientY: ev.clientY,
                targetRect: { x, y },
            }),
        );
    };

    return (
        <div
            ref={nodeRef}
            className='relative w-[100vw] h-[100vh] overflow-hidden'
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
            style={{ cursor: getCursorStyle({ element: 'board', draftingMode }) }}
        >
            {elements.map((el) => {
                return (
                    <Element
                        boardNodeRef={nodeRef}
                        key={el.uniqueKey}
                        uniqueKey={el.uniqueKey}
                        type={el.type}
                        position={el.position}
                        size={el.size}
                        styles={el.styles}
                    />
                );
            })}
        </div>
    );
};
