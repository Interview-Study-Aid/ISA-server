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

const createUser = (userName, userPassword) => {
    var params = {
        TableName: "UserTable",
        Item:{
            "userName": userName,
            "userPassword": userPassword
        }
    };

    console.log("Adding a new user...");
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added user:", JSON.stringify(data, null, 2));
        }
    });

    return {userName, userPassword};
}

const getUser = async (userName, userPassword) => {
    console.log("looking for ", userName, userPassword);
    var params = {
        TableName: "UserTable",
        Key: {
            "userName": userName, 
            "userPassword": userPassword
        }, 
    };

    let user = await docClient.get(params, function(err, data) {
        if (err) {
            return null
        } else {
            return data.item;
        }
    }).promise();

    return Object.keys(user).length === 0 ? null : user;
}

module.exports = {
    createUser:createUser,
    getUser:getUser
}