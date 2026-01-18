# School Management System

A comprehensive web-based school management system for managing student admissions, records, and generating official leaving certificates.

## 🌟 Features

- **📝 Digital Admission**: Efficient online admission form with comprehensive student information collection
- **💾 Secure Storage**: All student data is securely stored in Firebase Realtime Database
- **🎓 LC Generation**: Automatically generate professional leaving certificates from admission records
- **✏️ Easy Editing**: Update student information anytime to maintain accurate records
- **🔍 Quick Search**: Find student records instantly with powerful search functionality
- **🖨️ Print Ready**: Professional print-ready documents formatted for official use (Letter size, 8.5" x 11")
- **📊 Export to CSV**: Export all student data to Excel/CSV format

## 🚀 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Database**: Firebase Realtime Database
- **Styling**: Custom CSS with responsive design
- **Icons**: Font Awesome 6.5.0

## 📋 Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Internet connection (for Firebase)
- A local web server for development (e.g., Live Server, http-server)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/school-management-system.git
cd school-management-system
```

2. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Realtime Database
   - Update `firebase-config.js` with your Firebase credentials

3. Run a local server:
```bash
# Using npx http-server
npx http-server -p 8080

# Or using Python
python -m http.server 8080

# Or use VS Code Live Server extension
```

4. Open your browser and navigate to:
```
http://localhost:8080
```

## 📁 Project Structure

```
SPS/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet
├── script.js           # Main JavaScript file
├── firebase-config.js  # Firebase configuration
├── images/             # Image assets
│   ├── logo.png
│   ├── group.png
│   └── Karmaveer bhausaheb hiray.jpg
└── README.md           # Project documentation
```

## 🎯 Usage

### Adding a New Student
1. Click on "Add New Student" button
2. Fill in all required fields in the admission form
3. Click "Save Admission" to store the student record

### Viewing Students
1. Click on "View All Students" button
2. Use the search box to filter students by name or registration number
3. Export data to CSV using the "Export to Excel" button

### Generating Leaving Certificate
1. Navigate to the student list
2. Click "LC" button next to the student's record
3. Review the certificate
4. Click "Print Certificate" to print

### Editing Student Information
1. Find the student in the student list
2. Click "Edit" button
3. Update the required fields
4. Click "Update Student" to save changes

### Deleting a Student
1. Find the student in the student list
2. Click "Delete" button
3. Confirm the deletion

## 🔐 Firebase Security

**Important**: Before deploying to production:
1. Set up Firebase Security Rules to restrict unauthorized access
2. Enable authentication if needed
3. Consider using environment variables for sensitive configuration

Example Security Rules:
```json
{
  "rules": {
    "students": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile devices

## 🖨️ Print Features

Leaving Certificates are formatted for:
- Paper size: Letter (8.5" x 11")
- Orientation: Portrait
- Margins: 0.4 inches
- Clean, professional layout with school branding

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Mahatma Gandhi Vidyamandir's Marathi Adhyapak Vidyalay Attached Saravpath Shala, Malegaon Camp

## 🙏 Acknowledgments

- Firebase for the backend infrastructure
- Font Awesome for the icons
- The open-source community

## 📞 Support

For support, please open an issue in the GitHub repository.

---

Made with ❤️ for education
