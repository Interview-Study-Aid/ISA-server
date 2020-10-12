var AWS = require("aws-sdk");
var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;
AWS.config.update({region: "us-east-1"});

var docClient = new AWS.DynamoDB.DocumentClient();

const handleCreate = (userName, userPassword) => {
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

const handleGet = (userName) => {
    var params = {
        TableName: "UserTable",
        Key:{
            "userName": userName
        }
    };

    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            return data;
        }
    });
}




module.exports = {
    createUser:handleCreate,
    handleGet:handleGet
}