package com.example.axess

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.MenuItem
import android.widget.ArrayAdapter
import android.widget.Toast
import androidx.appcompat.widget.Toolbar
import kotlinx.android.synthetic.main.activity_main.button_register
import kotlinx.android.synthetic.main.activity_main.checkbox_genPop
import kotlinx.android.synthetic.main.activity_main.checkbox_devRoom
import kotlinx.android.synthetic.main.activity_main.checkbox_serverRoom
import kotlinx.android.synthetic.main.activity_main.checkbox_switchCare
import kotlinx.android.synthetic.main.activity_main.spinner_working_area
import kotlinx.android.synthetic.main.activity_main.text_input_email
import kotlinx.android.synthetic.main.activity_main.text_input_name
import kotlinx.android.synthetic.main.activity_main.text_input_password
import kotlinx.android.synthetic.main.activity_main.text_input_surname
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class MainActivity : AppCompatActivity() {



    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        //back button
        val toolbar: Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        setupSpinner()
        setupButton()
    }

    //back button functionality
    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        if (item.itemId == android.R.id.home) {
            onBackPressed()
            return true
        }
        return super.onOptionsItemSelected(item)
    }

    private fun setupSpinner() {
        val workingAreas = arrayListOf("Switch Care", "General Area", "Main Door","Server Room", "Developer Room")
        val workAreaAdapter = ArrayAdapter(this, android.R.layout.simple_spinner_dropdown_item, workingAreas)
        spinner_working_area.adapter = workAreaAdapter
    }

    private fun setupButton() {
        button_register.setOnClickListener {
            Log.d("MainActivity", "Button clicked")
            createAccount()
        }
    }

    private fun createAccount() {
        val areasRequested = mutableListOf<String>()

        // Check which checkboxes are selected and add the areas to the list
        if (checkbox_genPop.isChecked) {
            areasRequested.add("genPop")
        }
        if (checkbox_devRoom.isChecked) {
            areasRequested.add("devRoom")
        }
        if (checkbox_serverRoom.isChecked) {
            areasRequested.add("serverRoom")
        }
        if (checkbox_switchCare.isChecked) {
            areasRequested.add("switchcare")
        }
        areasRequested.add("mainDoor")

        val requestBody = AccountRequest(
            name = text_input_name.text.toString(),
            surname = text_input_surname.text.toString(),
            email = text_input_email.text.toString(),
            password = text_input_password.text.toString(),
            workingArea = spinner_working_area.selectedItem as String,
            areasRequested = areasRequested
        )

        val retrofit = Retrofit.Builder()
            .baseUrl("http://10.0.0.160:8080")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val apiService = retrofit.create(ApiService::class.java)

        apiService.createAccountRequest(requestBody).enqueue(object : Callback<Void> {
            override fun onResponse(call: Call<Void>, response: Response<Void>) {
                if (response.isSuccessful) {
                    // Handle the successful response here
                    Log.d("MainActivity", "Account creation request successful")
                    val intent = Intent(this@MainActivity, ApprovalActivity::class.java)
                    intent.putExtra("AccountRequest", requestBody)
                    intent.putExtra("requestedAreas", areasRequested.toTypedArray())
                    Log.d("MainActivity", "Passing requested areas to OpenDoorActivity: $areasRequested")
                    startActivity(intent)

                } else {
                    // Handle the error response here
                    Log.d("MainActivity", "Account creation request failed with response code ${response.code()} and message: ${response.message()}")
                }
            }

            override fun onFailure(call: Call<Void>, t: Throwable) {
                // Handle the network failure here
                Log.d("MainActivity", "Account creation request failed due to network issue: ${t.message}")
            }
        })
    }

}
