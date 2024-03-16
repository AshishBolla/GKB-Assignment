// Function to fetch and display user data
async function fetchAndDisplayUserData() {
    try {
        const response = await fetch('/users');
        const data = await response.json();
        displayUserData(data);
    } catch (error) {
        console.error('Error:', error);
        // Handle error if fetching data fails
    }
}

// Function to display user data in the table
function displayUserData(userData) {
    const tableBody = document.querySelector('#userTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    userData.forEach(user => {
        const row = tableBody.insertRow();
        for (const key in user) {
            if (user.hasOwnProperty(key)) {
                const cell = row.insertCell();
                cell.textContent = user[key];
            }
        }

        // Create a cell for the delete button
        const deleteCell = row.insertCell();
        const deleteButton = document.createElement('i');
        deleteButton.classList.add('fas', 'fa-trash-alt', 'delete-button');
        deleteButton.addEventListener('click', () => {
            deleteUser(user.id);
        });
        deleteCell.appendChild(deleteButton);
    });
}

// Function to delete a user by ID
async function deleteUser(userId) {
    try {
        const response = await fetch(`/delete/${userId}`, { // Corrected the URL template string
            method: 'DELETE'
        });
        if (response.ok) {
            fetchAndDisplayUserData(); // Refresh the table after deletion
        } else {
            console.error('Failed to delete user');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Fetch and display user data when the page loads
fetchAndDisplayUserData();

// Function to handle form submission
async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        age: document.getElementById('age').value,
        dob: document.getElementById('dob').value
    };

    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // If form submission is successful, fetch and display updated user data
            fetchAndDisplayUserData();
        } else {
            console.error('Failed to submit form');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Attach event listener to the form submit event
document.getElementById('userForm').addEventListener('submit', handleSubmit);