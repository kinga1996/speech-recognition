window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

let p = document.createElement('p');
const tranciptionsDiv = document.querySelector('.transcription');
tranciptionsDiv.appendChild(p);

recognition.addEventListener('result', e=>{
	const transcipt = Array.from(e.results)
		.map(result => result[0])
		.map(result => result.transcript)
		.join('');

	if (e.results[0].isFinal) {
    	p = document.createElement('p');
    	tranciptionsDiv.appendChild(p);
    }
});

recognition.addEventListener('end', recognition.start);
recognition.start();