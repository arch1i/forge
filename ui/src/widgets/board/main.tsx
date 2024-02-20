import { useAppDispatch } from '~/app/store/hooks';
import { Container } from './container';
import { boardModel, Element } from '~/entities/board';
import { pointerModel } from '~/entities/pointer';
import { PointerEventHandler } from 'react';

export const Board = () => {
    const dispatch = useAppDispatch();
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

    const handlePointerUp = () => dispatch(pointerModel.actions.up());

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
        <Container
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
        >
            {elements.map((el) => {
                return (
                    <Element
                        key={el.uniqueKey}
                        type={el.type}
                        position={el.position}
                        size={el.size}
                        styles={el.styles}
                    />
                );
            })}
        </Container>
    );
};
