//Global
let dem;
let QuestionObj = {
  question: ['Who handsome','Hello','4 is'],
  answer: ['Don','Loconcac','Four'],
}
let loop = true;
let aSave = [];
let saveAnswerSave = [];
let hangmanIMG = document.querySelector('#hangman');

//Init
const init = () =>{
  if (loop){
  let d = 0;
  let a = [];
  let saveAnswer = [];
  let randomQuestion = Math.floor(Math.random()*QuestionObj.question.length);
  SplitString = QuestionObj.answer[randomQuestion].split("");
  // console.log(SplitString);
  SplitString.forEach((el,index)=>{
    if (el === " "){
      SplitString.splice(index,1);
    }
  });
  SplitStringNoSpace = SplitString;
  SplitStringNoSpace.forEach((el)=>{
    saveAnswer.push(el.toLowerCase());
  });
  // console.log(SplitStringNoSpace);
  SplitStringNoSpace.forEach((el,index)=>{
    a.push(' _ ');
  });
  // console.log(a.toString().replace(/,/g ," "));
  document.querySelector('#questionShow').textContent = `${ QuestionObj.question[randomQuestion]} ?`;
  document.querySelector('#showAnswer').textContent = a.toString().replace(/,/g ," ");
  document.querySelector('#hangman').src = './static/hangman/hangman-0.png';
  arrayChoose = document.querySelectorAll('.choosealpha');
  arrayChoose.forEach((el)=>{
    el.classList.remove('disabled');
  });
  aSave = a;
  saveAnswerSave = saveAnswer;
  dem = 0;
  }
}

//NewGame
const newgame = ()=>{
  loop = true;
  let d = 0;
  let a = [];
  let saveAnswer = [];
  document.querySelector('#question').textContent = 'Question: ';
  document.querySelector('#btn_NewGame').textContent = `New Game`;
  let randomQuestion = Math.floor(Math.random()*QuestionObj.question.length);
  SplitString = QuestionObj.answer[randomQuestion].split("");
  // console.log(SplitString);
  SplitString.forEach((el,index)=>{
    if (el === " "){
      SplitString.splice(index,1);
    }
  });
  SplitStringNoSpace = SplitString;
  SplitStringNoSpace.forEach((el)=>{
    saveAnswer.push(el.toLowerCase());
  });
  SplitStringNoSpace.forEach((el,index)=>{
    a.push(' _ ');
  });
  document.querySelector('#questionShow').textContent = `${ QuestionObj.question[randomQuestion]} ?`;
  document.querySelector('#showAnswer').textContent = a.toString().replace(/,/g ," ");
  document.querySelector('#hangman').src = './static/hangman/hangman-0.png';
  arrayChoose = document.querySelectorAll('.choosealpha');
  arrayChoose.forEach((el)=>{
    el.classList.remove('disabled');
  });
  aSave = a;
  saveAnswerSave = saveAnswer;
  dem = 0;
}
//Add Quesiton:
let security = ['1','1','3','enter'];
let hide = ['1','1','4','enter'];
let userPress = [];
const displayAdd = (event)=>{
  userPress.push(event.key.toLowerCase());
  if (checkArray(security,userPress)){
    document.querySelector('#btn_AddQuestion').style.display = 'inline-block';
  }
  if (userPress.includes('d')){
    userPress = [];
  }
  if (checkArray(userPress,hide)){
    document.querySelector('#btn_AddQuestion').style.display = 'none';
  }
}

const addquestion = ()=>{
  if (document.querySelector('#inputQA').style.display = 'none'){
    document.querySelector('#inputQA').style.display = 'block';
  }
  document.querySelector('#cancel').addEventListener('click',()=>{
    document.querySelector('#inputQA').style.display = 'none';
  });
  InputQues = document.querySelector('#newQues');
  AnsQues = document.querySelector('#AnsQues');
  document.querySelector('#submitAdd').addEventListener('click',()=>{
    if (InputQues.value === "" || AnsQues.value === ""){
      document.querySelector('#validate').style.display = 'inline-block';
    }
    else{
      QuestionObj.question.push(InputQues.value);
      QuestionObj.answer.push(AnsQues.value);
      document.querySelector('#validate').style.display = 'none';
      document.querySelector('#addsuccessful').style.display = 'inline-block';
    }
  });
  // let QuestionObj = {
  //   question: ['Who handsome','Hello','4 is'],
  //   answer: ['Don','Loconcac','Four'],
  // }
}
console.log(QuestionObj.question,  QuestionObj.answer);

//////////////////////////////////////////////////////////////////////////////////////////////////

//Process
const chooseAlphabet = ()=>{
    document.querySelector('#keyboard').addEventListener('click',choose);
}

const choose = (event) => {
  if (loop){
  UserChoose = event.target;
  if (UserChoose.id != 'keyboard'){
    if (UserChoose.classList.value.includes('disabled')){
      return
    }
    else{
      let value = UserChoose.textContent.toLowerCase();
      let checker = check(value,saveAnswerSave);
      if (checker){
        UserChoose.classList.add('disabled');
        // console.log(aSave);
        document.querySelector('#showAnswer').textContent = (aSave.toString().replace(/,/g ," ")).toUpperCase();
        WinGame();
      }
      else{
        UserChoose.classList.add('disabled');
        dem += 1;
        if (dem < 6){
          hangmanIMG.src = `./static/hangman/hangman-${dem}.png`;
        }
        else if (dem == 6) {
            hangmanIMG.src = `./static/hangman/hangman-6.png`;
            LoseGame();
        }
      }
    }
  }
  else
    console.log("Error");
  }
}


//Check Function
const checkArray = (arr1,arr2)=>{
  if (JSON.stringify(arr1) === JSON.stringify(arr2)) {
    return true;
  }
  else return false;
}

const check = (par,arr) =>{
    let flag = false;
    arr.forEach((el,index) => {
      if (par === el){
        flag = true;
        aSave[index] = el;
      }
    });
    return flag;
}
// Condition Win - Lose
const WinGame = ()=>{
  if(checkArray(saveAnswerSave,aSave)){
    hangmanIMG.src = `./static/hangman/winner.png`;
    document.querySelector('#question').textContent = ' ';
    document.querySelector('#questionShow').innerHTML = `<b style="color:red">YOU ARE WINNERRRRRR</b>`;
    document.querySelector('#btn_NewGame').textContent = `Play Again`;
    loop = false;
  }
}

const LoseGame = ()=>{
  document.querySelector('#question').textContent = ' ';
  document.querySelector('#questionShow').innerHTML = `<b style="color:red">Stupid :( </b>`;
  document.querySelector('#btn_NewGame').textContent = `Play Again`;
  loop = false;
}

//Controller/
const run = () =>{
  document.querySelector('#btn_NewGame').addEventListener('click',newgame);
  document.querySelector('#btn_AddQuestion').addEventListener('click',addquestion)
  document.addEventListener('keydown',displayAdd);
  if (loop){
    chooseAlphabet();
  }
}
init();
run();
