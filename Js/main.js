
////// ТУТ МЫ ПОЛУЧАЕМ КАРТОЧКУ С КНОПКАЙ  СТАРТ.  И САМ БЛОК С ИГРОЙ.!!!
const startBtnEl = document.getElementById('start')
const cardsEl = document.getElementById('card')
const contentMain = document.querySelector('.main')



//////     БЛОК С ИГРОЙ СТАВЛЮ НЕВИДИМЫМ 
contentMain.style.display = 'none'



////////////   НА КЛИК  СТАРТ  СЕКЦИЯ УХОДИТ И ПОЯЛВЛЯЕТСЯ БЛОК С ИГРОЙ
function handlerStartBtn(event) {
  event.preventDefault()
  document.querySelector('.card').style.display = 'none'
  contentMain.style.display = 'block'
}

startBtnEl.addEventListener('click', handlerStartBtn)





///// ДИНАМИЧЕСКИ ПОЛУЧАЕМ КАПЕЛЬКИ И ТО, ЧТО ВНУТРИ
function createDrop() {
  const drop = document.createElement('div')
  const firstNum = document.createElement('div')
  const operation = document.createElement('div')
  const secondNum = document.createElement('div')

  drop.classList.add('drop')
   

  const { firstNums, secondNums, operations} = randomExpression(1, 10)

  firstNum.innerText = firstNums
  secondNum.innerText = secondNums
  operation.innerText = operations





///// ТУТ Я НЕ МОГУ ПОЛУЧИТЬ ВЫЧИСЛЕНИЯ )))))))))))))))))))))))))))))))))))))))))))


  const result = mathematicalCalculations()

  function mathematicalCalculations() {

  switch(operations) {
     case '+':
      return firstNums+secondNums;
     case '-':
      return firstNums-secondNums;  
     case '*':
      return firstNums*secondNums;
    case '/':
      return firstNums/secondNums;
    }
}













  drop.dataset.result = result

  drop.appendChild(firstNum)
  drop.appendChild(operation)
  drop.appendChild(secondNum)

  return drop
}

//// ПОЛУЧАЕМ РАНДОМНЫЕ  ЧИСЛА
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}


////////////// ЗАДЕМ ОБЛАСТЬ ВИДИМОСТИ КАПЛЯМ И ИНТЕРВАЛ ЧЕРЕЗ АНИМАЦИЮ 
setInterval(() => {
  const dropContent = document.querySelector('.main__img')
  const drop = createDrop()
  dropContent.prepend(drop)
  const dropWidth = drop.offsetWidth
  const areaWidth = dropContent.offsetWidth
  const maxLeftPos = parseInt(100 - dropWidth / areaWidth * 100)
  drop.style.left = getRandomIntInclusive(0 , maxLeftPos) + '%'
  drop.classList.add('animateFall')
}, 8000)





/////////////////////////// Получаем кнопки и дисплей калькулятора////////////////////!

const input = document.getElementById('input')
const enter = document.getElementById('enter')  
const clear = document.getElementById('clear')



////////// задаем кнопке Clear  функцию на клик, стерать число которое ввели в калькулятор!
function resetCalculate() {
  input.value = ''
}
clear.addEventListener('click', resetCalculate);




/////////////////////// Получаем все кнопки с классом btn  через массив и задаем  функцию, которая  отображает наши циферки введеные  в калькуляторе
let buttons = Array.from(document.querySelectorAll('.btn'));

buttons.map((button) => {
  button.addEventListener('click', (e) => {
    input.value += e.target.innerText
  })
})





//// ПОЛУЧИЛ ЭЛЕМЕНТ ДЛЯ ОЧКОВ




///////////////////////      На КНОПКУ ENTER  ЗАДАЕМ ФУНКЦИЮ КОТОРАЯ СРАВНИВАЕТ НАШ ОТВЕТ С ОТВЕТАМ КАПЕЛЬ И ЕСЛИ ОТВЕТЫ СОВПАДАЮТ, ТО КАПЛИ УДАЛЯЮТСЯ И ДИСПЛЕЙ КАЛЬКУЛЯТОРА СТАНОВИТСЯ НА 0
enter.addEventListener('click', function(){
  const drops = document.querySelectorAll('.drop')
  let score = document.getElementById('score')
  score.innerHTML = 10
  drops.forEach((el) => {
    if (el.dataset.result === input.value) {
      el.remove()
      input.value = ''
      score.innerHTML += score.innerHTML
    }
  })


})





  //// ПОЛУЧАЕМ РАНДОМНЫЕ ОПЕРАТОРЫ
  const operator = ['/', '+', '-', '*']
  let sings = ''

  function getRandomOperationIndex() {
    return Math.floor(Math.random() * ((operator.length - 1) - 0 + 1) + 0)
  }

  function getRandomOperation() {
    const randomIndex = getRandomOperationIndex()
    const randomOperation = operator[randomIndex]

    if (randomOperation === sings) {
      getRandomOperation()
    } else {
      sings = randomOperation
    }
    return randomOperation
  }




/////////////  ЗАДАЕМ ОПЕРАТОРОМ УСЛОВИЯ 
  function randomExpression(min, max) {
    let firstNums = getRandomIntInclusive(min, max)
    let secondNums = getRandomIntInclusive(min, max)
    const operations = getRandomOperation()
    if (firstNums < secondNums && (operations === '-' || operations === '/')) {
      [firstNums, secondNums] = [secondNums, firstNums]
    }

    if (operations === '/' && firstNums % secondNums != 0) {
      firstNums -= firstNums % secondNums
    }
 
    return {firstNums, secondNums, operations}
  }








