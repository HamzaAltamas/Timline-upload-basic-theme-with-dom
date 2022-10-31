let nameInput = document.querySelector(".user-name");
let postInput = document.querySelector(".post-txt");
let postBtn = document.querySelector(".post-btn");
let postTimeline = document.querySelector(".posts");
let feel = document.querySelectorAll(".feelings");
let feelArr = Array.from(feel);
let feelingStore = document.querySelector(".feeling-store");
let address = document.querySelectorAll(".location");
let addressArr = Array.from(address);
let addressStore = document.querySelector(".location-store");

let userInfo = [];

feelArr.map((items) => {
  items.addEventListener("click", () => {
    feelingStore.innerHTML = `feeling-${items.innerHTML}`;
  });
});

addressArr.map((items) => {
  items.addEventListener("click", () => {
    addressStore.innerHTML = ` at-${items.innerHTML}`;
  });
});

postBtn.addEventListener("click", () => {
  if (!nameInput.value && !postInput.value) {
    nameInput.placeholder = "Please Enter Your Name";
    postInput.placeholder = "Write Something";
  } else if (!nameInput.value) {
    nameInput.placeholder = "you cant skip your name";
  } else if (isFinite(nameInput.value) !== false) {
    nameInput.placeholder = "Enter a valid Name";
  } else {
    nameInput.placeholder = "What is your name?";
    postInput.placeholder = "What is on your mind?";
    userInfo.push({
      name: nameInput.value,
      post: postInput.value,
      feeling: feelingStore.innerHTML,
      address: addressStore.innerHTML,
    });
    posts();
  }

  nameInput.value = "";
  postInput.value = "";
  feelingStore.innerHTML = "";
  addressStore.innerHTML = "";
});

function posts() {
  postTimeline.innerHTML = "";

  userInfo.map((info) => {
    postTimeline.innerHTML += `<div class="card my-2">
              <div class="card-body">
                <h5 class="card-title">${info.name}</h5>
                <h6 class="feelingsTxt">${info.feeling}<span>${info.address}</span></h6>
                <p class="card-text">
                  ${info.post}. 
                </p>
                <button type="button" class="btn btn-primary editBtn"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
                <button type="button" class="btn btn-danger deleteBtn"><i class="fa-solid fa-trash"></i> Delete</button>
                <button type="button" class="btn btn-info shareBtn">
                <i class="fa-solid fa-share"></i> Share</button> <br />
                <div class="edit-box hide">
                <input
                  type="text"
                  class="edit-input mt-2"
                  placeholder="Edit your post"
                />
                 <button type="button" class="btn btn-success Update-btn"> <i class="fa-solid fa-pen"></i> Update</button>
                </div>
              </div>
            </div>`;
    let remove = document.querySelectorAll(".deleteBtn");
    let removeArr = Array.from(remove);

    editFunc();

    removeArr.map((button, index) => {
      button.addEventListener("click", () => {
        userInfo.splice(index, 1);
        posts();
      });
    });
    sharefunc();
  });

  console.log(userInfo);
}

// edit button functionality
function editFunc() {
  let editBox = document.querySelectorAll(".edit-box");
  let editBoxArr = Array.from(editBox);
  let editInput = document.querySelectorAll(".edit-input");
  let editInputArr = Array.from(editInput);
  let editBtn = document.querySelectorAll(".editBtn");
  let editBtnArr = Array.from(editBtn);
  let updatebtn = document.querySelectorAll(".Update-btn");
  let updatebtnArr = Array.from(updatebtn);

  editBtnArr.map((buttons, index) => {
    buttons.addEventListener("click", () => {
      editBoxArr[index].classList.toggle("hide");
    });
  });
  updatebtnArr.map((button, index) => {
    button.addEventListener("click", () => {
      userInfo[index].post = editInputArr[index].value;
      posts();
    });
  });
}

// share button functionality
function sharefunc() {
  let shareBtn = document.querySelectorAll(".shareBtn");
  let shareBtnArr = Array.from(shareBtn);
  shareBtnArr.map((button, index) => {
    button.addEventListener("click", () => {
      userInfo.unshift(userInfo[index]);
      posts();
    });
  });
}
