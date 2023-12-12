function deleteCandidate(candidateID){
    if (confirm("Are you sure you want to remove this candidate?")) {
        // If the user confirms, call your deleteContent function
        fetch("/delete-candidate", {
            method: "POST",
            body: JSON.stringify({candidateID:candidateID})
        }) .then((_res) => {
            window.location.href = "/candidates";
        });
    } else {
        // If the user cancels, do nothing
    }

}


// Get the modal and buttons
const openFormButton = document.getElementById("openFormButton");
const popupForm = document.getElementById("myModal");
const nextButton = document.getElementById("nextButton");

// Show the popup form when the open button is clicked
openFormButton.addEventListener("click", function() {
    //popupForm.style.display = "block";
    openModal();
});


// Close the popup form when clicking outside the form
window.addEventListener("click", function(event) {
    if (event.target === popupForm) {
        popupForm.style.display = "none";
    }
});


// Function to show the modal
function openModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
    console.log("+++++++++++++++")
    // When the user clicks on the close button, close the modal
    const closeModalBtn = document.getElementById('closeModal');
    closeModalBtn.addEventListener('click', function() {
      modal.style.display = 'none';
    });
    

  
    // When the user submits the form, you can access the input values
    const detailsForm = document.getElementById('screenDetails');
    detailsForm.addEventListener('submit', function(event) {
      event.preventDefault();
      console.log("------------")
      
      const name = document.getElementById('name').value;
      const contact = document.getElementById('contact').value;
      const email = document.getElementById('email').value;
      const notes = document.getElementById('notes').value;
        
      addCandidate(name, contact, email, notes);
  
      // Close the modal
      modal.style.display = 'none';
    });
  }

//Add Candidate to Database
  function addCandidate(name, contact, email, notes, file){
    console.log("Add Candidate Working")
    const data = {name: name, contact: contact, email: email, notes:notes }
    fetch("/add-candidate", {
        method: "POST",
        body: JSON.stringify(data)
    }) .then((_res) => {
        window.location.href = "/candidates";
    });
}
  

document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle-notes');
    const overlay = document.querySelectorAll('.overlay');
    const notesForms = document.querySelectorAll('.candidate-notes');
    const updateButtons = document.querySelectorAll('.update-notes');
    const editButtons = document.querySelectorAll(".edit-candidate");
    const closeEditButtons = document.querySelectorAll(".close-edit");
    const updateEditButtons = document.querySelectorAll(".update-edit");

    toggleButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const candidateId = this.getAttribute('data-candidate-id');
            const notesDiv = document.getElementById(`candidateNotes-${candidateId}`);

            if (notesDiv.style.display === 'block') {
                notesDiv.style.display = 'none';
            } else {
                notesDiv.style.display = 'block';
            }

            document.getElementById(`overlay-${candidateId}`).style.display = notesDiv.style.display;
        });
    });

    updateButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const candidateId = this.getAttribute('data-candidate-id');
            const notesContent = document.getElementById(`notes_area-${candidateId}`).innerText;

            // Here you can send the updated notesContent to the server
            // For demonstration purposes, we'll log it to the console
            
            const data = {id:candidateId, notes:notesContent }
            fetch("/update-notes", {
                method: "POST",
                body: JSON.stringify(data)
            }) .then((_res) => {
                window.location.href = "/candidates";
            });
            console.log(`Updated notes for candidate ${candidateId}: ${notesContent}`);
            // You may want to update the candidate.notes on the server and then update the UI accordingly
            // For demonstration purposes, we'll update the UI directly
            document.getElementById(`candidateNotes-${candidateId}`).style.display = 'none';
            document.getElementById(`overlay-${candidateId}`).style.display = 'none';
        });
    });

    // Candidates Edition

    editButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const candidateId = this.getAttribute('data-candidate-id');
            document.getElementById(`editOverlay-${candidateId}`).style.display = 'block';
            document.getElementById(`editForm-${candidateId}`).style.display = 'block';
        });
    });

    closeEditButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const candidateId = this.getAttribute('data-candidate-id');
            document.getElementById(`editOverlay-${candidateId}`).style.display = 'none';
            document.getElementById(`editForm-${candidateId}`).style.display = 'none';
        });
    });

    updateEditButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const candidateId = this.getAttribute('data-candidate-id');

            // Fetch the updated details from the edit form
            const updatedName = document.getElementById(`editName-${candidateId}`).value;
            const updatedContact = document.getElementById(`editContact-${candidateId}`).value;
            const updatedEmail = document.getElementById(`editEmail-${candidateId}`).value;

            // Here you can send the updated details to the server
            // For demonstration purposes, we'll log it to the console
            const data = {id:candidateId, name: updatedName, contact:updatedContact, email:updatedEmail  }
            fetch("/update-candidate", {
                method: "POST",
                body: JSON.stringify(data)
            }) .then((_res) => {
                window.location.href = "/candidates";
            });
            console.log(`Updated details for candidate ${candidateId}: Name - ${updatedName}, Contact - ${updatedContact}, Email - ${updatedEmail}`);

            // You may want to update the candidate details on the server and then update the UI accordingly
            // For demonstration purposes, we'll update the UI directly
            document.getElementById(`editOverlay-${candidateId}`).style.display = 'none';
            document.getElementById(`editForm-${candidateId}`).style.display = 'none';
        });
    });
});








