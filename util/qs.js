var AWS = require("aws-sdk");
var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;
AWS.config.update({region: "us-east-1"});

var docClient = new AWS.DynamoDB.DocumentClient();

const habdleGet = async () => {
    var params = {
        TableName : "QuestionTable",
        Select: "ALL_ATTRIBUTES"
    };
    
    let scanResults = [];
    let items;
    do{
        items =  await docClient.scan(params).promise();
        items.Items.forEach((item) => scanResults.push(item));
        params.ExclusiveStartKey  = items.LastEvaluatedKey;
    }while(typeof items.LastEvaluatedKey != "undefined");

    return scanResults;
}

module.exports = habdleGet;

