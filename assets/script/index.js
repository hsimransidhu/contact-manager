'use strict';

import { onEvent, select } from './utils.js';
import Contact from './contact.js';
 
const input = select('input');
const Addbtn = select('.add-btn');
const contactList = select('.contactList');
const savedContacts = select('.saved-contacts');
const errorMessage = select('.error');
const AlertMessage = select('.alert');

const contacts = [];
let name, city, email;
let maxContacts = 9;
savedContacts.innerText = 'Saved contacts: 0';

// validate inputs
function validateInputs() {
  let userInput = input.value
    .trim()
    .split(',')
    .map(part => part.trim());
  [name, city, email] = userInput;

  const emailRegex =
    /^(?=.{8,}$)[-_A-Za-z0-9]+([.-_][a-zA-Z0-9]+)*@[A-Za-z0-9]+([.-][a-zA-Z0-9]+)*\.[A-Za-z]{2,}$/;

  if (userInput.length === 3) {
    if (typeof name !== 'string' || name.length < 2 || /\d/.test(name)) {
      ErrorMessage('Please enter a valid name!');
      return false;
    }

    if (typeof city !== 'string' || city.length < 2 || /\d/.test(city)) {
      ErrorMessage('Please enter a valid city!');
      return false;
    }

    if (!emailRegex.test(email)) {
      ErrorMessage('Please enter a valid email');
      return false;
    }
 
    return true;
  } else {
    ErrorMessage(
      'Please enter all the specified inputs (Name, City, Email)'
    );
    return false;
  }
}

function ErrorMessage(message) {
  errorMessage.innerText = message;
}
 
function clearErrorMessage() {
    errorMessage.innerText = '';
  }
  
function listContacts() {
  AlertMessage.innerText = '';

  if (contacts.length > maxContacts) {
    AlertMessage.innerText =
      'Storage is full! Cannot add more contacts :(';
    return;
  }

  contactList.innerHTML = '';
 
  contacts.forEach((contact, index) => {
    const contactsDiv = document.createElement('div');
    contactsDiv.classList.add('contact-info');
    const namesPara = document.createElement('p');
    const citysPara = document.createElement('p');
    const emailsPara = document.createElement('p');
    namesPara.innerText = `Name: ${contact.name.trim()}`;
    citysPara.innerText = `City: ${contact.city.trim()}`;
    emailsPara.innerText = `Email: ${contact.email.trim().toLowerCase()}`;
    contactsDiv.appendChild(namesPara);
    contactsDiv.appendChild(citysPara);
    contactsDiv.appendChild(emailsPara);

    contactList.appendChild(contactsDiv);

    // delete  contact
    onEvent('click', contactsDiv, function () {
      deleteContact(index);
    });
  });
 
  displaySaved(contacts);
}
 
function displaySaved(array) {
  let numberContacts = array.length;
  savedContacts.innerText = `Saved contacts: ${numberContacts}`;
}

function deleteContact(index) {
    contacts.splice(index, 1);
    listContacts();
    AlertMessage.innerText = '';
  }
   
onEvent('click', Addbtn, function (e) {
  e.preventDefault();

  // Validate inputs
  if (!validateInputs()) {
    return;
  }

  // Create new contact
  const newContact = new Contact(name, city, email);
  contacts.unshift(newContact);

  // Display contacts
  listContacts();
  input.value = '';
  
  clearErrorMessage();
});