import express from 'express'

import { getBuildingAreas, createAccountRequest, loginRequest, openDoor } from './database.js'

const app = express()

app.use(express.json())

//Create the API endpoints that the app can use to trigger queries
//This one is just for testing
app.get("/", async (req, res) => {
    res.json({ status: "We in good" })
})

//Get all the Building areas, used for the main screen
app.get("/getBuildingareas", async (req, res) => {
    const buildingareas = await getBuildingAreas()
    res.send(buildingareas);
})

//Add an account request to the accountrequests table, used at registration
app.post("/createAccountRequest", async (req, res) => {
    const { name, surname, email, password, workingArea, areasRequested } = req.body
    const accountrequest = await createAccountRequest(name, surname, email, password, workingArea, areasRequested)
    res.status(201).send(accountrequest)
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body
    const login = await loginRequest(email, password)
    if (login) {
        res.status(201).json({ success: true, message: "Login successful" })
    } else {
        res.status(401).json({ success: false, message: "Login failed" })
    }
})

app.post("/openDoor", async (req, res) => {
    const { email, password, areaID } = req.body
    const doorOpened = await openDoor(email, password, areaID)
    res.status(201).send(doorOpened)
})



//Handle error events
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something Broke!');
})

const port = process.env.PORT || 8080

//Open a port for the Express App to listen on
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})