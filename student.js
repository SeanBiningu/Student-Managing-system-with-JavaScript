// Get Elements
const studentForm = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");
const totalStudents = document.getElementById("totalStudents");  //It finds elements in your HTML page and stores them in variables so you can use them later in your code.
const search = document.getElementById("search");

// Load students from Local Storage
let students = JSON.parse(localStorage.getItem("students")) || [];

// Used when editing
let editIndex = -1;

// Display Students

function displayStudents(list = students) {

    studentTable.innerHTML = "";

    list.forEach((student, index) => {

        studentTable.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.course}</td>
                <td>${student.phone}</td>

                <td>
                    <button class="edit-btn" onclick="editStudent(${index})">
                        Edit
                    </button>

                    <button class="delete-btn" onclick="deleteStudent(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });

    totalStudents.textContent = students.length;

    localStorage.setItem("students", JSON.stringify(students));
}

// Add Student

studentForm.addEventListener("submit", function (e) {

    e.preventDefault();//This code captures user input from a form and prepares it for processing without refreshing the page.

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const course = document.getElementById("course").value.trim();
    const phone = document.getElementById("phone").value.trim();        //trim() is a string method used to remove extra spaces at the beginning and end of a text.

    if (name === "" || email === "" || course === "" || phone === "") {
        alert("Please fill in all fields.");  //“Is name empty OR email empty OR course empty OR phone empty?”
        return;
    }

    // Edit existing student
    if (editIndex !== -1) {

        students[editIndex] = {
            ...students[editIndex],
            name,
            email,
            course,
            phone
        };

        editIndex = -1;

    } else {

        const student = {
            id: "STU" + (Date.now()).toString().slice(-4),
            name,
            email,
            course,
            phone
        }; 
 //If editIndex !== -1, it means you are editing an existing student, so it updates that student in the array with the new name, email, course, phone, then resets editIndex back to -1.
//If editIndex === -1, it means you are adding a new student, so it creates a new student object with a unique id and the form va

        students.push(student);
    }

    studentForm.reset();

    displayStudents();
});


// Delete Student

function deleteStudent(index) {

    if (confirm("Delete this student?")) {

        students.splice(index, 1);

        displayStudents();
    }
}//This function asks the user for confirmation, removes the selected student from the array, and then updates the screen to reflect the change.


// Edit Student

function editStudent(index) {

    const student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("email").value = student.email;     //This function loads a student’s data into the form, sets the app into edit mode, and scrolls to the top so you can update the student easily.
    document.getElementById("course").value = student.course;  
    document.getElementById("phone").value = student.phone;

    editIndex = index;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Search Student

search.addEventListener("keyup", function () {

    const keyword = search.value.toLowerCase();

    const filteredStudents = students.filter(student =>

        student.name.toLowerCase().includes(keyword) ||
        student.email.toLowerCase().includes(keyword) ||
        student.course.toLowerCase().includes(keyword) ||
        student.phone.toLowerCase().includes(keyword)
    );

    displayStudents(filteredStudents);

});


// full Load

displayStudents();