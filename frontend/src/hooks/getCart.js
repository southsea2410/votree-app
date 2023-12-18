export default async function getCart({userId}) {
    return fetch(`/api/v1/marketplace/carts`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(res => { return res.json() })
    .then((cartArr) => {
        let cartNum = cartArr.results;
        cartArr = cartArr.data.carts;

        for (let i = 0; i < cartNum; i++)
            if (cartArr[i].user == userId)
                return cartArr[i];
    })
    .catch(err => console.log(err));
}