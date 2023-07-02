package com.example.axess

data class Door(val displayName: String, val value: String)

val doors = listOf(
    Door("Main Door", "mainDoor"),
    Door("Switch Care", "switchcare"),
    Door("General Areas", "genPop"),
    Door("Server Room", "serverRoom"),
    Door("Developer Room", "devRoom")
)
