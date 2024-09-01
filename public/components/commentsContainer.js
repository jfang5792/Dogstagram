
const createCommentsContainer = () => {
    const commentsContainer = document.createElement('div');
    commentsContainer.setAttribute('class', 'main-comments');

    commentsContainer.appendChild(createInputBox());
    commentsContainer.appendChild(createCommentsBox());

    return commentsContainer;
}

const createCommentsBox = () => {
    const commentsBox = document.createElement('div');
    commentsBox.setAttribute('class', 'comments-box');

    const comments = JSON.parse(localStorage.getItem('comments'));
    if (comments?.length > 0) {
        comments.forEach(ele => {
            const comment = createComment(ele);
            commentsBox.appendChild(comment);
        })
    }
    return commentsBox;
}

const createInputBox = () => {
    const inputContainer = document.createElement('div');
    inputContainer.setAttribute('class', 'input-container');

    const inputField = document.createElement('input');
    inputField.setAttribute('class', 'input-field');
    inputField.type = 'text';
    inputField.placeholder = 'Type comment here';

    inputContainer.appendChild(inputField);

    const postCommentBtn = document.createElement('button');
    postCommentBtn.setAttribute('class', 'post-commentBtn');
    postCommentBtn.innerText = 'Post';

    inputContainer.appendChild(postCommentBtn);
    createPostCommentEvt(postCommentBtn);

    return inputContainer;
}



const createComment = (text) => {
    const commentContainer = document.createElement('div');
    commentContainer.setAttribute('class', 'comment-container');

    const bulletOnComment = document.createElement('span');
    bulletOnComment.setAttribute('class', 'bullet-point');
    bulletOnComment.innerHTML = '&bull;';

    const newComment = document.createElement('div');
    newComment.setAttribute('class', 'comment');
    newComment.innerText = text;

    const deleteCommentBtn = document.createElement('button');
    deleteCommentBtn.setAttribute('class', 'delete-commentBtn');
    deleteCommentBtn.setAttribute('id', 'delete-btn');
    deleteCommentBtn.innerText = '❌'

    commentContainer.appendChild(bulletOnComment);
    commentContainer.appendChild(newComment);
    commentContainer.appendChild(deleteCommentBtn);

    createDeleteCommentEvt(commentContainer);
    return commentContainer;
}

const createPostCommentEvt = (postBtn) => {
    postBtn.addEventListener('click', evt => {
        const inputField = document.querySelector('.input-field');
        const commentBox = document.querySelector('.comments-box');
        const newComment = createComment(inputField.value);
        const initArr = [];

        const commentsDb = JSON.parse(localStorage.getItem('comments'));
        if (commentsDb) {
            commentsDb.push(inputField.value);
        } else {
            initArr.push(inputField.value);
        }
        commentBox.appendChild(newComment);

        localStorage.setItem('comments', JSON.stringify(commentsDb ? commentsDb : initArr));
        inputField.value = '';
        evt.preventDefault();
    })
}


const createDeleteCommentEvt = (commentContainer) => {
    commentContainer.addEventListener('click', evt => {
        const btn = evt.target
        const commentsDb = JSON.parse(localStorage.getItem('comments'));
        const text = commentContainer.children[0].innerText;
        const commentIndex = commentsDb.findIndex(ele => ele === text);

        if (btn.id === 'delete-btn') {
            commentsDb.splice(commentIndex, 1);
            localStorage.setItem('comments', JSON.stringify(commentsDb));
            commentContainer.remove();
        }
    })
}

export default createCommentsContainer
