function loadRepos() {
    const url = 'https://api.github.com/users/testnakov/repos';
    const resElement = document.getElementById('res');
    // const xmlHttpRequest = new XMLHttpRequest();
    // xmlHttpRequest.addEventListener('readystatechange', () => {
    //     if (xmlHttpRequest.readyState === 4) {
    //         if (xmlHttpRequest.status === 200) {
    //             console.log(xmlHttpRequest.responseText);
    //             resElement.innerHTML = xmlHttpRequest.responseText
    //         } else if (xmlHttpRequest.status === 401) {
    //             console.log('Unauthorized');
    //         }
    //     }
    // });
    // xmlHttpRequest.open('GET', url);
    // xmlHttpRequest.send();
    // // Finish

    fetch(url).then(res => {
        // Check status code
        if (res.status === 200) {
            return res.json();
        } else if (res.status === 401) {
            console.warn('Unauthorize');
        } else if (res.status === 500) {
            console.error('Server error');
        }
    }).then(data => {
        // If data is false => return / if is NOT false examp. console.log(data)
        if (!data) {
            return;
        }
        console.log(data);
        resElement.textContent = JSON.stringify(data);
    })
}