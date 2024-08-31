import createButtonContainer from "./buttonContainer.js";

const createImgContainer = () => {
    const imgContainer = document.createElement('div');
    imgContainer.setAttribute('class', 'main-Img')

    imgContainer.appendChild(createHeader());
    imgContainer.appendChild(createImg());
    imgContainer.appendChild(createButtonContainer());

    return imgContainer;
}

const createHeader = () => {
    const header = document.createElement('h1');
    header.setAttribute('class', 'title');
    header.innerText = 'Dogstagram';
    return header;
}

const createImg = () => {
    const dogImg = document.createElement('img');
    dogImg.setAttribute('class', 'dog-img');

    if (localStorage.getItem('dogUrl')) {
        dogImg.src = localStorage.getItem('dogUrl');
    }
    return dogImg;
}

export default createImgContainer
