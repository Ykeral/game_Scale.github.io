//создаем массив с числами
function getNumbers() {
  let arrNums = [];
  for (let image, i = 1; i <= 5; i++) {
    image = new Image();
    image.src = "../img/" + i + ".png";
    image.alt = i;
    arrNums.push(image);
  };
  return arrNums;
}

let arrNums = getNumbers();

//генерируем рандомное число
function getRandomInt() {
  return Math.floor(Math.random() * arrNums.length);
}

let pos;
let intervalId;
function startAnimation(img) {
  clearInterval(intervalId);
  pos = 90;
  intervalId = setInterval(move, 15, img);
}
function move(img) {
  pos -= 0.5;
  img.style.bottom = pos + "%";
  if (pos <= 0) {
    clearInterval(intervalId);
    img.style.visibility = 'hidden';
    setTimeout(throwNumber, 500);
  }
}

function slide(img) {
  img.classList.add("slide");
}
function removeSlide(img) {
  img.classList.remove("slide");
}

let numbers_field = document.querySelector(".numbers");

let draggedItem = null;

function throwNumber() {
  let randomIndex = getRandomInt();
  let img = document.createElement("div");
  img = arrNums[randomIndex];
  img.style.visibility = 'visible';
  img.style.height = '100px';
  img.style.position = 'absolute';
  img.style.left = '10%';
  img.draggable = 'true';
  img.style.cursor = 'move';
  img.addEventListener('dragstart', (event) => {
    event.target.classList.add('selected');
    draggedItem = img;
  });
  img.addEventListener('dragend', (event) => {
    event.target.classList.remove('selected');
    draggedItem = null;
  });

  numbers_field.prepend(img);
  startAnimation(img);
}

let timer;
const total_time = 45;
let curr_time = total_time;

function throwNumbers() {
  let timerId = setInterval(() => throwNumber(), 5000);
  setTimeout(() => { clearInterval(timerId); }, total_time * 1000);
}

let scales = document.querySelector(".scales");

function addFoot() {
  let image = new Image();
  image.src = "../img/foot1.png";
  image.alt = "Ножка весов";
  //image.style.height = '60%'
  image.style.height = '63%';
  image.style.position = 'absolute';
  image.style.bottom = '0%';
  image.style.left = '50%';
  scales.append(image);
}

addFoot();

function addLeftCup() {
  let image = new Image();
  image.src = "../img/left_cup.png";
  image.alt = "Левая чаша весов";
  image.style.height = '40%'
  image.style.position = 'absolute';
  image.style.bottom = '18%';
  //image.style.left = '39.5%';
  image.style.right = '49%';
  image.id = 'left';
  scales.append(image);
}

addLeftCup();

function addRightCup() {
  let image = new Image();
  image.src = "../img/right_cup.png";
  image.alt = "Правая чаша весов";
  image.style.height = '40%'
  image.style.position = 'absolute';
  image.style.bottom = '18%';
  //image.style.left = '55.1%';
  image.style.left = '51%'
  image.id = 'right';
  scales.append(image);
}

addRightCup();


countdown();
function countdown() {
  let timer_div = document.querySelector('.timer');
  if (curr_time >= 10) {
    timer_div.innerText = '00 : ' + curr_time--;
  } else {
    timer_div.innerText = '00 : 0' + curr_time--;
  }
  if (curr_time < 0) { //если время вышло
    clearTimeout(timer);
    let l1_try = localStorage.getItem('l1_try');
    l1_try++;
    localStorage.setItem('l1_try', l1_try);
    let div = document.createElement('div');
    div.className = "center";
    div.style.textAlign = 'center';
    div.innerHTML = "<h1>Время вышло!</h1>";
    scales.append(div);
    if (l1_try <= 2) {
      setTimeout(function () {
        document.location.href = 'level_1.html'
      }, (3000));
    } else {
      document.location.href = 'result.html'
    }
  }
  else {
    timer = setTimeout(countdown, 1000);
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
  localStorage.removeItem('name');
  localStorage.removeItem('l1_try');
  localStorage.removeItem('l2_try');
  localStorage.removeItem('l3_try');
  localStorage.removeItem('l1_count');
  localStorage.removeItem('l2_count');
  localStorage.removeItem('l3_count');
  window.location.href = "../index.html"
}

let countRight = 0;
let countLeft = 0;
let sumLeft = 0;
let sumRight = 0;

function maxWeight() {
  if (+sumLeft > +sumRight) {
    return 'left';
  } else {
    if (+sumRight > +sumLeft) {
      return 'right';
    }
    else {
      if (+sumLeft != 0)
        return 'equal';
    }
  }
}


let leftCup = document.getElementById('left');
let rightCup = document.getElementById('right');
let sum_right = document.querySelector('.sumRight');
let sum_left = document.querySelector('.sumLeft');

function win() {
  let div = document.createElement('div');
  div.className = "center";
  div.style.textAlign = 'center';
  div.innerHTML = "<h1>Победа!</h1>";
  scales.append(div);
  let l1_count = localStorage.getItem('l1_count');
  l1_count = 100;
  localStorage.setItem('l1_count', l1_count);
  setTimeout(goToNextLevel, 2000);

}

function goToNextLevel() {
  window.location.href = "level_2.html";
}

function handlerDropLeft() {
  countLeft++;
  sumLeft += +draggedItem.alt;
  sum_left.style.position = 'absolute';
  sum_left.style.bottom = '25%';
  sum_left.style.left = '40%'
  sum_left.innerText = sumLeft;
  let side = maxWeight();
  if (side == 'left') {
    leftCup.style.bottom = '15%'
    rightCup.style.bottom = '21%';
  } else {
    if (side == 'right') {
      leftCup.style.bottom = '21%'
      rightCup.style.bottom = '15%';
    }
    else {
      if (side == 'equal') {
        leftCup.style.bottom = '18%'
        rightCup.style.bottom = '18%';
        if (countLeft > 1 && countRight > 1) {
          win();
        }
      }
    }
  }
}

function handlerDropRight() {
  countRight++;
  sumRight += +draggedItem.alt;
  sum_right.style.position = 'absolute';
  sum_right.style.bottom = '25%';
  sum_right.style.right = '40%'
  sum_right.innerText = sumRight;
  let side = maxWeight();
  if (side == 'left') {
    leftCup.style.bottom = '15%'
    rightCup.style.bottom = '21%';
  } else {
    if (side == 'right') {
      leftCup.style.bottom = '21%'
      rightCup.style.bottom = '15%';
    }
    else {
      if (side == 'equal') {
        leftCup.style.bottom = '18%'
        rightCup.style.bottom = '18%';
        if (countLeft > 1 && countRight > 1) {
          win();
        }
      }
    }
  }
}



leftCup.addEventListener('dragenter', (event) => event.preventDefault());
leftCup.addEventListener('dragover', (event) => event.preventDefault());
leftCup.addEventListener('drop', handlerDropLeft);

rightCup.addEventListener('dragenter', (event) => event.preventDefault());
rightCup.addEventListener('dragover', (event) => event.preventDefault());
rightCup.addEventListener('drop', handlerDropRight);


OnClickMain();
setTimeout(throwNumber, 1000);