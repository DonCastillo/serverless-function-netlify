const result = document.querySelector('.result');
// console.log('hello')
 
const fetchProduct = async () => {
    try {
        const {data} = await axios.get(`/api/airtable`);
        console.log(data)
        const product = data.find(x => {
            let param = (new URL(document.location)).searchParams;
            let searchID = param.get('id');
            return x.id == searchID;
        });

        if(product){
            result.innerHTML = `
            <h1 class="title">${product.name}</h1>
            <article class="product">
                <img class="product-img" src="${product.url}" alt="${product.name}"/>
                <div class="product-info">
                <h5 class="title">${product.name}</h5>
                <h5 class="price">$${product.price}</h5>
                <p class="desc">${product.description}</p>
                </div>
            </article>
            `
        } else {
            result.innerHTML = `<h4>No product found</h4>`
        }

    } catch (error) {
        result.innerHTML = '<h4>There was an error</h4>';
    }
}

fetchProduct();