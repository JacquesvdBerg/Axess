package com.example.axess

import android.content.Context
import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.LayoutInflater
import android.view.MenuItem
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.appcompat.widget.Toolbar
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.activity_open_door.linkRecyclerView

class OpenDoorActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_open_door)

        //back button
        val toolbar: Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        val linkRecyclerView: RecyclerView = findViewById(R.id.linkRecyclerView)
        linkRecyclerView.layoutManager = LinearLayoutManager(this)
        val linkList = listOf("Main Door", "Switch Care", "General Areas", "Sever Room", "Developer Room") // List of links
        val adapter = LinkAdapter(linkList, this)
        linkRecyclerView.adapter = adapter

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

class LinkAdapter(private val linkList: List<String>, private val context: Context) :
    RecyclerView.Adapter<LinkAdapter.LinkViewHolder>() {

    inner class LinkViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val linkTextView: TextView = itemView.findViewById(R.id.linkTextView)
    }
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): LinkViewHolder {
        val itemView = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_link, parent, false)
        return LinkViewHolder(itemView)
    }

//    override fun onBindViewHolder(holder: LinkViewHolder, position: Int) {
//        val link = linkList[position]
//        holder.linkTextView.text = link
//
//        holder.itemView.setOnClickListener {
//            // Handle click event for the link
//            // You can start a new activity or perform any other action here
//        }
//    }

    //Test to see if main door goes to Google
    override fun onBindViewHolder(holder: LinkViewHolder, position: Int) {
        val link = linkList[position]
        holder.linkTextView.text = link

        holder.itemView.setOnClickListener {
            val searchQuery = "main doors" // The search query for Google Images

            val intent = Intent(Intent.ACTION_VIEW)
            intent.data = Uri.parse("https://www.google.com/search?q=${Uri.encode(searchQuery)}&tbm=isch")
            context.startActivity(intent)
        }
    }

    override fun getItemCount(): Int {
        return linkList.size
    }
}