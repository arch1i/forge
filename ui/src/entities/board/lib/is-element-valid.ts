import { MIN_ELEMENT_SIZE } from '../config/constants';
import { Element } from '../model/types/element';

export function isElementValid(element: Element) {
    return !(element.size.width < MIN_ELEMENT_SIZE || element.size.height < MIN_ELEMENT_SIZE);
}
