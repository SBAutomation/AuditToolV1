// server/index.js
/* The line `process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";` is setting the environment variable
`NODE_TLS_REJECT_UNAUTHORIZED` to the value of `"0"`. */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require("express");
const path = require("path");
const cors = require("cors");
const { Client } = require("pg");

const app = express();
/* The line `const PORT = process.env.PORT || 3001;` is setting the value of the `PORT` constant. */
const PORT = process.env.PORT || 3001;

/* The line `const buildPath = path.join(__dirname, "..", "audit/build");` is creating a file path to
the `build` directory inside the `audit` directory. */
// const buildPath = path.join(__dirname, "..", "audit/build");
const buildPath = path.join(__dirname, "build");

app.use(express.static(buildPath));

/* `app.use(express.json())` is a middleware function in Express.js that parses incoming requests with
JSON payloads. It allows the server to handle JSON data sent in the request body. This middleware
adds a `body` property to the `request` object, containing the parsed JSON data. */
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
});

// ----------------------------------------------------------
app.get("/api", async (req, res) => {
    // ----------------------------------------------------------
    // Replace the following with your actual database connection details
    const config = {
        user: "admin",
        password: "WAT499er!",
        host: "10.34.3.86",
        database: "raritan",
        port: 5432, // Replace with your PostgreSQL port if it's different
    };

    // Your SQL query
    const query = `SELECT "ModelName" from odbc."dcModels"`;

    // Create a new PostgreSQL client
    const client = new Client(config);

    // Connect to the database
    client.connect();
    if (client.connect) {
        console.log("Connected to database");
    }

    // Perform the query
    client.query(query, (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            client.end();
            return;
        }

        // Close the client connection
        client.end();

        // Convert the query result to JSON and print it
        // const jsonResult = JSON.stringify(result.rows);
        // console.log(jsonResult);
        res.json(result.rows);
    });
});

///model?type=makes&user=admin&pass=sunbird
//----------------------------------------------------------
// app.get("/api", async (req, res) => {
//     /* The line `const urlInput = req.query.type;` is extracting the value of the `type` query
//     parameter from the request URL. */
//     const urlInput = req.query.type;
//     const domain = req.query.domain;
//     const user = req.query.user;
//     const pass = req.query.pass;

//     try {
//         var myHeaders = new Headers();
//         // myHeaders.append("Authorization", "Basic YWRtaW46c3VuYmlyZA==");

//         // myHeaders.append("Authorization", "Basic " + btoa(`${user}:${pass}`));

//         var requestOptions = {
//             method: "GET",
//             headers: myHeaders,
//             redirect: "follow",
//         };

//         const response = await fetch(
//             // `https://${domain}/api/v2/dcimoperations/search/${urlInput}/hp`,
//             "https://10.34.3.86/api/v2/dcimoperations/search/makes/hp",
//             requestOptions
//         );
//         const result = await response.text();

//         res.json({ message: result });
//     } catch (error) {
//         console.log("error", error);
//         res.status(500).json({
//             error: "Something went wrong. Check the server",
//         });
//     }
// });
//----------------------------------------------------------
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
