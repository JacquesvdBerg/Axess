package com.example.axess

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.MenuItem
import android.widget.RelativeLayout
import androidx.appcompat.widget.Toolbar
import kotlinx.android.synthetic.main.activity_approval.button_refresh
import kotlinx.android.synthetic.main.activity_login.button_login

class LoginActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        //back button
        val toolbar: Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        loginButtonClicked()
    }

    //back button functionality
    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        if (item.itemId == android.R.id.home) {
            onBackPressed()
            return true
        }
        return super.onOptionsItemSelected(item)
    }

    private fun loginButtonClicked() {
        button_login.setOnClickListener {
            val intent = Intent(this, GetAccess::class.java)
            startActivity(intent)
        }
    }
}