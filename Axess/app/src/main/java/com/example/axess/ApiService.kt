package com.example.axess

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Query

interface ApiService {

    @GET("/")
    fun testServer(): Call<String>

    //@GET("getBuildingAreas")
    //fun getBuildingAreas(): Call<List<BuildingArea>>

    @POST("createAccountRequest")
    fun createAccountRequest(@Body requestBody: AccountRequest): Call<Void>

    @POST("login")
    fun loginUser(@Body loginRequest: LoginRequest): Call<LoginResponse>

    @POST("openDoor")
    fun openDoor(@Body openDoorRequestBody: OpenDoorRequest): Call<Void>
}