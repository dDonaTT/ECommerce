var express = require("express");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
var multer = require("multer");

var app = express();
app.use(cors());
app.use(express.json());

var CONNECTION_STRING = "mongodb+srv://admin:admin@cluster0.t3pj0cs.mongodb.net/";
var DATABASENAME = "ecommerce";
var database;

app.get("/getNotification", (request, response) => {
  database.collection("ecommercecollection").find({}).toArray((error, result) => {
    if (error) {
      response.status(500).send(error);
    } else {
      console.log(result); 
      response.send(result);
    }
  });
});


app.post("/addNotification", multer().none(), (request, response) => {
  const { newTitle, newMessage, newDate } = request.body;

  if (!newTitle || !newMessage || !newDate) {
    return response.status(400).send("All fields are required");
  }

  database.collection("ecommercecollection").countDocuments({}, (error, numOfDocs) => {
    if (error) {
      return response.status(500).send(error);
    }

    database.collection("ecommercecollection").insertOne({
      id: (numOfDocs + 1).toString(),
      title: newTitle,
      message: newMessage,
      date: newDate,
    }, (err, res) => {
      if (err) {
        response.status(500).send(err);
      } else {
        response.status(201).send("Notification added");
      }
    });
  });
});

app.delete("/deleteNotification/:id", (request, response) => {
  const notificationId = request.params.id;

  database.collection("ecommercecollection").deleteOne({ id: notificationId }, (error, result) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.status(200).send("Notification deleted");
    }
  });
});

app.listen(3001, () => {
  MongoClient.connect(CONNECTION_STRING, (error, client) => {
    if (error) {
      console.error("Failed to connect to the database.", error);
      process.exit(1);
    }
    database = client.db(DATABASENAME);
    console.log("MongoDB Connected Successfully");
  });
});
