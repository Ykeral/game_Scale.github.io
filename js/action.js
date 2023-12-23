function submitStartButton() {
    let startButton = document.querySelector('button');
    return startButton;
}

function clickRating() {
    let ratingButton = document.getElementById('rating');
    return ratingButton;
}

function getInputValue() {
    let userName = document.querySelector('input').value;
    return userName;
}

function onClickStart() {
    let startButton = submitStartButton();
    startButton.addEventListener('click', toDoONClick);
}
function onEnterStart() {
    let form = document.getElementById('user_name');
    form.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            toDoONClick();
        }
    });
}

function onClickRating() {
    let ratingButton = clickRating();
    ratingButton.addEventListener('click', showRating);
}


function showRating() {
    window.location.href = "html/rating.html"
}

function toDoONClick() {
    let userName = getInputValue();
    localStorage.setItem('name', userName);
    localStorage.setItem('l1_try', 0);
    localStorage.setItem('l2_try', 0);
    localStorage.setItem('l3_try', 0);
    localStorage.setItem('l1_count', 0);
    localStorage.setItem('l2_count', 0);
    localStorage.setItem('l3_count', 0);
    window.location.href = "html/level_1.html"
}

/*localStorage.clear();*/
onClickStart();
onEnterStart();
onClickRating()