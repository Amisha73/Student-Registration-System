document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addStudent();
});
// local storage for data
let students = JSON.parse(localStorage.getItem('students')) || [];

function addStudent() {
    // take all input by id's value
    const name = document.getElementById('studentName').value;
    const id = document.getElementById('studentID').value;
    const email = document.getElementById('emailID').value;
    const contact = document.getElementById('contactNo').value;

    if (!validateInputs(name, id, email, contact)) return;

    const student = { name, id, email, contact };
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
    document.getElementById('studentForm').reset();
}
// checking the input of all the input form is in correct form or not -- function
function validateInputs(name, id, email, contact) {
    const idPattern = /^[0-9]+$/;
    const contactPattern = /^[0-9]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.match(/^[a-zA-Z\s]+$/)) {
        alert("Name must contain only letters.");
        return false;
    }
    if (! id.match(idPattern)) {
        alert("Student ID must be numeric.");
        return false;
    }
    if (!email.match(emailPattern)) {
        alert("Please enter a valid email address.");
        return false;
    }
    if (!contact.match(contactPattern)) {
        alert("Contact number must be numeric.");
        return false;
    }
    return true;
}

function displayStudents() {
    const recordsBody = document.getElementById('recordsBody');
    recordsBody.innerHTML = '';
    students.forEach((student, index) => {
        // make a new table for all the data 
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        // add data in form of row in table
        recordsBody.appendChild(row);
    });
}
// function for edit the data in table
function editStudent(index) {
    const student = students[index];
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentID').value = student.id;
    document.getElementById('emailID').value = student.email;
    document.getElementById('contactNo').value = student.contact;
    deleteStudent(index);
}

function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
}

// Initial display of students
displayStudents();