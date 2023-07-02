package com.example.axess

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.MenuItem
import android.widget.RelativeLayout
import android.widget.Toast
import androidx.appcompat.widget.Toolbar
import kotlinx.android.synthetic.main.activity_approval.button_refresh
import kotlinx.android.synthetic.main.activity_login.button_login
import kotlinx.android.synthetic.main.activity_login.text_input_email
import kotlinx.android.synthetic.main.activity_login.text_input_password
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class LoginActivity : AppCompatActivity() {

    lateinit var requestedAreas: List<String>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        requestedAreas = intent.getStringArrayExtra("requestedAreas")?.toList() ?: listOf()
        Log.d("ApprovalActivity", "Received requested areas from MainActivity: $requestedAreas")

        //back button
        val toolbar: Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)


        //login button
        button_login.setOnClickListener {
            val email = text_input_email.text.toString()
            val password = text_input_password.text.toString()

            val retrofit = Retrofit.Builder()
                .baseUrl("http://10.0.0.160:8080") //
                .addConverterFactory(GsonConverterFactory.create())
                .build()

            val apiService = retrofit.create(ApiService::class.java)
            val loginRequest = LoginRequest(email, password)

            apiService.loginUser(loginRequest).enqueue(object : Callback<LoginResponse> {
                override fun onResponse(
                    call: Call<LoginResponse>,
                    response: Response<LoginResponse>
                ) {
                    if (response.isSuccessful) {
                        val loginResponse = response.body()
                        if (loginResponse != null && loginResponse.success) {
                            val intent = Intent(this@LoginActivity, OpenDoorActivity::class.java)
                            intent.putExtra("email", email)
                            intent.putExtra("password", password)
                            intent.putExtra("requestedAreas", requestedAreas.toTypedArray())
                            startActivity(intent)
                        } else {
                            Toast.makeText(
                                this@LoginActivity,
                                "Login failed: Incorrect email or password.",
                                Toast.LENGTH_LONG
                            ).show()
                        }
                    } else {
                        Toast.makeText(
                            this@LoginActivity,
                            "Login failed: Incorrect email or password.",
                            Toast.LENGTH_LONG
                        ).show()
                    }
                }

                override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
                    Toast.makeText(
                        this@LoginActivity,
                        "Network error: ${t.message}",
                        Toast.LENGTH_LONG

                    ).show()
                    Log.e("LoginActivity: ", "network error", t)
                }
            })
        }
    }

    //back button functionality
    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        if (item.itemId == android.R.id.home) {
            onBackPressed()
            return true
        }
        return super.onOptionsItemSelected(item)
    }
}