// component imports

import createCommentsContainer from "./components/commentsContainer.js";
import createImgContainer from "./components/imgContainer.js";

window.onload = () => {
    const main = document.createElement('div');
    main.setAttribute('class', 'main');

    const imgContainer = createImgContainer();
    main.appendChild(imgContainer);

    const commentsContainer = createCommentsContainer();
    main.appendChild(commentsContainer);

    document.body.appendChild(main);
}
