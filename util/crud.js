// var AWS = require("aws-sdk");
// var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
// AWS.config.credentials = credentials;
// AWS.config.update({region: "us-east-1"});

// var docClient = new AWS.DynamoDB.DocumentClient();

// const handleCreate = (userId, state) => {
//     var params = {
//         TableName: TABLE_NAME,
//         Item:{
//             "user": userId,
//             "state": state
//         }
//     };

//     console.log("Adding a new item...");
//     docClient.put(params, function(err, data) {
//         if (err) {
//             console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
//         } else {
//             console.log("Added item:", JSON.stringify(data, null, 2));
//         }
//     });
// }

// const handleGet = (userId) => {
//     var params = {
//         TableName: TABLE_NAME,
//         Key:{
//             "user": userId
//         }
//     };

//     docClient.get(params, function(err, data) {
//         if (err) {
//             console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
//         } else {
//             console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
//         }
//     });
// }

// const handleDelete = (userId) => {
//     var params = {
//         TableName: TABLE_NAME,
//         Key:{
//             "user": userId
//         }
//     };

//     docClient.delete(params, function(err, data) {
//         if (err) {
//             console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
//         } else {
//             console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
//         }
//     });
// }


// module.exports = {
//     handleCreate: handleCreate,
//     handleDelete: handleDelete,
//     handleDelete : handleDelete ,
// };

