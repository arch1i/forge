import { type ComputedPointerPosition } from '~/shared/types/core/view';

export type Element = {
    uniqueKey: UniqueKey;

    type: ElementType;

    position: ComputedPointerPosition;
    size: Size;

    styles: Styles;
};

export type ElementType = 'rect';

type Size = {
    width: number;
    height: number;
};

type Styles = {
    color?: string;
};
