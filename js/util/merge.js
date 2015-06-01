export default function merge(previousMap, newMap) {
   let mergedMap = {};

   for (let key in previousMap) {
      mergedMap[key] = newMap[key] || previousMap[key];
   }

   return mergedMap;
}
