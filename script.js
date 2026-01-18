// Import Firebase modules
import { database, ref, set, get, push, remove, update, child } from './firebase-config.js';

// Initialize students array
let students = [];

// DOM Elements
const admissionForm = document.getElementById('admissionForm');
const studentsList = document.getElementById('studentsList');
const certificateModal = document.getElementById('certificateModal');
const certificateContent = document.getElementById('certificateContent');

// Load students from Firebase on page load
async function loadStudents() {
    try {
        const studentsRef = ref(database, 'students');
        const snapshot = await get(studentsRef);
        
        if (snapshot.exists()) {
            const data = snapshot.val();
            students = Object.keys(data).map(key => ({
                firebaseKey: key,
                ...data[key]
            }));
        } else {
            students = [];
        }
        window.studentsLoaded = true;
        displayStudents();
    } catch (error) {
        console.error('Error loading students:', error);
        window.studentsLoaded = true;
        alert('❌ Error loading students from database. Check console for details.');
    }
}

// Form submission handler
admissionForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(admissionForm);
    const student = {
        id: Date.now(),
        registrationNo: formData.get('registrationNo'),
        studentName: formData.get('studentName'),
        dob: formData.get('dob'),
        gender: formData.get('gender'),
        birthPlace: formData.get('birthPlace'),
        birthTaluka: formData.get('birthTaluka'),
        birthDistrict: formData.get('birthDistrict'),
        aadharNo: formData.get('aadharNo'),
        fatherName: formData.get('fatherName'),
        motherName: formData.get('motherName'),
        religion: formData.get('religion'),
        caste: formData.get('caste'),
        subCaste: formData.get('subCaste'),
        class: formData.get('class'),
        section: formData.get('section'),
        admissionDate: formData.get('admissionDate'),
        previousSchool: formData.get('previousSchool'),
        address: formData.get('address'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        dateAdded: new Date().toISOString()
    };
    
    // Check if registration number already exists
    const existingStudent = students.find(s => s.registrationNo === student.registrationNo);
    if (existingStudent) {
        alert('❌ A student with this registration number already exists!');
        return;
    }
    
    // Save to Firebase
    try {
        const studentsRef = ref(database, 'students');
        const newStudentRef = push(studentsRef);
        await set(newStudentRef, student);
        
        // Show success message
        alert('✅ Student admission saved successfully!');
        
        // Reset form
        admissionForm.reset();
        
        // Reload students and switch to students tab
        await loadStudents();
        showTab('students');
    } catch (error) {
        console.error('Error saving student:', error);
        alert('❌ Error saving student to database. Check console for details.');
    }
});

// Tab switching
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active class from all buttons (if any)
    const tabBtns = document.querySelectorAll('.tab-btn');
    if (tabBtns && tabBtns.length) {
        tabBtns.forEach(btn => btn.classList.remove('active'));
    }

    // Show selected tab
    if (tabName === 'home') {
        const homeTab = document.getElementById('home-tab');
        if (homeTab) homeTab.classList.add('active');
        if (tabBtns && tabBtns[0]) tabBtns[0].classList.add('active');
    } else if (tabName === 'admission') {
        const admissionTab = document.getElementById('admission-tab');
        if (admissionTab) admissionTab.classList.add('active');
        if (tabBtns && tabBtns[1]) tabBtns[1].classList.add('active');
    } else if (tabName === 'students') {
        const studentsTab = document.getElementById('students-tab');
        if (studentsTab) studentsTab.classList.add('active');
        if (tabBtns && tabBtns[2]) tabBtns[2].classList.add('active');
        displayStudents();
    }
}

