let startOrStop = false;
let langVar = "en-US";
var tabP = document.getElementsByTagName('p');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = langVar;
  
let p = document.createElement('p');
const transcription = document.querySelector('.transcription');
transcription.appendChild(p);

function getAudio() {
  	navigator.mediaDevices.getUserMedia({ video: false, audio: true})
      .catch(err => {
        alert("You must have your microphone on, give your browser permission");
      });
  }

function startStop(){
    startOrStop = !startOrStop;
    if (startOrStop == true){
      recognition.start();
      recognition.addEventListener('end', recognition.start);
      document.querySelector('#startStop').innerHTML = "Stop writting";
    } else {
      recognition.stop();
      recognition.removeEventListener('end', recognition.start);
      document.querySelector('#startStop').innerHTML = "Start writting";
    } 
  }

function fromStorage(){
  for (var i = 0; i<1000; i++){
    if (localStorage.getItem(i) === null){
      break;
    }
     p.textContent = localStorage.getItem(i);
     p = document.createElement('p');
     transcription.appendChild(p);
  }
}

recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .map(item=> item.charAt(0).toUpperCase() + item.substr(1).toLowerCase())
      .join('');

      p.textContent = transcript;
      localStorage.setItem((tabP.length-1), p.textContent);

      if (e.results[0].isFinal) {
        p = document.createElement('p');
        transcription.appendChild(p);
      }
  });

function clearDiv(){
    while (transcription.firstChild) {
      transcription.removeChild(transcription.lastChild);
    }
    transcription.appendChild(p);
    localStorage.clear();
  }

function downloadTxt(transcription){
   
    var tabPcontent = [];

    for (var i = 0; i < (tabP.length - 1) ; i++)
    {
      tabPcontent[i] = tabP[i].textContent;
    }

    var content = tabPcontent.join("\n");

  var link = document.createElement('a');
  link.setAttribute('download', "transcription");
  link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  link.click();
}


function changeLang(e){
  if (e.path[0].id == 'PL') langVar = "pl-PL";
  if (e.path[0].id == 'US') langVar = "en-US";
  if (e.path[0].id == 'HIS') langVar = "es-ES";
  if (e.path[0].id == 'RUS') langVar = "ru-RU";

  recognition.lang = langVar;
}

document.querySelector('#PL').addEventListener('click', changeLang);
document.querySelector('#US').addEventListener('click', changeLang);
document.querySelector('#RUS').addEventListener('click', changeLang);
document.querySelector('#HIS').addEventListener('click', changeLang);

getAudio();
fromStorage();