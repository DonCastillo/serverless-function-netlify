const result = document.querySelector('.result');

const fetchData = async () => {
    try {
        const {data} = await axios.get('/.netlify/functions/hello');
        result.textContent = data;
    } catch (error) {
        result.textContent = error.response.data;
    }
}

fetchData();