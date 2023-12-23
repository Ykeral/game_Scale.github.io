let userName = localStorage.getItem('name');
let l1_count = localStorage.getItem('l1_count');
let l2_count = localStorage.getItem('l2_count');
let l3_count = localStorage.getItem('l3_count');

function countScore() {
    let sum = 0;
    sum = +l1_count + +l2_count + +l3_count;
    return sum;
}


function addResult() {
    let sum = document.getElementById('sum');
    let l1 = document.getElementById('lvl1');
    let l2 = document.getElementById('lvl2');
    let l3 = document.getElementById('lvl3');
    let score = countScore();
    let name = document.getElementById('name');
    name.innerText = "Хорошая работа, " + userName + "!";
    sum.innerText = "Всего: " + score;
    l1.innerText = "Уровень 1: " + l1_count;
    l2.innerText = "Уровень 2: " + l2_count;
    l3.innerText = "Уровень 3: " + l3_count;
    localStorage.removeItem('name');
    localStorage.removeItem('l1_try');
    localStorage.removeItem('l2_try');
    localStorage.removeItem('l3_try');
    localStorage.removeItem('l1_count');
    localStorage.removeItem('l2_count');
    localStorage.removeItem('l3_count');
    localStorage.setItem(userName, score);

}

function submitMainButton() {
    let mainButton = document.querySelector('button');
    return mainButton;
}

function OnClickMain() {
    let mainButton = submitMainButton();
    mainButton.addEventListener('click', toDoONClick);
}

function toDoONClick() {
    window.location.href = "../index.html"
}

OnClickMain();
addResult();

