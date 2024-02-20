import { model } from '../model/model';
import { useAppDispatch } from '~/app/store/hooks';
import { Container } from './container';
import { Element } from './element';
import { useElements } from '../model/selectors';

export const Board = () => {
    const dispatch = useAppDispatch();
    const elements = useElements();

    return (
        <Container
            onPointerDown={(ev) => {
                const { x, y } = ev.currentTarget.getBoundingClientRect();
                dispatch(
                    model.actions.pointerDown({
                        clientX: ev.clientX,
                        clientY: ev.clientY,
                        targetRect: { x, y },
                    }),
                );
            }}
            onPointerUp={() => {
                dispatch(model.actions.pointerUp());
            }}
            onPointerMove={(ev) => {
                const { x, y } = ev.currentTarget.getBoundingClientRect();
                dispatch(
                    model.actions.pointerPositionChanged({
                        clientX: ev.clientX,
                        clientY: ev.clientY,
                        targetRect: { x, y },
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
