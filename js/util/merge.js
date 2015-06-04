import assign from 'object-assign';

export default function merge(previousMap, newMap) {
   return assign({}, previousMap, newMap);
}
