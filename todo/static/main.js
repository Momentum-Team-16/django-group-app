console.log('js loaded');
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

const complete_button = document.querySelector('#complete-button');


complete_button.addEventListener('click',  (event) => {

    console.log('completed');

    fetch(`task/complete/${complete_button.dataset.taskPk}`, {
        method: 'GET',
        credentials: "same-origin",
        headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': csrftoken,
        }
    })
    .then((response) => {
        return response.json()
    })
    .then((data) =>  {
        console.log(data)
    });
});

