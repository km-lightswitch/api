var AWS = require('aws-sdk');
AWS.config.loadFromPath('config/api.json');

var dynamodb = new AWS.DynamoDB();
var dynamodbDoc = new AWS.DynamoDB.DocumentClient();

var tableName = 'registrations';

dynamodb.listTables({}, function (err, data) {
    if (err) {
        console.error("Error listing tables", err);
    } else {
        console.log("Listing tables", data);
        var tableNames = data.TableNames;
        if (tableNames.indexOf(tableName) == -1) {
            console.log("Creating table");
            createTable(tableName);
        } else {
            console.log("Table already exists:", tableName);
        }
        ;
    }
});


function createTable(tableName) {
    var createParams = {
        TableName: tableName,
        KeySchema: [
            {AttributeName: "email", KeyType: "HASH"},
            {AttributeName: "name", KeyType: "RANGE"}
        ],
        AttributeDefinitions: [
            {AttributeName: "email", AttributeType: "S"},
            {AttributeName: "name", AttributeType: "S"}
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        }
    };

    dynamodb.createTable(createParams, function (err, data) {
        if (err) {
            console.error("Unable to create table", tableName, err);
        } else {
            console.log("Created table", tableName, data);
        }
    });
}

var scanParams = {
    TableName: tableName,
};


module.exports = {
    getRegistrations: function (callback) {
        dynamodbDoc.scan(scanParams, callback);
    }
};