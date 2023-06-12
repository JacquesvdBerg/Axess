get_requests()

function get_requests() {
    //Initialise the header row
    document.getElementById('head').innerHTML = `
        <tr>
            <th scope="col" class="px-6 py-3">
                ID
            </th>
            <th scope="col" class="px-6 py-3 capitalize">
                Full Name
            </th>

            <th scope="col" class="px-6 py-3">
                Email
            </th>
            <th scope="col" class="px-6 py-3">
                Working Area
            </th>
            <th scope="col" class="px-6 py-3">
                Requested Areas
            </th>
            <th scope="col" class="px-6 py-3">
                <span class="sr-only">Approve</span>
            </th>
        </tr>
    `;
    //Clear the table rows
    document.getElementById('rows').innerHTML = "";

    // Create a new XHR object
    var xhttp = new XMLHttpRequest();

    // Set up the request
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Request completed successfully
            var response = JSON.parse(this.responseText);
            // Here you handle the response
            if (response.length === 0) {
                // jsonData is empty or contains no rows
                console.log("No data found.");
                var image = `
                    <div class="flex justify-center items-center">
                        <img class="mx-auto" src="../images/no-requests.png" height="200px" width="200px" alt="">
                        <h1 class="text-2xl">No Requests Found...</h1>
                    </div>
                `;
                document.getElementById('rows').innerHTML += image;
            } else {
                // jsonData has rows
                console.log("Data found.");
                // Iterate over the JSON data using forEach
                response.forEach(function (item) {
                    // Access individual columns
                    var ID = item.requestID;
                    var name = item.name;
                    var surname = item.surname;
                    var email = item.email;
                    var password = item.password;
                    var workingArea = item.workingArea;
                    var areasRequested = item.areasRequested;

                    // console.log("ID:", ID);
                    // console.log("Name:", name);
                    // console.log("Surname:", surname);
                    // console.log("Email:", email);
                    // console.log("Password:", password);
                    // console.log("Working Area:", workingArea);
                    // console.log("Areas Requested:", areasRequested);

                    var row = `
                        <tr id="${ID}" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="px-6 py-4">
                                ${ID}
                            </td>
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                ${name} ${surname}
                            </th>

                            <td class="px-6 py-4">
                                <a href="mailto:${email}">${email}</a>
                            </td>
                            <td class="px-6 py-4 capitalize">
                                ${workingArea}
                            </td>
                            <td class="px-6 py-4 capitalize">
                                ${areasRequested}
                            </td>
                            <td class="px-6 py-4 text-right">
                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onclick="add_user('${ID}')">Approve</a>
                            </td>
                        </tr>
                    `;
                    document.getElementById('rows').innerHTML += row;
                });
            }
        }
    };

    // Open the request
    xhttp.open('POST', 'get_requests.php', true);

    // Set the request headers (if necessary)
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // Prepare the data to be sent
    var data = '';

    // Send the request with the data
    xhttp.send(data);
}

