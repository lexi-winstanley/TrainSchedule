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

database.on('child_added', function(snap) {
    let newTrain = snap.val();
    let newRow = document.createElement('tr');
    if (newTrain.order % 2 === 0) {
        newRow.setAttribute('class', 'evenRow');
    }
    let newName = document.createElement('td');
    newName.innerText = newTrain.name;
    let newDest = document.createElement('td');
    newDest.innerText = newTrain.destination;
    let newFreq = document.createElement('td');
    newFreq.innerText = newTrain.frequency;
    let nextTrain = document.createElement('td');
    nextTrain.innerText = 'Calc';
    let minAway = document.createElement('td');
    minAway.innerText = 'Calc';
    newRow.appendChild(newName);
    newRow.appendChild(newDest);
    newRow.appendChild(newFreq);
    newRow.appendChild(nextTrain);
    newRow.appendChild(minAway);
    document.getElementById('addedTrains').appendChild(newRow);
});



document.getElementById('createNew').onclick = addNewTrain;