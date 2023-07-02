package com.example.axess

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.MenuItem
import androidx.appcompat.widget.Toolbar
import kotlinx.android.synthetic.main.activity_approval.button_refresh
import kotlinx.android.synthetic.main.activity_approval.text_view_user_full_name

class ApprovalActivity : AppCompatActivity() {

    lateinit var accountRequest: AccountRequest
    lateinit var requestedAreas: List<String>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_approval)

        requestedAreas = intent.getStringArrayExtra("requestedAreas")?.toList() ?: listOf()
        Log.d("ApprovalActivity", "Received requested areas from MainActivity: $requestedAreas")

        //back button
        val toolbar: Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        retrieveUser()
        displayUser()
        buttonClicked()
    }

    //back button functionality
    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        if (item.itemId == android.R.id.home) {
            onBackPressed()
            return true
        }
        return super.onOptionsItemSelected(item)
    }

    private fun retrieveUser() {
        accountRequest = intent.getSerializableExtra("AccountRequest") as AccountRequest
    }

    private fun displayUser() {
        text_view_user_full_name.text = accountRequest.getFullName()
    }

    private fun buttonClicked() {
        button_refresh.setOnClickListener {
            val intent = Intent(this, LoginActivity::class.java)
            intent.putExtra("requestedAreas", requestedAreas.toTypedArray())
            startActivity(intent)
        }
    }
}
