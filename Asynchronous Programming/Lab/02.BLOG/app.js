const loadPostsBtn = document.getElementById('btnLoadPosts');
const postsSelectEl = document.getElementById('posts');
const viewPostsBtn = document.getElementById('btnViewPost');
const postTitleEl = document.getElementById('post-title');
const postBodyEl = document.getElementById('post-body');
const postCommentsUlEl = document.getElementById('post-comments');

const url = 'https://blog-apps-c12bf.firebaseio.com/';

function loadPosts() {
    fetch(`${url}/posts.json`)
        .then(res => res.json())
        .then(data => {
            Object.entries(data).forEach(([key, value]) => {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = value.title;
                postsSelectEl.appendChild(option);
            });
        });
}

function loadPostComments() {
    const postId = postsSelectEl.value;

    const commentsReq = fetch(`${url}/comments.json`)
        .then(res => res.json());

    const postReq = fetch(`${url}/posts/${postId}.json`)
        .then(res => res.json());

    Promise.all([commentsReq, postReq])
        .then(([comments, currentPost]) => {
            // const allPostComments = Object.entries(comments).reduce((acc, [key, value]) => {
            //     if (!Object.keys(currentPost.comments || {}).map(x=>x.postId).includes(postId)) {
            //         return acc;
            //     }
            //     return acc.concat(value);
            // }, []);
            postTitleEl.textContent = currentPost.title;
            postBodyEl.textContent = currentPost.body;

            postCommentsUlEl.innerText = '';

            Object.entries(currentPost.comments || {}).forEach(([key, value]) => {
                const li = document.createElement('li');
                li.textContent = value.textContent;
                postCommentsUlEl.appendChild(li);
            });
        });
}

function attachEvents() {
    loadPostsBtn.addEventListener('click', loadPosts);
    viewPostsBtn.addEventListener('click', loadPostComments);
    // postsSelectEl.addEventListener('change', selectPostHandler);
}

attachEvents();