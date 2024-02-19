import { type Element as ElementInterface } from '../model/types/element';

interface Params extends OmitStrict<ElementInterface, 'uniqueKey'> {}

export const Element = ({ position, size }: Params) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: `${position.y}px`,
                left: `${position.x}px`,
                height: `${size.height}px`,
                width: `${size.width}px`,
                color: 'sky',
            }}
            className='border border-blue-400 rounded-[3px]'
        />
    );
};
