console.log("js loaded");
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const csrftoken = getCookie("csrftoken");

const complete_buttons = document.querySelectorAll(".complete-button");

for (let complete_button of complete_buttons) {
  complete_button.addEventListener("click", (event) => {
    console.log("completed");
    let incompleteTaskDiv = complete_button.closest("div");
    console.log(`task parent div: ${incompleteTaskDiv}`);
    let incompleteTask = incompleteTaskDiv.firstElementChild;
    console.log(`incomplete task: ${incompleteTask}`);
    incompleteTask.classList.add("completed");
    complete_button.remove();

    fetch(`task/complete/${complete_button.dataset.taskPk}`, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRFToken": csrftoken,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  });
}

const form = document.querySelector("#create-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("submitted");
  console.log(form);
  const formData = new FormData(form);

  for (let pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }
  fetch("tasks/create_new", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRFToken": csrftoken,
    },
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const task = document.querySelector("#task-list");
      let newCard = document.createElement("div");
      let newEl = document.createElement("p");
      let detailsTitle = document.createElement("h5");
      let details = document.createElement("p");
      let button = document.createElement("button");
      button.classList.add("complete-button");
      newEl.innerText = `${data.task_title}`;
      detailsTitle.innerText = "Details:";
      details.innerText = `${data.task_details}`;
      button.innerText = "Complete";
      task.appendChild(newCard);
      newCard.appendChild(newEl);
      newCard.appendChild(detailsTitle);
      newCard.appendChild(details);
      newCard.appendChild(button);
      newCard.classList.add("task-item", `_${data.task_importance}`);

      // create new complete button

      button.addEventListener("click", (event) => {
        console.log("completed");
        let incompleteTaskDiv = button.closest("div");
        console.log(`task parent div: ${incompleteTaskDiv}`);
        let incompleteTask = incompleteTaskDiv.firstElementChild;
        console.log(`incomplete task: ${incompleteTask}`);
        incompleteTask.classList.add("completed");
        button.remove();

        fetch(`task/complete/${button.dataset.task_pk}`, {
          method: "GET",
          credentials: "same-origin",
          headers: {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRFToken": csrftoken,
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
          });
      });
    });
});
