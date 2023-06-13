package com.example.axess

import java.io.Serializable

data class User(
    val name: String,
    val surname: String,
    val email: String,
    val password: String,
    val workingArea: String,
    val switchCare: String,
    val genPop: String,
    val devRoom: String,
    val serverRoom: String
) : Serializable {

    fun getFullName() = "$name $surname"

    //    fun getAllDetails() = "$name $surname $email $password $workingArea $switchCare $genPop $mainDoor $serverRoom"
    fun getAllDetails() =
        "$name $surname $email $password $workingArea $switchCare $genPop $devRoom $serverRoom"
}
