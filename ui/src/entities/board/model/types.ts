export interface Shape {
    type: ShapeType;

    position: Position;
    size: Size;

    styles: Styles;
}

export interface ModelState {
    shapes: Array<Shape>;
}

type ShapeType = 'rect' | 'circle';

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
