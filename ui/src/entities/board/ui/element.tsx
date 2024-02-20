import { pointerModel } from '~/entities/pointer';
import { type Element as ElementInterface } from '../model/types/element';

interface Params extends OmitStrict<ElementInterface, 'uniqueKey'> {}

export const Element = ({ position, size }: Params) => {
    const pointer = pointerModel.selectors.usePointerStatus();

    return (
        <div
            style={{
                position: 'absolute',
                top: `${position.y}px`,
                left: `${position.x}px`,
                width: `${size.width}px`,
                height: `${size.height}px`,
                cursor: pointer === 'drafting-an-element' ? 'crosshair' : 'grab',
            }}
            className='rounded-[20px] border-2 border-[#366fbc]'
        />
    );
};
