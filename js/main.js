const contactNameInput = document.getElementById("contactName");
const contactPhoneInput = document.getElementById("contactPhone");
const contactMailInput = document.getElementById("contactMail");
const contacdescInput = document.getElementById("contactDes");
const contactTable = document.getElementById("contactData");
const searchInput = document.getElementById("searchInput");
let inputs = document.getElementsByClassName("form-control");
const addBtn = document.getElementById("addBtn");
let currentContact = 0;

let Contacts = [];

if (JSON.parse(localStorage.getItem("Contactlist")) != null) {
  Contacts = JSON.parse(localStorage.getItem("Contactlist"));
  displayContacts();
}

function addToContacts() {
  if (addBtn.innerHTML == "Add contact") {
    addContact();
  }
  else {
    updateContacts();

  }
  displayContacts();
  clearForm();
}
function updateContacts() {
  alert("Updated");
  Contacts[currentContact] = {
    name: contactNameInput.value,
    phone: contactPhoneInput.value,
    mail: contactMailInput.value,
    desc: contacdescInput.value,
  };
  console.log(Contacts[currentContact]);
  addBtn.innerHTML = "Add Contact";
  localStorage.setItem("Contactlist", JSON.stringify(Contacts));


}


function addContact() {
  let contact = {
    name: contactNameInput.value,
    phone: contactPhoneInput.value,
    mail: contactMailInput.value,
    desc: contacdescInput.value,
  };
  Contacts.push(contact);
  localStorage.setItem("Contactlist", JSON.stringify(Contacts));
}

function displayContacts() {
  let container = "";
  for (let i = 0; i < Contacts.length; i++) {
    container += `<tr>
      <td> ${i + 1}</td>
       <td> ${Contacts[i].name}</td>
       <td> ${Contacts[i].phone}</td>
       <td> ${Contacts[i].mail}</td>
       <td> ${Contacts[i].desc}</td>
       <td><button  onclick="getContactInfo(${i})"  class="btn btn-warning"> Update </button> </td>
       <td><button onclick="deleteContacts(${i})" class="btn btn-danger"> Delete </button> </td>
      </tr>`;
  }
  contactTable.innerHTML = container;
}
function clearForm() {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}
function deleteContacts(index) {
  Contacts.splice(index, 1);
  localStorage.setItem("Contactlist", JSON.stringify(Contacts));
  displayContacts();
}

searchInput.onkeyup = function () {
  console.log(searchInput.value);
  let container = "";
  for (let i = 0; i < Contacts.length; i++) {
    if (
      Contacts[i].name.toLowerCase().includes(searchInput.value.toLowerCase())
    ) {
      container += `<tr>
      <td> ${i + 1}</td>
       <td> ${Contacts[i].name}</td>
       <td> ${Contacts[i].phone}</td>
       <td> ${Contacts[i].mail}</td>
       <td> ${Contacts[i].desc}</td>
       <td><button class="btn btn-warning"> Update </button> </td>
       <td><button onclick="deleteContacts(${i})" class="btn btn-danger"> Delete </button> </td>
      </tr>`;
    }
  }
  contactTable.innerHTML = container;
};

function getContactInfo(index) {
  currentContact = index;
  // console.log(currentProduct)
  contactNameInput.value = Contacts[index].name;
  contactPhoneInput.value = Contacts[index].phone;
  contactMailInput.value = Contacts[index].mail;
  contacdescInput.value = Contacts[index].desc;
  addBtn.innerHTML = "Update Contact";
}

