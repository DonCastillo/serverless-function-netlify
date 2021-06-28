const title = document.querySelector('.title h2')
const result = document.querySelector('.result')
// console.log('don')

const fetchData = async () => {
    try {
        // console.log('don')
        const {data} = await axios.get('/api/survey');
        const response = data.map(item => {
            const {room, votes, id} = item;
            return `<li>
                <div class="key">${room.toUpperCase().substring(0, 2)}</div>
                <div>
                    <h4>${room}</h4>
                    <p class="vote-${id}" data-votes="${votes}">${votes} votes</p>
                </div>
                <button data-id="${id}">
                    <i class="fas fa-vote-yea"></i>
                </button>
            </li>`;
        }).join('');
        result.innerHTML = response;
    } catch(error) {
        result.innerHTML = `<h4>There was an error</h4>`;
    }
}

window.addEventListener('load', fetchData);
result.addEventListener('click', async (e) => {
    if(e.target.classList.contains('fa-vote-yea')) {
        const btn = e.target.parentElement;
        const id = btn.dataset.id;
        const voteNode = result.querySelector(`.vote-${id}`);
        const votes = parseInt(voteNode.dataset.votes);
        // console.log(votes);
        const newVotes = await modifyData(id, votes);
        voteNode.textContent = `${newVotes} votes`;
        voteNode.dataset.votes = newVotes;
    }
});

async function modifyData(id, votes) {
    return votes + 1;
}