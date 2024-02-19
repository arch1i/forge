import { type Element as ElementInterface } from '../model/types/element';

interface Params extends OmitStrict<ElementInterface, 'uniqueKey'> {}

export const Element = ({ position, size }: Params) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: `${position.y}px`,
                left: `${position.x}px`,
                width: `${size.width}px`,
                height: `${size.height}px`,
            }}
            className='rounded-[20px] border-2 border-sky-500/95 cursor-pointer'
        />
    );
};
