package com.example.axess

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.MenuItem
import android.widget.ArrayAdapter
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
            createAccount()
        }
    }

    private fun createAccount(){
        val user = User(
            text_input_name.text.toString(),
            text_input_surname.text.toString(),
            text_input_email.text.toString(),
            text_input_password.text.toString(),
            spinner_working_area.selectedItem as String,
            checkbox_switchCare.toString(),
            checkbox_genPop.toString(),
            checkbox_devRoom.toString(),
            checkbox_serverRoom.toString()
        )

        val intent = Intent(this, ApprovalActivity::class.java)
        intent.putExtra("User", user)
        startActivity(intent)
    }

}
