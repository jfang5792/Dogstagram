
const createButtonContainer = () => {
    const btnContainer = document.createElement('div');
    btnContainer.setAttribute('class', 'btn-container');
    btnContainer.appendChild(createVoteCounter());

    const upDownContainer = document.createElement('div');
    upDownContainer.setAttribute('class', 'upDown-container');
    upDownContainer.innerHTML =
        '<div class="up-btn vote-btn" id="up">⬆</div> <div class="down-btn vote-btn" id="down">⬇</div>'

    createVoteEvent(upDownContainer);
    btnContainer.appendChild(upDownContainer);

    const newDogBtn = document.createElement('btn');
    newDogBtn.setAttribute('class', 'new-dogBtn');
    newDogBtn.innerText = 'NEW DOG'

    createNewDogEvent(newDogBtn);
    btnContainer.appendChild(newDogBtn);

    return btnContainer;
}

const createVoteCounter = () => {
    const voteCounterContainer = document.createElement('div');
    let votes = 0;

    if (localStorage.getItem('votes')) votes = localStorage.getItem('votes');
    voteCounterContainer.setAttribute('class', 'voteCounter-container');
    voteCounterContainer.innerHTML = `<div class="votes-text"> Votes: </div> <div class="votes-num" id="votes"> ${votes} </div>`
    return voteCounterContainer;
}

const createNewDogEvent = (dogBtn) => {
    dogBtn.addEventListener('click', evt => {
        const dogImg = document.querySelector('.dog-img');
        fetch('https://api.thedogapi.com/v1/images/search')
            .then(res => {
                // console.log(res);
                return res.json();
            })
            .then(body => {
                // console.log(body);
                const dogUrl = body[0].url;
                dogImg.src = dogUrl;
                localStorage.setItem('dogUrl', dogUrl);
                resetValues();
        })
        evt.preventDefault();
    })
}

const createVoteEvent = (voteBtnContainer) => {
    voteBtnContainer.addEventListener('click', evt => {
        const btn = evt.target;
        const voteNumEl = document.querySelector('#votes');
        let voteNum = Number(voteNumEl.innerText);
        if (btn.id === 'up') {
            voteNum++
        } else if (btn.id === 'down') {
            voteNum--
        }
        localStorage.setItem('votes', voteNum);
        voteNumEl.innerText = voteNum;
    })
}

const resetValues = () => {
    const voteCount = document.querySelector('#votes');
    const comments = document.querySelector('.comments-box');

    voteCount.innerText = 0;
    localStorage.setItem('votes', 0);
    comments.innerHTML = '';
    localStorage.setItem('comments', JSON.stringify([]));
}

export default createButtonContainer
