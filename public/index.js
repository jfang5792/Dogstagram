// component imports

import createCommentsContainer from "./components/commentsContainer.js";
import createImgContainer from "./components/imgContainer.js";

const intializePage = () => {
    const pageSection = document.createElement('h1');
    pageSection.className = "title"
    pageSection.innerText = "Dogstagram";
    document.body.append(pageSection);

    const img = document.createElement('img')
    document.body.append(img);
    fetch ('https://api.thedogapi.com/v1/images/search'
    ).then(res => {
        return res.json()
    }).then(data => {
        img.src = data[0].url
    })

}

window.onload = () => {
    intializePage()
    const main = document.createElement('div');
    main.setAttribute('class', 'main');

    const commentsContainer = createCommentsContainer();
    main.appendChild(commentsContainer);

    const imgContainer = createImgContainer();
    main.appendChild(imgContainer);

    document.body.appendChild(main);
}
