function getFormValues() {
    
    var operationIdex = document.getElementById("opIndex").value;
    if(validateData()) {
        if(operationIdex == "ADD") {
            addContacts();
        } else if(operationIdex == "EDIT") {
            updateContacts();
        }
    }
        
}
         
function cancelupdate() {
    var modal = document.getElementById('myModal');
    modal.style.display = "none";    
}

function addContacts(){
    if(!this.contactArray) {
        contactArray = [];
    }
    
    var firstname = document.getElementById("fName").value;
    var lastname = document.getElementById("lName").value;
    var email = document.getElementById("email").value;
    var phoneNumber = document.getElementById("phnNumber").value;
    var status = document.getElementById("status").checked;

    var contactObj = {
            firstName : firstname,
            lastName : lastname,
            email : email,
            phoneNumber : phoneNumber,
            status : status ? "Active" : "Inactive"
    };

    this.contactArray.push(contactObj);
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
    getContactList(this.contactArray);

}
function updateContacts() {

    var editIndex = document.getElementById("editIndex").value;
    
    this.contactArray[editIndex].firstName = document.getElementById("fName").value;
    this.contactArray[editIndex].lastName = document.getElementById("lName").value;
    this.contactArray[editIndex].email = document.getElementById("email").value;
    this.contactArray[editIndex].phoneNumber = document.getElementById("phnNumber").value;
    this.contactArray[editIndex].status = document.getElementById("status").checked  ? "Active" : "Inactive";
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
    getContactList(this.contactArray);
}

function getContactList(contactArr) {
    var count = 0;
    var contactListDive = "";
    
        for(i in contactArr) {
            count++;
            contactListDive += `
                    <div class="row hoverDiv row${contactArr[i].status}">
                    <div class="left" id="fname">${count}</div>
                    <div class="left" id="fname">${contactArr[i].firstName}</div>
                    <div class="middle" id="lname">${contactArr[i].lastName}</div>
                    <div class="middle" id="email">${contactArr[i].email}</div>
                    <div class="middle" id="phnNumber">${contactArr[i].phoneNumber}</div>
                    <div class="middle" id="fname">${contactArr[i].status}</div>
                    <div class="right textCenterAlign">                   
                        <button class="btn" id="${i}" onclick="editContact(this.id);"><i class="fa fa-edit"></i></button> 
                        <button class="btn"  id="${i}" onclick="alertdeleteContact(this.id);"><i class="fa fa-trash"></i></button>
                        
                    </div>
                    </div>`;
        }
    

    document.getElementById("contactListContainer").innerHTML = contactListDive;
    popupHandler();
}

function canceldelete() {

    var delmodal = document.getElementById('myDeleteModal');
    delmodal.style.display = "none";
}

function alertdeleteContact(index) {    
    document.getElementById('deleteIndex').value = index;
    var delmodal = document.getElementById('myDeleteModal');
    delmodal.style.display = "block";    
}

function deleteContact() {
    var index = document.getElementById('deleteIndex').value;    
    delete this.contactArray[index];
    var delmodal = document.getElementById('myDeleteModal');
    delmodal.style.display = "none";
    getContactList(this.contactArray);
}

function editContact(index) {

    document.getElementById("editIndex").value = index;
    document.getElementById("opIndex").value = "EDIT";

    document.getElementById("fName").value = this.contactArray[index].firstName;
    document.getElementById("lName").value = this.contactArray[index].lastName;
    document.getElementById("email").value = this.contactArray[index].email;
    document.getElementById("phnNumber").value = this.contactArray[index].phoneNumber;
   // document.getElementById("phnNumber").value = this.contactArray[index].phoneNumber;
    if(this.contactArray[index].status == "Active") {
        document.getElementById("status").checked = true;    
    } else {
        document.getElementById("status").value = false;
    }
    
    document.getElementById("addButton").style.display = "none";
    document.getElementById("editButton").style.display = "block";
    var modal = document.getElementById('myModal');
    modal.style.display = "block";
}

function resetForm(){
    document.getElementById("editIndex").value = "";
    document.getElementById("opIndex").value = "ADD";
    document.getElementById("status").checked = true; // by default checked while adding
    document.getElementById("fName").value = "";
    document.getElementById("lName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phnNumber").value = "";
    document.getElementById("submit").value = "Submit";
    
}

function popupHandler(){
    
    
var modal = document.getElementById('myModal');


var btn = document.getElementById("myBtn");


var span = document.getElementsByClassName("close")[0];

 
btn.onclick = function() {
    modal.style.display = "block";
    document.getElementById("editButton").style.display = "none";
    document.getElementById("addButton").style.display = "block";
    resetForm();
}


span.onclick = function() {
    modal.style.display = "none";
}


}

function validateData() {

    var firstName = document.getElementById("fName").value;
    var lastName = document.getElementById("lName").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phnNumber").value;
    var isFormValid =  true;
    
    if(firstName == "" || firstName == null) {
        document.getElementById('fnameError').innerHTML = "First name should not be blank";
        document.getElementById('fnameError').style.display = "block";
        isFormValid = false;
    } else if(!((/^[a-zA-Z_\-]+$/).test(firstName))) {
        document.getElementById('fnameError').innerHTML = "Space and special chanracter not allowed in firstname";
        document.getElementById('fnameError').style.display = "block";
        isFormValid = false;
    } else {
        document.getElementById('fnameError').style.display = "none";
    }
    if(lastName == "" || lastName == null) {
        document.getElementById('lnameError').innerHTML = "Last name should not be blank";
        document.getElementById('lnameError').style.display = "block";
        isFormValid = false;
    } else if(!((/^[a-zA-Z_\-]+$/).test(lastName))) {
        document.getElementById('lnameError').innerHTML = "Space and special chanracter not allowed in Last name";
        document.getElementById('lnameError').style.display = "block";
        isFormValid = false;
    } else {
        document.getElementById('lnameError').style.display = "none";
    }
    if (email == "" || email == null) {
        document.getElementById('emailError').innerHTML = "Email should not be blank";
        document.getElementById('emailError').style.display = "block";
        isFormValid = false;        
    } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email)) {
        document.getElementById('emailError').innerHTML = "Please enter a valid email";
        document.getElementById('emailError').style.display = "block";
        isFormValid = false;        
    } else {
        document.getElementById('emailError').style.display = "none";
    }
    if(phone == "" || phone == null){
        document.getElementById('phnNumberError').innerHTML = "Phone number should be blank";
        document.getElementById('phnNumberError').style.display = "block";
        isFormValid = false;        
    } else if(isNaN(phone)){
        document.getElementById('phnNumberError').innerHTML = "Phone number should be numeric";
        document.getElementById('phnNumberError').style.display = "block";
        isFormValid = false;
    } else if(phone.length < 5 || phone.length > 10 ){
        document.getElementById('phnNumberError').innerHTML = "Phone number should be min 5 and max 10 dijit";
        document.getElementById('phnNumberError').style.display = "block";
        isFormValid = false;
    } else {
        document.getElementById('phnNumberError').style.display = "none";
    }
    

    return isFormValid;
}