package com.example.axess

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import kotlinx.android.synthetic.main.activity_approval.button_refresh
import kotlinx.android.synthetic.main.activity_lock_screen.button_permission

class LockScreen : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_lock_screen)
        val button = findViewById<Button>(R.id.button_permission)
        buttonClicked()
    }

    private fun buttonClicked() {
        button_permission.setOnClickListener {
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
        }
    }
}