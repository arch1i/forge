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
                color: 'sky',
                borderColor: 'sky',
                borderWidth: '3px',
                borderTopLeftRadius: '255px 25px',
                borderTopRightRadius: '15px 225px',
                borderBottomRightRadius: '225px 15px',
                borderBottomLeftRadius: '15px 255px',
            }}
            className='rounded-[40px] border-sky-500/95 cursor-pointer'
        />
    );
};
