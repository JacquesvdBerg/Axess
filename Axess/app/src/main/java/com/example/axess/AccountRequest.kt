package com.example.axess

import java.io.Serializable

data class AccountRequest(
    val name: String,
    val surname: String,
    val email: String,
    val password: String,
    val workingArea: String,
    val areasRequested: List<String>
) : Serializable {

    fun getFullName() = "$name $surname"

}
