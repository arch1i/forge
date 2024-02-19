export type Element = {
    uniqueKey: string;

    type: ElementType;

    position: Position;
    size: Size;

    styles: Styles;
};

type ElementType = 'rect' | 'circle';

type Position = {
    x: number;
    y: number;
};

type Size = {
    width: number;
    height: number;
};

type Styles = {
    color: string;
};
