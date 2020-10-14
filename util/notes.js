var AWS = require("aws-sdk");
const { use } = require("../src/routes");
require('dotenv').config();
// var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
// AWS.config.credentials = credentials;
AWS.config.update({region: "us-east-1"});

var docClient = new AWS.DynamoDB.DocumentClient({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  })

const addNote = async (userId, note) => {
       
    var params = {
        TableName: "NotesTable",
        Item:{
            "userId": userId,
            "questionId": note.questionId,
            "note": note.note
        }
    };
    await docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        }
    });
    return note;
}

const getNotes = async (userId) => {
    console.log("looking for ", userId);
    var params = {
        TableName: "NotesTable",
        KeyConditionExpression: "#id = :id",
        ExpressionAttributeNames:{
            "#id": "userId"
        },
        ExpressionAttributeValues: {
            ":id": userId
        }
    };

    let notes = await docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            return data;
        }
    }).promise();
    console.log(notes.Items, 'found ')
    return notes.Items;
}


const updateNote = async (userId, note) => {
       
    var params = {
        TableName: "NotesTable",
        Key:{
            "userId": userId,
            "questionId": note.questionId
        },
        UpdateExpression: "set note = :r",
        ExpressionAttributeValues:{
            ":r": note.note
        }
    };
    await docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        }
    });
    return note;
}



module.exports= {
    getNotes:getNotes,
    addNote:addNote,
    updateNote:updateNote
}