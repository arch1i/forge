import { type ComputedPointerPosition } from '~/entities/pointer/model/types/core';

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
