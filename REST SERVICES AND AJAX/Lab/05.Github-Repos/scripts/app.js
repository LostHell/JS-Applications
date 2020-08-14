// function loadRepos() {
//     const reposEl = document.querySelector('#repos');
//     const usernameElemenet = document.querySelector('#username');
//
//     reposEl.innerHTML = '';
//     const username = usernameElemenet.value;
//     const url = `https://api.github.com/users/${username}/repos`;
//
//     fetch(url)
//         .then(res => res.json())
//         .then(data => {
//             data.forEach(item => {
//                 const li = document.createElement('li');
//                 const a = document.createElement('a');
//                 a.href = item.html_url;
//                 a.textContent = item.full_name;
//                 li.appendChild(a);
//                 reposEl.appendChild(li);
//             });
//         });
// }


(function () {
    const usersElement = document.querySelector('#users');

    // For POST or PUT or DELETE
    document.querySelector('#myBtn').addEventListener('click',()=>{
        const email = document.querySelector('#email');
        const firstName = document.querySelector('#firstName');
        const lastName = document.querySelector('#lastName');

        const newData = {email, firstName, lastName};

        fetch('SOME_URL', {
            headers:{'Content-type': 'application/json'},
            method: 'PUT',
            body: JSON.stringify(newData)
                .then(res => res.json())
                .then(console.log('da'))
        });
    });


    // For GET
    fetch('https://api.github.com/users/losthell/repos')
        .then(res => res.json())
        .then(data => {
            data.forEach(item => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.innerHTML = `<span>${item.full_name}</span>`;
                li.appendChild(a);
                usersElement.appendChild(li);
            });
        });
}());