// Display all students
function displayStudents() {
    if (students.length === 0) {
        studentsList.innerHTML = `
            <div class="empty-state">
                <h3>No Students Enrolled Yet</h3>
                <p>Add students using the admission form</p>
            </div>
        `;
        return;
    }
    
    studentsList.innerHTML = students.map(student => `
        <div class="student-card" data-id="${student.id}">
            <div class="student-info">
                <div class="info-item">
                    <span class="label">Registration No.</span>
                    <span class="value">${student.registrationNo}</span>
                </div>
                <div class="info-item">
                    <span class="label">Student Name</span>
                    <span class="value">${student.studentName}</span>
                </div>
                <div class="info-item">
                    <span class="label">Date of Birth</span>
                    <span class="value">${formatDate(student.dob)}</span>
                </div>
                <div class="info-item">
                    <span class="label">Gender</span>
                    <span class="value">${student.gender}</span>
                </div>
                <div class="info-item">
                    <span class="label">Birth Place</span>
                    <span class="value">${student.birthPlace}</span>
                </div>
                <div class="info-item">
                    <span class="label">Birth Taluka</span>
                    <span class="value">${student.birthTaluka}</span>
                </div>
                <div class="info-item">
                    <span class="label">Birth District</span>
                    <span class="value">${student.birthDistrict}</span>
                </div>
                <div class="info-item">
                    <span class="label">Aadhar No.</span>
                    <span class="value">${student.aadharNo}</span>
                </div>
                <div class="info-item">
                    <span class="label">Father's Name</span>
                    <span class="value">${student.fatherName}</span>
                </div>
                <div class="info-item">
                    <span class="label">Mother's Name</span>
                    <span class="value">${student.motherName}</span>
                </div>
                <div class="info-item">
                    <span class="label">Religion</span>
                    <span class="value">${student.religion}</span>
                </div>
                <div class="info-item">
                    <span class="label">Caste</span>
                    <span class="value">${student.caste}</span>
                </div>
                <div class="info-item">
                    <span class="label">Sub Caste</span>
                    <span class="value">${student.subCaste}</span>
                </div>
                <div class="info-item">
                    <span class="label">Class</span>
                    <span class="value">${student.class} - ${student.section}</span>
                </div>
                <div class="info-item">
                    <span class="label">Admission Date</span>
                    <span class="value">${formatDate(student.admissionDate)}</span>
                </div>
                ${student.previousSchool ? `
                <div class="info-item">
                    <span class="label">Previous School</span>
                    <span class="value">${student.previousSchool}</span>
                </div>
                ` : ''}
                <div class="info-item">
                    <span class="label">Address</span>
                    <span class="value">${student.address}</span>
                </div>
                <div class="info-item">
                    <span class="label">Contact</span>
                    <span class="value">${student.phone}</span>
                </div>
                ${student.email ? `
                <div class="info-item">
                    <span class="label">Email</span>
                    <span class="value">${student.email}</span>
                </div>
                ` : ''}
            </div>
            <div class="student-actions">
                <button class="btn btn-success" onclick="generateCertificate(${student.id})">
                    Generate LC
                </button>
                <button class="btn btn-primary" onclick="editStudent(${student.id})">
                    Edit
                </button>
                <button class="btn btn-danger" onclick="deleteStudent(${student.id})">
                    Delete
                </button>
            </div>
        </div>
    `).join('');
}

// Search/Filter students
function filterStudents() {
    const searchTerm = document.getElementById('searchStudent').value.toLowerCase();
    const studentCards = document.querySelectorAll('.student-card');
    
    studentCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            card.style.display = 'grid';
        } else {
            card.style.display = 'none';
        }
    });
}

