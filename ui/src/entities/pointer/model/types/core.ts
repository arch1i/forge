export type ComputedPointerPosition = {
    computedX: number;
    computedY: number;
};

export type PointerBaseEvent = {
    touchPoints: Array<ComputedPointerPosition>;
};
