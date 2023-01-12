console.log('js loaded');
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const csrftoken = getCookie('csrftoken');

const complete_buttons = document.querySelectorAll('.complete-button');

for (let complete_button of complete_buttons) {
  complete_button.addEventListener('click', (event) => {
    console.log('completed');
    let incompleteTaskDiv = complete_button.closest('div');
    console.log(`task parent div: ${incompleteTaskDiv}`);
    let incompleteTask = incompleteTaskDiv.firstElementChild;
    console.log(`incomplete task: ${incompleteTask}`);
    incompleteTask.classList.add('completed');
    complete_button.remove();

    fetch(`task/complete/${complete_button.dataset.taskPk}`, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': csrftoken,
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
