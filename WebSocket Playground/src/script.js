// Establish WebSocket connection
const socket = new WebSocket('ws://localhost:8999');

// WebSocket onmessage event
socket.onmessage = (event) => {
    const message = JSON.parse(event.data);

    // Check the received message status
    if (message.status === 'success') {
        console.log('Received:', message.message);
        console.log('Message:', message);

        const door1 = document.getElementById('door1');
        const door2 = document.getElementById('door2');
        const door3 = document.getElementById('door3');
        const door4 = document.getElementById('door4');
        const door5 = document.getElementById('door5');

        if (message.areaID === "mainDoor") {
            door1.classList.add('open');
            setTimeout(() => {
                // Code to be executed after 5 seconds
                door1.classList.remove('open');
            }, 3000); // 5000 milliseconds = 5 seconds
        } else if (message.areaID === "genPop") {
            door2.classList.add('open');
            setTimeout(() => {
                // Code to be executed after 5 seconds
                door2.classList.remove('open');
            }, 3000); // 5000 milliseconds = 5 seconds
        } else if (message.areaID === "switchcare") {
            door3.classList.add('open');
            setTimeout(() => {
                // Code to be executed after 5 seconds
                door3.classList.remove('open');
            }, 3000); // 5000 milliseconds = 5 seconds
        } else if (message.areaID === "devRoom") {
            door4.classList.add('open');
            setTimeout(() => {
                // Code to be executed after 5 seconds
                door4.classList.remove('open');
            }, 3000); // 5000 milliseconds = 5 seconds
        } else if (message.areaID === "serverRoom") {
            door5.classList.add('open');
            setTimeout(() => {
                // Code to be executed after 5 seconds
                door5.classList.remove('open');
            }, 3000); // 5000 milliseconds = 5 seconds
        }

    } else {
        console.log('Failed');
    }
};