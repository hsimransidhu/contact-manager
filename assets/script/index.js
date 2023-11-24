import { Contact } from './utils.js';

const contacts = [];

document.getElementById('addContactBtn').addEventListener('click', addContact);

function addContact() {
    const contactDetailsInput = document.getElementById('contactDetails');
    const contactDetails = contactDetailsInput.value;

    // Validate input
    if (!isValidInput(contactDetails)) {
        alert('Invalid input. Please enter contact details in the format: Name, City, Email');
        return;
    }

    // Split the input into an array using commas
    const [name, city, email] = contactDetails.split(',');

    // Create a new contact
    const newContact = new Contact(name.trim(), city.trim(), email.trim());

    // Add the new contact to the beginning of the list
    contacts.unshift(newContact);

    // Display the updated contacts list
    listContacts();

    // Count and display the number of contacts
    document.getElementById('contactCount').innerText = `Number of Contacts: ${contacts.length}`;

    // Clear the input field
    contactDetailsInput.value = '';
}

function isValidInput(input) {
    // Validate that the input contains commas and splits into 3 parts
    const parts = input.split(',');
    if (parts.length !== 3) {
        return false;
    }

    // Validate the email format using a simple regex
    const emailRegex = /^\S+@\S+\.\S+$/;
    const email = parts[2].trim();
    if (!emailRegex.test(email)) {
        return false;
    }

    return true;
}

function deleteContact(index) {
    // Remove the contact from the array
    contacts.splice(index, 1);

    // Display the updated contacts list
    listContacts();

    // Count and display the number of contacts
    document.getElementById('contactCount').innerText = `Number of Contacts: ${contacts.length}`;
}

function listContacts() {
    const contactsList = document.getElementById('contactsList');
    contactsList.innerHTML = ''; // Clear the existing list

    // Iterate through the array and display contacts
    contacts.forEach((contact, index) => {
        const contactDiv = document.createElement('div');
        contactDiv.classList.add('contact');

        const contactInfo = document.createElement('p');
        contactInfo.innerHTML = `<strong>Name:</strong> ${contact.getName()}<br>
                                <strong>City:</strong> ${contact.getCity()}<br>
                                <strong>Email:</strong> ${contact.getEmail()}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerText = 'Delete';
        deleteBtn.addEventListener('click', () => deleteContact(index));

        contactDiv.appendChild(contactInfo);
        contactDiv.appendChild(deleteBtn);

        contactsList.appendChild(contactDiv);
    });
}
