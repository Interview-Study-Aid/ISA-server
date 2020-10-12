const USER_TABLE_NAME = "UserTable";
const QUESTIONS_TABLE_NAME = "QuestionTable";
const NOTES_TABLE_NAME = "NotesTable";

var AWS = require("aws-sdk");
var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;
AWS.config.update({region: "us-east-1"});



var dynamodb = new AWS.DynamoDB();




const createTable = (params) => {
    dynamodb.createTable(params, function(err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
}


let createUserTable = async () => {
    var params = {
        TableName : USER_TABLE_NAME,
        KeySchema: [
            { AttributeName: "userName", KeyType: "HASH"},  //Partition key
            { AttributeName: "userPassword", KeyType: "RANGE" }  //Sort key
        ],
        AttributeDefinitions: [
            { AttributeName: "userName", AttributeType: "S" },
            { AttributeName: "userPassword", AttributeType: "S" }
        ],
        BillingMode: "PAY_PER_REQUEST"
    };
    createTable(params)
}


let createNotesTable = async () => {
    var params = {
        TableName : NOTES_TABLE_NAME,
        KeySchema: [
            { AttributeName: "userId", KeyType: "HASH"},  //Partition key
            { AttributeName: "notes", KeyType: "RANGE" }  //Sort key
        ],
        AttributeDefinitions: [
            { AttributeName: "userId", AttributeType: "S" },
            { AttributeName: "notes", AttributeType: "S" }
        ],
        BillingMode: "PAY_PER_REQUEST"
    };
    createTable(params)
}

let createQuestionTable = async () => {
    var params = {
        TableName : QUESTIONS_TABLE_NAME,
        KeySchema: [
            { AttributeName: "id", KeyType: "HASH"}  //Partition key
        ],
        AttributeDefinitions: [
            { AttributeName: "id", AttributeType: "S" },
            { AttributeName: "questionAnswer", AttributeType: "S" },
            { AttributeName: "caregory", AttributeType: "S" },  //Sort key
        ],
        GlobalSecondaryIndexes: [{
            IndexName: "caregoryIndex",
            KeySchema: [
                {
                    AttributeName: "caregory",
                    KeyType: "HASH"
                },
                {
                    AttributeName: "questionAnswer",
                    KeyType: "RANGE"
                }
            ],
            Projection: {
                ProjectionType: "ALL"
            }       
         }],
        BillingMode: "PAY_PER_REQUEST"
    };
    createTable(params)
}

let setupAllTables = async () => {
    dynamodb.listTables({Limit: 10}, function(err, data) {
        if (err) {
          console.log("Error", err.code);
        } else {
          console.log("Table names are ", data.TableNames);
          if(!data.TableNames.includes(USER_TABLE_NAME)) {
              createUserTable();
            }
          if(!data.TableNames.includes(QUESTIONS_TABLE_NAME)) {
              createQuestionTable();
            }
          if(!data.TableNames.includes(NOTES_TABLE_NAME)) {
              createNotesTable();
            }
        }
      });
    }

// module.exports = setupAllTables;


setupAllTables();
