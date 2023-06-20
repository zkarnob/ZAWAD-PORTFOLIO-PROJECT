/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}

showMenu('nav-toggle','nav-menu')

/* ===== RESUME BUTTON =====*/
const navLink = document.querySelectorAll('.nav__link')
document.getElementById('open-pdf-button').addEventListener('click', function(event) {
    event.preventDefault();
  
    
    const pdfFilePath = 'assets/pdf/resume.pdf';
  
    window.open(pdfFilePath);
  });
  // Load the Google Sheets API
gapi.load('client', initGoogleSheetsAPI);

// Initialize the Google Sheets API
function initGoogleSheetsAPI() {
  gapi.client.init({
    apiKey: 'YOUR_API_KEY',
    discoveryDocs: ['https://docs.google.com/spreadsheets/d/1EqSLCq_XaVN6jMRWCRRX5eYRj1vRi8YdfHunM7XgqF4/edit?usp=sharing'],
  }).then(() => {
    console.log('Google Sheets API initialized');
    document.getElementById('contact-form').addEventListener('submit', submitForm);
  }).catch((error) => {
    console.error('Error initializing Google Sheets API:', error);
  });
}

// Handle form submission
function submitForm(event) {
  event.preventDefault();

  const name = document.getElementById('name-input').value;
  const email = document.getElementById('email-input').value;
  const message = document.getElementById('message-input').value;

  // Add your Google Sheets spreadsheet ID and sheet name
  const spreadsheetId = 'YOUR_SPREADSHEET_ID';
  const sheetName = 'Sheet1';

  // Prepare the row data to be written to the spreadsheet
  const rowData = [name, email, message];

  // Call the Google Sheets API to append the data to the spreadsheet
  gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId,
    range: sheetName,
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [rowData]
    }
  }).then((response) => {
    console.log('Form data submitted successfully');
    document.getElementById('contact-form').reset();
  }).catch((error) => {
    console.error('Error submitting form data:', error);
  });
}

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Show the message
    const messageContainer = document.getElementById('message-container');
    messageContainer.textContent = 'Submitted';
    messageContainer.style.display = 'block';
  
    // Reset the form fields
    document.getElementById('name-input').value = '';
    document.getElementById('email-input').value = '';
    document.getElementById('message-input').value = '';
  });


function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

/* ===== SKill =====*/
sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 

