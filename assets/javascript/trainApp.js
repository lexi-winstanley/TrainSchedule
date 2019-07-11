let firebaseConfig = {
    apiKey: "AIzaSyAFJGH4Yc85ke6083Vd_kL4sPftY307h2w",
    authDomain: "train-schedules-lw.firebaseapp.com",
    databaseURL: "https://train-schedules-lw.firebaseio.com",
    projectId: "train-schedules-lw",
    storageBucket: "",
    messagingSenderId: "386759525465",
    appId: "1:386759525465:web:114a82838266aa7e"
};

firebase.initializeApp(firebaseConfig);
let database = firebase.database().ref();
let count = 0;
let timeInterval;
let timeStart = 0;
let countdownStarted = false;

function timeToUpdate() {
    timeInterval = setInterval(updateTimes, 60000);
    countdownStarted = true;
}

function resetInterval() {
    clearInterval(timeInterval);
    timeStart = 0;
    countdownStarted = false;
}

function addNewTrain(event) {
    event.preventDefault();
    count++;
    let name = document.getElementById('name').value.trim();
    let destination = document.getElementById('destination').value.trim();
    let firstTime = document.getElementById('firstTime').value.trim();
    let frequency = document.getElementById('frequency').value.trim();
    database.push().set({
        name: name,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
        order: count
    });
    document.getElementById('name').value = '';
    document.getElementById('destination').value = '';
    document.getElementById('firstTime').value = '';
    document.getElementById('frequency').value = '';
}

function updateTimes() {
    let allRows = document.getElementsByTagName('tr');
    console.log(allRows);
    for (let i = 1; i < allRows.length; i++) {
        let currentRow = allRows[i];
        let currentChildren = currentRow.getElementsByTagName('td');
        let dataFirstTime = currentChildren[3].getAttribute('data-first');
        console.log(dataFirstTime);
        let dataFreq = currentChildren[2].getAttribute('data-freq');
        console.log(dataFreq);
        let convertedFirstTime = moment(dataFirstTime, 'HH:mm').subtract(1, 'years');
        let difference = moment().diff(moment(convertedFirstTime), 'minutes');
        let timeRemainder = difference % dataFreq;
        let minutesToNext = dataFreq - timeRemainder;
        let nextTime = moment().add(minutesToNext, 'minutes');
        let displayTime = moment(nextTime).format('HH:mm');
        currentChildren[4].innerText = minutesToNext;
        currentChildren[3].innerText = displayTime;
    }
}

database.on('child_added', function(snap) {
    let newTrain = snap.val();
    console.log(newTrain);
    let newRow = document.createElement('tr');
    newRow.className = 'trainRow';
    if (newTrain.order % 2 === 0) {
        newRow.className = 'evenRow';
    }
    let newName = document.createElement('td');
    newName.innerText = newTrain.name;
    let newDest = document.createElement('td');
    newDest.innerText = newTrain.destination;
    let newFreq = document.createElement('td');
    let storedFrequency = newTrain.frequency;
    console.log(storedFrequency);
    newFreq.setAttribute('data-freq', storedFrequency);
    newFreq.innerText = storedFrequency;
    let nextTrain = document.createElement('td');
    let storedFirstTime = newTrain.firstTime;
    console.log(storedFirstTime);
    nextTrain.setAttribute('data-first', storedFirstTime);
    let minAway = document.createElement('td');
    newRow.appendChild(newName);
    newRow.appendChild(newDest);
    newRow.appendChild(newFreq);
    newRow.appendChild(nextTrain);
    newRow.appendChild(minAway);
    document.getElementById('addedTrains').appendChild(newRow);
    updateTimes();
});

resetInterval();
document.getElementById('createNew').onclick = addNewTrain;
timeToUpdate();

