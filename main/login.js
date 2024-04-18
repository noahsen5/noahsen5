document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('new-username').value;
            const password = document.getElementById('new-password').value;

            if (validatePassword(password)) {
                // Encrypt the password
                const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret key').toString();
                const users = JSON.parse(localStorage.getItem('users') || '[]');

                if (users.some(u => u.username === username)) {
                    alert('User already exists!');
                } else {
                    // Store the encrypted password
                    users.push({ username, password: encryptedPassword });
                    localStorage.setItem('users', JSON.stringify(users));
                    alert('Registration successful!');
                }
            } else {
                alert('Password does not meet requirements!');
            }
        });
    }
});


function downloadJsonData() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `users-${timestamp}.json`;
    const fileToDownload = new Blob([JSON.stringify(users, null, 2)], {type: 'application/json'});

    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(fileToDownload);
    downloadLink.download = filename;
    downloadLink.style.display = 'none';

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}


function validatePassword(password) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,}$/.test(password);
}
