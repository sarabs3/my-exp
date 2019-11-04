export const sort = (data, sort) => {console.log('sort', sort);return sort ? data.reverse() : data;}

export const concatValues = data => {
    if (data.length) {
        return data
        .map(item => parseFloat(item.value.amount))
        .filter(Boolean)
        .reduce((a,b) => a+b)        ;
    }
    return 0;
};


export const groupBy = (arr, fn) =>
arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val, i) => {
  acc[val] = (acc[val] || []).concat(arr[i]);
  return acc;
}, {});