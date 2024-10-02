let contacts = [
    { name: "Mario Rossi", phone: "123456789", email: "mario@example.com" },
    { name: "Luca Bianchi", phone: "987654321", email: "luca@example.com" }
];
let editingIndex = null;

const contactTable = document.getElementById('contactTable').querySelector('tbody');
const toggleListBtn = document.getElementById('toggleListBtn');
const addContactBtn = document.getElementById('addContactBtn');
const nameInput = document.getElementById('nameInput');
const phoneInput = document.getElementById('phoneInput');
const emailInput = document.getElementById('emailInput');

// Funzione per aggiornare la visualizzazione della lista dei contatti
function renderContacts() {
    contactTable.innerHTML = "";
    contacts.forEach((contact, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.phone}</td>
            <td>${contact.email}</td>
            <td>
                <button class="editBtn" onclick="editContact(${index})">Modifica</button>
                <button class="deleteBtn" onclick="deleteContact(${index})">Elimina</button>
            </td>
        `;
        contactTable.appendChild(row);
    });
}

// Funzione per aggiungere o modificare un contatto
function addOrUpdateContact() {
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();

    if (name == "" || phone == "" || email == "") {
        alert("Tutti i campi devono essere compilati");
        return;
    }

    const newContact = { name, phone, email };

    if (editingIndex == null) {
        // Aggiungi nuovo contatto
        contacts.push(newContact);
    } else {
        // Modifica contatto esistente
        contacts[editingIndex] = newContact;
        editingIndex = null;
        addContactBtn.textContent = "Aggiungi/Modifica Contatto";
    }

    resetForm();
    renderContacts();
}

// Funzione per modificare un contatto
function editContact(index) {
    const contact = contacts[index];
    nameInput.value = contact.name;
    phoneInput.value = contact.phone;
    emailInput.value = contact.email;
    editingIndex = index;
    addContactBtn.textContent = "Modifica Contatto";
}

// Funzione per eliminare un contatto
function deleteContact(index) {
    contacts.splice(index, 1);
    renderContacts();
}

// Funzione per resettare il form
function resetForm() {
    nameInput.value = "";
    phoneInput.value = "";
    emailInput.value = "";
    editingIndex = null;
    addContactBtn.textContent = "Aggiungi/Modifica Contatto";
}

// Funzione per mostrare o nascondere la lista dei contatti
function toggleContactList() {
    if (contactTable.style.display === "none") {
        contactTable.style.display = "";
    } else {
        contactTable.style.display = "none";
    }
}

// Event listeners
addContactBtn.addEventListener('click', addOrUpdateContact);
toggleListBtn.addEventListener('click', toggleContactList);


renderContacts();
