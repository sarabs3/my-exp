export const sort = (data, sort) => {console.log('sort', sort);return sort ? data.reverse() : data;}

export const concatValues = data => data.reduce(
    (a,b) => (
        {
            value: {
                amount: parseFloat(a.value.amount) + parseFloat(b.value.amount)
            }
        }
    )
).value.amount;