function get_users() {
    //Initialise the header row
    document.getElementById('head').innerHTML = `
        <tr>
            <th scope="col" class="px-6 py-3">
                User ID
            </th>
            <th scope="col" class="px-6 py-3 capitalize">
                Full Name
            </th>

            <th scope="col" class="px-6 py-3">
                Email
            </th>
            <th scope="col" class="px-6 py-3">
                Working Area
            </th>
            <th scope="col" class="px-6 py-3">
                Accessible Areas
            </th>
            <th scope="col" class="px-6 py-3">
                <span class="sr-only">Remove</span>
            </th>
        </tr>
    `;
    //Clear the table rows
    document.getElementById('rows').innerHTML = "";

    // Create a new XHR object
    var xhttp = new XMLHttpRequest();

    // Set up the request
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Request completed successfully
            var response = JSON.parse(this.responseText);
            // Here you handle the response
            if (response.length === 0) {
                // jsonData is empty or contains no rows
                console.log("No data found.");
                var image = `
                    <div class="flex justify-center items-center">
                        <img class="mx-auto" src="../images/no-requests.png" height="200px" width="200px" alt="">
                        <h1 class="text-2xl">No Users Found...</h1>
                    </div>
                `;
                document.getElementById('rows').innerHTML += image;
            } else {
                // jsonData has rows
                console.log("Data found.");
                // Iterate over the JSON data using forEach
                response.forEach(function (item) {
                    // Access individual columns
                    var ID = item.userID;
                    var name = item.name;
                    var surname = item.surname;
                    var email = item.email;
                    var password = item.password;
                    var workingArea = item.workingArea;
                    var areasRequested = item.areasAccessible;

                    // console.log("ID:", ID);
                    // console.log("Name:", name);
                    // console.log("Surname:", surname);
                    // console.log("Email:", email);
                    // console.log("Password:", password);
                    // console.log("Working Area:", workingArea);
                    // console.log("Areas Requested:", areasRequested);

                    var row = `
                        <tr id="${ID}" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="px-6 py-4">
                                ${ID}
                            </td>
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                ${name} ${surname}
                            </th>

                            <td class="px-6 py-4">
                                <a href="mailto:${email}">${email}</a>
                            </td>
                            <td class="px-6 py-4 capitalize">
                                ${workingArea}
                            </td>
                            <td class="px-6 py-4 capitalize">
                                ${areasRequested}
                            </td>
                            <td class="px-6 py-4 text-right">
                                <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline" onclick="remove_user('${ID}')">Remove</a>
                            </td>
                        </tr>
                    `;
                    document.getElementById('rows').innerHTML += row;
                });
            }
        }
    };

    // Open the request
    xhttp.open('POST', 'get_users.php', true);

    // Set the request headers (if necessary)
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // Prepare the data to be sent
    var data = '';

    // Send the request with the data
    xhttp.send(data);
}

function get_areas() {
    //Initialise the header row
    document.getElementById('head').innerHTML = `
        <tr>
            <th scope="col" class="px-6 py-3">
                Area ID
            </th>
            <th scope="col" class="px-6 py-3 capitalize">
                Area Name
            </th>
        </tr>
    `;
    //Clear the table rows
    document.getElementById('rows').innerHTML = "";

    // Create a new XHR object
    var xhttp = new XMLHttpRequest();

    // Set up the request
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Request completed successfully
            var response = JSON.parse(this.responseText);
            // Here you handle the response
            if (response.length === 0) {
                // jsonData is empty or contains no rows
                console.log("No data found.");
                var image = `
                    <div class="flex justify-center items-center">
                        <img class="mx-auto" src="../images/no-requests.png" height="200px" width="200px" alt="">
                        <h1 class="text-2xl">No Areas Found...</h1>
                    </div>
                `;
                document.getElementById('rows').innerHTML += image;
            } else {
                // jsonData has rows
                console.log("Data found.");
                // Iterate over the JSON data using forEach
                response.forEach(function (item) {
                    // Access individual columns
                    var ID = item.areaID;
                    var name = item.areaName;

                    // console.log("ID:", ID);
                    // console.log("Name:", name);

                    var row = `
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="px-6 py-4">
                                ${ID}
                            </td>
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                ${name}
                            </th>
                        </tr>
                    `;
                    document.getElementById('rows').innerHTML += row;
                });
            }
        }
    };

    // Open the request
    xhttp.open('POST', 'get_areas.php', true);

    // Set the request headers (if necessary)
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // Prepare the data to be sent
    var data = '';

    // Send the request with the data
    xhttp.send(data);
}

