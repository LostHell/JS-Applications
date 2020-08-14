function login() {
    const authContainer = document.getElementById('auth-container');
    const loginContainer = document.getElementById('login-container');
    const loginBtn = document.getElementById('login-btn');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const userEmailEl = document.getElementById('user-email');
    const logoutBtn = document.getElementById('logoutBtn');

    loginBtn.addEventListener('click', () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        if (!email || !password) {
            return 'Try again!';
        }

        // Sign In
        firebase.auth()
            .signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    });

    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Sign out
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
        });
    });

    init();

    function init() {
        // console.log(firebase.app().name);  // "[DEFAULT]"

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                authContainer.classList.remove('hidden');
                loginContainer.classList.add('hidden');
                userEmailEl.textContent = user.email;
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                // ...
            } else {
                authContainer.classList.add('hidden');
                loginContainer.classList.remove('hidden');
            }
        });
    }
}

login();