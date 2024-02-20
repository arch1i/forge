import { Pointer } from '~/entities/pointer';
import { ComputedPosition } from '~/shared/types/core/view';

export type Element = {
    uniqueKey: UniqueKey;

    type: ExcludeStrict<TypeOfValue<Pointer, 'mode'>, 'default'>;

    position: ComputedPosition;
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
