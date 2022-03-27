console.log("Welcome to notes app. This is app.js");
showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";

  let titi = document.getElementById("addTitle");
  let tit = localStorage.getItem("tit");
  if (tit == null) {
    titObj = [];
  } else {
    titObj = JSON.parse(tit);
  }
  titObj.push(titi.value);
  localStorage.setItem("tit", JSON.stringify(titObj));
  titi.value = "";
//   console.log(notesObj);
  showNotes();
});





// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }


  let tit = localStorage.getItem("tit");
  if (tit == null) {
    titObj = [];
  } else {
    titObj = JSON.parse(tit);
  }
  let html = "";
  notesObj.forEach(function(element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" id="${index}" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${titObj[index]}</h5>
                        <p class="card-text"> ${element}</p>
                        <button onclick="deleteNote(${index})" class="btn btn-primary">Delete Note</button>
                        <button onclick="markImp(${index})" class="btn btn-primary">Mark Imp</button>
                    </div>
                </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

//Fucntion to mark important

function markImp(index)
{
  let el=document.getElementById(index);
  el.style.background='orange';
}



// Function to delete a note
function deleteNote(index) {
//   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));

  let tit = localStorage.getItem("tit");
  if (tit == null) {
    titObj = [];
  } else {
    titObj = JSON.parse(tit);
  }

  titObj.splice(index, 1);
  localStorage.setItem("tit", JSON.stringify(titObj));

  showNotes();
}


let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})