function get_logs() {
    //Initialise the header row
    document.getElementById('head').innerHTML = `
        <tr>
            <th scope="col" class="px-6 py-3">
                ID
            </th>
            <th scope="col" class="px-6 py-3 capitalize">
                User
            </th>
            <th scope="col" class="px-6 py-3 capitalize">
                User ID
            </th>
            <th scope="col" class="px-6 py-3">
                Area ID
            </th>
            <th scope="col" class="px-6 py-3">
                Area Name
            </th>
            <th scope="col" class="px-6 py-3">
                Time
            </th>
        </tr>
    `;
    //Clear the table rows
    document.getElementById('rows').innerHTML = "";

    // Create a new XHR object
    var xhttp = new XMLHttpRequest();

    // Set up the request
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Request completed successfully
            var response = JSON.parse(this.responseText);
            // Here you handle the response
            if (response.length === 0) {
                // jsonData is empty or contains no rows
                console.log("No data found.");
                var image = `
                    <div class="flex justify-center items-center">
                        <img class="mx-auto" src="../images/no-requests.png" height="200px" width="200px" alt="">
                        <h1 class="text-2xl">No Access Logs Found...</h1>
                    </div>
                `;
                document.getElementById('rows').innerHTML += image;
            } else {
                // jsonData has rows
                console.log("Data found.");
                // Iterate over the JSON data using forEach
                response.forEach(function (item) {
                    // Access individual columns
                    var ID = item.id;
                    var name = item.userName;
                    var surname = item.surname;
                    var userID = item.userID;
                    var areaID = item.areaID;
                    var areaName = item.areaName;
                    var time = item.time;

                    // console.log("ID:", ID);
                    // console.log("Username:", username);
                    // console.log("UserID:", userID);
                    // console.log("AreaID:", areaID);
                    // console.log("AreaName:", areaName);
                    // console.log("Time:", time);

                    var row = `
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="px-6 py-4">
                                ${ID}
                            </td>
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                ${name} ${surname}
                            </th>

                            <td class="px-6 py-4">
                                ${userID}
                            </td>
                            <td class="px-6 py-4 capitalize">
                                ${areaID}
                            </td>
                            <td class="px-6 py-4 capitalize">
                                ${areaName}
                            </td>
                            <td class="px-6 py-4 capitalize">
                                ${time}
                            </td>
                            <td class="px-6 py-4 text-right">
                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</a>
                            </td>
                        </tr>
                    `;
                    document.getElementById('rows').innerHTML += row;
                });
            }
        }
    };

    // Open the request
    xhttp.open('POST', 'get_logs.php', true);

    // Set the request headers (if necessary)
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // Prepare the data to be sent
    var data = '';

    // Send the request with the data
    xhttp.send(data);
}

function add_user(ID) {
    // Implement the add_user() function logic here
    // Create a new XHR object
    console.log("ID that got passed into here:", ID);
    var xhttp = new XMLHttpRequest();

    // Set up the request
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Request completed successfully
            console.log(this.responseText)
            get_requests();
        }
    };

    // Open the request
    xhttp.open('POST', 'add_user.php', true);

    // Set the request headers (if necessary)
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // Prepare the data to be sent
    var data = "id=" + ID;

    // Send the request with the data
    xhttp.send(data);
}

function remove_user(ID) {
    // Implement the remove_user() function logic here
    // Create a new XHR object
    console.log("ID that got passed into the remove:", ID);
    var xhttp = new XMLHttpRequest();

    // Set up the request
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Request completed successfully
            console.log(this.responseText)
            get_users();
        }
    };

    // Open the request
    xhttp.open('POST', 'remove_user.php', true);

    // Set the request headers (if necessary)
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // Prepare the data to be sent
    var data = "id=" + ID;

    // Send the request with the data
    xhttp.send(data);
}

function setActiveClass(element) {
    // Remove the active class from all anchor tags
    const anchorTags = document.querySelectorAll("#logo-sidebar a");
    anchorTags.forEach((a) => a.classList.remove("active"));

    // Add the active class to the clicked anchor tag
    element.classList.add("active");
}

// Add the click event listener to each anchor tag
const anchorTags = document.querySelectorAll("#logo-sidebar a");
anchorTags.forEach((a) => {
    a.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default anchor tag behavior
        setActiveClass(a);
    });
});

function logout() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'logout.php', true);
    xhr.withCredentials = true; // Send cookies along with the request

    xhr.onload = function () {
        if (xhr.status === 200) {
            // Redirect to the login page or any desired page
            window.location.href = 'index.html';
        } else {
            console.log('Logout failed');
        }
    };

    xhr.onerror = function () {
        console.log('Error occurred during logout');
    };

    xhr.send();
}