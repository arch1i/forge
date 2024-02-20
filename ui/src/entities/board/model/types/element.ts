import { ComputedPosition } from '~/shared/types/core/view';

export type Element = {
    uniqueKey: UniqueKey;

    type: ElementType;

    position: ComputedPosition;
    size: Size;

    styles: Styles;
};

type ElementType = 'rect' | 'circle';

type Size = {
    width: number;
    height: number;
};

type Styles = {
    color: string;
};
