export const sort = (data, sort) => {console.log('sort', sort);return sort ? data.reverse() : data;}

export const concatValues = data => data.length ? parseFloat(data.reduce(
    (a,b) => (
        {
            value: {
                amount: parseFloat(a.value.amount) + parseFloat(b.value.amount)
            }
        }
    )
).value.amount) : 0;


export const groupBy = (arr, fn) =>
arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val, i) => {
  acc[val] = (acc[val] || []).concat(arr[i]);
  return acc;
}, {});