// const { default: axios } = require("axios");

const result = document.querySelector('.result');

const fetchData = async () => {
    console.log('second example');
    try {
        const {data} = await axios.get('/api/basic-api');
        const products = data.map(product => {
            const {image: {url}, name, price} = product;
            return `
                <article class="product">
                    <img src="${url}" alt="${name}"/>
                    <div class="info">
                        <h5>${name}</h5>
                        <h5 class="price">$${price}</h5>
                    </div>
                </article>
            `;
        }).join('')
        // console.log(products);
        result.innerHTML = products;
    } catch (error) {
        result.innerHTML = `<h4>There was an error. Please try again later.</h4>`;
    }
}


fetchData();