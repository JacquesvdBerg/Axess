package com.example.axess

import android.content.Context
import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.MenuItem
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.appcompat.widget.Toolbar
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.activity_open_door.linkRecyclerView
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class OpenDoorActivity : AppCompatActivity() {

    private lateinit var email: String
    private lateinit var password:String

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_open_door)

        email = intent.getStringExtra("email") ?: ""
        password = intent.getStringExtra("password") ?: ""

        val requestedAreas = intent.getStringArrayExtra("requestedAreas")?.toList() ?: listOf()
        Log.d("OpenDoorActivity", "Requested areas: $requestedAreas")

        //back button
        val toolbar: Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        val doors = listOf(
            Door("Main Door", "mainDoor"),
            Door("Switch Care", "switchcare"),
            Door("General Areas", "genPop"),
            Door("Server Room", "serverRoom"),
            Door("Developer Room", "devRoom")
        )
        val filteredDoors = doors.filter { it.value in requestedAreas }
        val linkRecyclerView: RecyclerView = findViewById(R.id.linkRecyclerView)
        linkRecyclerView.layoutManager = LinearLayoutManager(this)
        val adapter = LinkAdapter(filteredDoors) { Door ->
            openDoor(email, password, Door.value)
        }
        linkRecyclerView.adapter = adapter
    }

    private fun openDoor(email: String, password: String, doorArea: String) {
        val requestBody = OpenDoorRequest(
            email = email,
            password = password,
            areaID = doorArea
        )

        val retrofit = Retrofit.Builder()
            .baseUrl("http://10.0.0.160:8080")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val apiService = retrofit.create(ApiService::class.java)

        apiService.openDoor(requestBody).enqueue(object : Callback<Void> {
            override fun onResponse(call: Call<Void>, response: Response<Void>) {
                if (response.isSuccessful) {
                    // Handle the successful response here
                    Log.d("MainActivity", "Door open request successful")
                } else {
                    // Handle the error response here
                    Log.d("MainActivity", "Door open request failed with response code ${response.code()} and message: ${response.message()}")
                }
            }

            override fun onFailure(call: Call<Void>, t: Throwable) {
                // Handle the network failure here
                Log.d("MainActivity", "Door open request failed due to network issue: ${t.message}")
            }
        })
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

class LinkAdapter(private val linkList: List<Door>, private val itemClick: (Door) -> Unit) :
    RecyclerView.Adapter<LinkAdapter.LinkViewHolder>() {

    inner class LinkViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val linkTextView: TextView = itemView.findViewById(R.id.linkTextView)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): LinkViewHolder {
        val itemView = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_link, parent, false)
        return LinkViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: LinkViewHolder, position: Int) {
        val link = linkList[position]
        holder.linkTextView.text = link.displayName

        holder.itemView.setOnClickListener {
            itemClick(link)
        }
    }

    override fun getItemCount(): Int {
        return linkList.size
    }
}