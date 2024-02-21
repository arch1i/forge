import { type Pointer } from '~/entities/pointer';
import { type ComputedPointerPosition } from '~/shared/types/core/view';

export type Element = {
    uniqueKey: UniqueKey;

    type: ExcludeStrict<TypeOfValue<Pointer, 'mode'>, 'default'>;

    position: ComputedPointerPosition;
    size: Size;

    styles: Styles;
};

type Size = {
    width: number;
    height: number;
};

type Styles = {
    color?: string;
};
