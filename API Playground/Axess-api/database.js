import mysql from 'mysql2';
import dotenv from 'dotenv'
import WebSocket from 'ws';
dotenv.config()

// Setup the pool for all queries
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

//All functions go here
//Get all the Building Areas in the building
async function getBuildingAreas() {
    const [rows] = await pool.query("SELECT * FROM BuildingAreas");
    return rows;
}

// async function getBuildingArea (id) {
//     const [rows] = await pool.query(`
//     SELECT * 
//     FROM BuildingAreas
//     WHERE areaID = ?
//     `, [id]);
//     return rows[0];
// }

//Create an Account Request with all the user details
async function createAccountRequest(name, surname, email, password, workingArea, areasRequested) {
    try {
        // Convert areasRequested array to a comma-separated string
        const areasRequestedString = areasRequested.join(", ");

        const [result] = await pool.query(
            "INSERT INTO accountrequests (name, surname, email, password, workingArea, areasRequested) VALUES (?, ?, ?, ?, ?, ?)",
            [name, surname, email, password, workingArea, areasRequestedString]
        );
        return "Insert Successful, account pending approval";
    } catch (error) {
        console.error("Error inserting account request:", error);
        throw error; // Re-throw the error so it can be handled by the caller or a higher level
    }
}


//Create a login request, this also checks if a person is actually a user
async function loginRequest(email, password) {
    const [result] = await pool.query(`
    SELECT * FROM users
    WHERE email = ?
    AND password = ?
    `, [email, password]);

    if (result.length === 1) {
        // User exists and email/password combination is correct
        return true;
    } else {
        // User does not exist or email/password combination is incorrect
        return false;
    }
}

//This function will open a door and trigger the logging function
async function openDoor(email, password, areaID) {
    const [result] = await pool.query(`
    SELECT * FROM users
    WHERE email = ?
    AND password = ?
    `, [email, password])

    if (result.length === 1) {
        // User exists and email/password combination is correct
        const [userResult] = await pool.query(`
            SELECT areasAccessible FROM users
            WHERE email = ?
        `, [email]);

        const areasAccessibleString = userResult[0].areasAccessible;
        const areasAccessibleArray = areasAccessibleString.split(',').map(area => area.trim());

        if (areasAccessibleArray.includes(areaID)) {
            // User has access to the specified area
            //Trigger the accessLogger function before closing off
            accessLogger(email, areaID)
            sendOpenDoorCommand(areaID);
            return "Door Opened"
        } else {
            // User does not have access to the specified area
            return "Access Denied"
        }
    } else {
        // User does not exist or email/password combination is incorrect
        return "This user does not exist or the email or password is incorrect"
    }
}

async function accessLogger(email, areaID) {
    const [result] = await pool.query(`
    SELECT userID FROM users
    WHERE email = ?
    `, [email])

    //Extract the userID
    const userID = result[0].userID;

    //Log the access
    const [log] = await pool.query(`
    INSERT INTO accesslogs (userID, areaID)
    VALUES (?, ?)
    `, [userID, areaID])
    return log
}

// Function to send the 'openDoor' command to the server
function sendOpenDoorCommand(areaID) {
    // Establish WebSocket connection
    const socket = new WebSocket('ws://localhost:8999');

    // WebSocket onopen event
    socket.onopen = () => {
        console.log('WebSocket connection established.');

        // Send a message to the server to request opening the doors
        const message = JSON.stringify({ command: 'openDoor', areaID: areaID });
        console.log("Sending Message");
        console.log(message);
        socket.send(message);
    };

    // WebSocket onmessage event
    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);

        // Check the received message status
        if (message.status === 'success') {
            console.log('Received:', message.message);
            console.log('Message:', message);

            // Perform necessary actions on the client-side based on the response
            // For example, update the UI, trigger animations, etc.
            // You can add your custom logic here
            // ...
        } else {
            console.log('Failed');
        }

        // Close the WebSocket connection after receiving the response
        socket.close();
    };

    // WebSocket onclose event
    socket.onclose = () => {
        console.log('WebSocket connection closed.');
    };
}

export { getBuildingAreas, createAccountRequest, loginRequest, openDoor };