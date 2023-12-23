let userMap = new Map();

function getUsers() {
    let i = 0;
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        userMap.set(key, localStorage.getItem(key));
    }
}

function sortUsers() {
    let mapSort = new Map([...userMap.entries()].sort((a, b) => b[1] - a[1]));
    return mapSort;
}

function addRating() {
    let rating = document.querySelector('.rating');
    let i = 0;
    let j = 0;
    let sortedMapUsers = sortUsers();
    if (sortedMapUsers.size >= 5) {
        i = 5;
    } else {
        i = sortedMapUsers.size;
    }
    if (i == 0) {
        let div = document.createElement('div');
            div.style.textAlign = 'center';
            div.innerText = 'К сожалению, не один пользователь еще не сыграл в игру :(';
            rating.append(div);
    }
    for (let [key, elem] of sortedMapUsers) {
        if (j <= i) {
            let div = document.createElement('div');
            div.style.textAlign = 'center';
            div.innerText = ++j + '. ' + key + ' - ' + elem + ' очков';
            rating.append(div);
            i--;
        }
    }
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
getUsers();
addRating();