// Export students to CSV
function exportToCSV() {
    if (students.length === 0) {
        alert('❌ No students to export!');
        return;
    }

    // Define CSV headers
    const headers = [
        'Registration No',
        'Student Name',
        'Date of Birth',
        'Gender',
        'Birth Place',
        'Birth Taluka',
        'Birth District',
        'Aadhar Number',
        'Father Name',
        'Mother Name',
        'Religion',
        'Caste',
        'Sub Caste',
        'Class',
        'Section',
        'Admission Date',
        'Previous School',
        'Address',
        'Phone',
        'Email',
        'Date Added'
    ];

    // Convert students data to CSV rows
    const csvRows = [];
    csvRows.push(headers.join(','));

    students.forEach(student => {
        const row = [
            `"${student.registrationNo || ''}"`,
            `"${student.studentName || ''}"`,
            `"${student.dob || ''}"`,
            `"${student.gender || ''}"`,
            `"${student.birthPlace || ''}"`,
            `"${student.birthTaluka || ''}"`,
            `"${student.birthDistrict || ''}"`,
            `"${student.aadharNo || ''}"`,
            `"${student.fatherName || ''}"`,
            `"${student.motherName || ''}"`,
            `"${student.religion || ''}"`,
            `"${student.caste || ''}"`,
            `"${student.subCaste || ''}"`,
            `"${student.class || ''}"`,
            `"${student.section || ''}"`,
            `"${student.admissionDate || ''}"`,
            `"${student.previousSchool || ''}"`,
            `"${student.address || ''}"`,
            `"${student.phone || ''}"`,
            `"${student.email || ''}"`,
            `"${student.dateAdded || ''}"`
        ];
        csvRows.push(row.join(','));
    });

    // Create CSV string
    const csvContent = csvRows.join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    const today = new Date().toISOString().split('T')[0];
    link.setAttribute('href', url);
    link.setAttribute('download', `students_export_${today}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert(`✅ Successfully exported ${students.length} students to CSV!`);
}

// Mobile nav toggle
function toggleNav() {
    const nav = document.querySelector('.main-nav');
    nav.classList.toggle('open');
}

// Close mobile nav when clicking outside
window.addEventListener('click', function(e) {
    const nav = document.querySelector('.main-nav');
    if (!nav) return;
    if (!nav.contains(e.target) && nav.classList.contains('open')) {
        nav.classList.remove('open');
    }
});

// Delete student
async function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student record?')) {
        try {
            const studentToDelete = students.find(s => s.id === id);
            if (studentToDelete && studentToDelete.firebaseKey) {
                const studentRef = ref(database, `students/${studentToDelete.firebaseKey}`);
                await remove(studentRef);
                await loadStudents();
            } else {
                alert('❌ Error: Student not found!');
            }
        } catch (error) {
            console.error('Error deleting student:', error);
            alert('❌ Error deleting student from database. Check console for details.');
        }
    }
}

// Generate leaving certificate
function generateCertificate(id) {
    const student = students.find(s => s.id === id);
    if (!student) {
        alert('❌ Student not found!');
        return;
    }
    
    // Calculate age
    const age = calculateAge(student.dob);
    const admissionYear = new Date(student.admissionDate).getFullYear();
    const currentYear = new Date().getFullYear();
    
    const certificate = `
        <div class="certificate">
            <div class="certificate-header">
                <h1>SCHOOL NAME</h1>
                <h2>LEAVING CERTIFICATE</h2>
                <p style="margin-top: 10px; font-style: italic;">School Address, City, State - PIN Code</p>
            </div>
            
            <div class="certificate-body">
                <p style="text-align: right; font-weight: bold;">Certificate No: LC/${student.registrationNo}/${currentYear}</p>
                <p style="text-align: right;">Date: ${formatDate(new Date().toISOString().split('T')[0])}</p>
                
                <p>This is to certify that <strong>${student.studentName}</strong>, 
                Son/Daughter of <strong>${student.fatherName}</strong> and <strong>${student.motherName}</strong>, 
                was a bonafide student of this institution.</p>
                
                <p><strong>Registration Number:</strong> ${student.registrationNo}</p>
                
                <p><strong>Date of Birth:</strong> ${formatDate(student.dob)} (Age: ${age} years)</p>
                
                <p><strong>Birth Place:</strong> ${student.birthPlace}, ${student.birthTaluka}, ${student.birthDistrict}</p>
                
                <p><strong>Aadhar Number:</strong> ${student.aadharNo}</p>
                
                <p><strong>Religion:</strong> ${student.religion} | <strong>Caste:</strong> ${student.caste} | <strong>Sub Caste:</strong> ${student.subCaste}</p>
                
                <p><strong>Date of Admission:</strong> ${formatDate(student.admissionDate)}</p>
                
                <p><strong>Class Last Studied:</strong> ${student.class} (Section: ${student.section})</p>
                
                <p><strong>Date of Leaving:</strong> ${formatDate(new Date().toISOString().split('T')[0])}</p>
                
                ${student.previousSchool ? `<p><strong>Previous School:</strong> ${student.previousSchool}</p>` : ''}
                
                <p><strong>Gender:</strong> ${student.gender}</p>
                
                <p><strong>Address:</strong> ${student.address}</p>
                
                <p><strong>Contact Number:</strong> ${student.phone}</p>
                
                ${student.email ? `<p><strong>Email:</strong> ${student.email}</p>` : ''}
                
                <p style="margin-top: 20px;">The student has been regular in attendance and their conduct has been satisfactory. 
                They are leaving the school at the request of their parents/guardians.</p>
                
                <p>We wish them all the best for their future endeavors.</p>
            </div>
            
            <div class="certificate-footer">
                <div class="signature-block">
                    <div class="signature-line">Class Teacher</div>
                </div>
                <div class="signature-block">
                    <div class="signature-line">Principal</div>
                </div>
            </div>
        </div>
    `;
    
    certificateContent.innerHTML = certificate;
    certificateModal.style.display = 'block';
}

// Calculate age from date of birth
function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

// Format date to DD/MM/YYYY
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Close modal
function closeModal() {
    certificateModal.style.display = 'none';
}

// Print certificate
function printCertificate() {
    window.print();
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target === certificateModal) {
        closeModal();
    }
    if (event.target === document.getElementById('editModal')) {
        closeEditModal();
    }
}

// Edit student functionality
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');

function editStudent(id) {
    const student = students.find(s => s.id === id);
    if (!student) {
        alert('❌ Student not found!');
        return;
    }
    
    // Populate edit form
    document.getElementById('editStudentId').value = student.id;
    document.getElementById('editRegistrationNo').value = student.registrationNo;
    document.getElementById('editStudentName').value = student.studentName;
    document.getElementById('editDob').value = student.dob;
    document.getElementById('editGender').value = student.gender;
    document.getElementById('editBirthPlace').value = student.birthPlace;
    document.getElementById('editBirthTaluka').value = student.birthTaluka;
    document.getElementById('editBirthDistrict').value = student.birthDistrict;
    document.getElementById('editAadharNo').value = student.aadharNo;
    document.getElementById('editFatherName').value = student.fatherName;
    document.getElementById('editMotherName').value = student.motherName;
    document.getElementById('editReligion').value = student.religion;
    document.getElementById('editCaste').value = student.caste;
    document.getElementById('editSubCaste').value = student.subCaste;
    document.getElementById('editClass').value = student.class;
    document.getElementById('editSection').value = student.section;
    document.getElementById('editAdmissionDate').value = student.admissionDate;
    document.getElementById('editPreviousSchool').value = student.previousSchool || '';
    document.getElementById('editAddress').value = student.address;
    document.getElementById('editPhone').value = student.phone;
    document.getElementById('editEmail').value = student.email || '';
    
    // Show edit modal
    editModal.style.display = 'block';
}

function closeEditModal() {
    editModal.style.display = 'none';
}

// Handle edit form submission
editForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(editForm);
    const studentId = parseInt(document.getElementById('editStudentId').value);
    const registrationNo = formData.get('registrationNo');
    
    // Check if registration number is taken by another student
    const existingStudent = students.find(s => s.registrationNo === registrationNo && s.id !== studentId);
    if (existingStudent) {
        alert('❌ This registration number is already taken by another student!');
        return;
    }
    
    // Find student
    const studentData = students.find(s => s.id === studentId);
    if (!studentData) {
        alert('❌ Student not found!');
        return;
    }
    
    // Update student data
    const updatedStudent = {
        id: studentData.id,
        registrationNo: formData.get('registrationNo'),
        studentName: formData.get('studentName'),
        dob: formData.get('dob'),
        gender: formData.get('gender'),
        birthPlace: formData.get('birthPlace'),
        birthTaluka: formData.get('birthTaluka'),
        birthDistrict: formData.get('birthDistrict'),
        aadharNo: formData.get('aadharNo'),
        fatherName: formData.get('fatherName'),
        motherName: formData.get('motherName'),
        religion: formData.get('religion'),
        caste: formData.get('caste'),
        subCaste: formData.get('subCaste'),
        class: formData.get('class'),
        section: formData.get('section'),
        admissionDate: formData.get('admissionDate'),
        previousSchool: formData.get('previousSchool'),
        address: formData.get('address'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        dateAdded: studentData.dateAdded || new Date().toISOString()
    };
    
    // Save to Firebase
    try {
        if (studentData.firebaseKey) {
            const studentRef = ref(database, `students/${studentData.firebaseKey}`);
            await update(studentRef, updatedStudent);
            
            // Show success message
            alert('✅ Student details updated successfully!');
            
            // Close modal and refresh display
            closeEditModal();
            await loadStudents();
        } else {
            alert('❌ Error: Student reference not found!');
        }
    } catch (error) {
        console.error('Error updating student:', error);
        alert('❌ Error updating student in database. Check console for details.');
    }
});

// Initialize display on page load - load immediately
loadStudents();

window.addEventListener('DOMContentLoaded', function() {
    // Page elements ready
});

// Expose functions to global scope for HTML onclick handlers
window.showTab = showTab;
window.filterStudents = filterStudents;
window.exportToCSV = exportToCSV;
window.toggleNav = toggleNav;
window.deleteStudent = deleteStudent;
window.generateCertificate = generateCertificate;
window.editStudent = editStudent;
window.closeEditModal = closeEditModal;
window.closeModal = closeModal;
window.printCertificate = printCertificate;

const animatedElements = document.querySelectorAll('.service-card, .feature-card, .testimonial-card, .features-section, .specialty-section, .tech-card, .keyfeature-item');
animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    if (typeof observer !== 'undefined') {
        observer.observe(element);
    }
});
