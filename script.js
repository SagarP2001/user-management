const apiUrl = 'https://jsonplaceholder.typicode.com/users';
const usersTableBody = document.querySelector('#usersTable tbody');
const addUserBtn = document.getElementById('addUserBtn');
const userFormContainer = document.getElementById('userFormContainer');
const userForm = document.getElementById('userForm');
const cancelBtn = document.getElementById('cancelBtn');
const userFirstNameInput = document.getElementById('userFirstName');
const userLastNameInput = document.getElementById('userLastName');
const userEmailInput = document.getElementById('userEmail');
const userDepartmentInput = document.getElementById('userDepartment');
const errorMessageContainer = document.getElementById('errorMessage');

document.addEventListener('DOMContentLoaded', loadUsers);

addUserBtn.addEventListener('click', () => {
    userFormContainer.classList.remove('hidden');
    formTitle.textContent = 'Add New User';
    userFirstNameInput.value = '';
    userLastNameInput.value = '';
    userEmailInput.value = '';
    userDepartmentInput.value = '';
    editingUserId = null;
});

cancelBtn.addEventListener('click', () => {
    userFormContainer.classList.add('hidden');
});

userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstName = userFirstNameInput.value;
    const lastName = userLastNameInput.value;
    const email = userEmailInput.value;
    const department = userDepartmentInput.value;

    if (editingUserId) {
        fetch(`${apiUrl}/${editingUserId}`, {
            method: 'PUT',
            body: JSON.stringify({ name: `${firstName} ${lastName}`, email, department }),
            headers: { 'Content-Type': 'application/json' },
        }).then(() => {
            loadUsers();
            userFormContainer.classList.add('hidden');
        });
    } else {
        fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify({ name: `${firstName} ${lastName}`, email, department }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(() => {
                loadUsers();
                userFormContainer.classList.add('hidden');
            });
    }
});

function loadUsers() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(users => {
            usersTableBody.innerHTML = '';
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name.split(' ')[0]}</td>
                    <td>${user.name.split(' ')[1]}</td>
                    <td>${user.email}</td>
                    <td>${user.department || 'N/A'}</td>
                    <td>
                        <button onclick="editUser(${user.id})">Edit</button>
                        <button onclick="deleteUser(${user.id})">Delete</button>
                    </td>
                `;
                usersTableBody.appendChild(row);
            });
        });
}

function editUser(userId) {
    fetch(`${apiUrl}/${userId}`)
        .then(response => response.json())
        .then(user => {
            const [firstName, lastName] = user.name.split(' ');
            userFirstNameInput.value = firstName;
            userLastNameInput.value = lastName;
            userEmailInput.value = user.email;
            userDepartmentInput.value = user.department || '';
            userFormContainer.classList.remove('hidden');
            formTitle.textContent = 'Edit User';
            editingUserId = userId;
        });
}

function deleteUser(userId) {
    fetch(`${apiUrl}/${userId}`, {
        method: 'DELETE',
    })
        .then(() => {
            loadUsers();
        });
}
function handleApiResponse(response) {
    if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
    }
    return response.json();
}
function handleError(error) {
    errorMessageContainer.classList.remove('hidden');
    errorMessageContainer.textContent = `Error: ${error.message}`;
}
