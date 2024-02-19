import { events, subscribes } from '../model';
import { useAppDispatch } from '~/app/store/hooks';
import { Container } from './container';
import { Element } from './element';

export const Board = () => {
    const dispatch = useAppDispatch();
    const elements = subscribes.useShapes();

    return (
        <Container
            onPointerDown={(ev) => {
                const { x, y } = ev.currentTarget.getBoundingClientRect();
                dispatch(
                    events.pointerDown({
                        clientX: ev.clientX,
                        clientY: ev.clientY,
                        currentTargetRect: { x, y },
                    }),
                );
            }}
            onPointerUp={() => {
                dispatch(events.pointerUp());
            }}
            onPointerMove={(ev) => {
                const { x, y } = ev.currentTarget.getBoundingClientRect();
                dispatch(
                    events.pointerPositionChanged({
                        clientX: ev.clientX,
                        clientY: ev.clientY,
                        currentTargetRect: { x, y },
                    }),
                );
            }}
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
