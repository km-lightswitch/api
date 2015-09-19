var AWS = require('aws-sdk');
AWS.config.loadFromPath('config/api.json');

var dynamodb = new AWS.DynamoDB();

var tableName = 'registrations';

dynamodb.listTables({}, function (err, data) {
    if (err) {
        console.error("Error listing tables", err);
    } else {
        console.log("Listing tables", data);
        var tableNames = data.TableNames;
        if (tableNames.indexOf(tableName) == -1) {
            createTable(tableName);
        } else {
            recreateTable(tableName);
        }
    }
});

function recreateTable(tableName) {
    var deleteParams = {
        TableName: tableName
    };
    dynamodb.deleteTable(deleteParams, function (err, data) {
        if (err) {
            console.error("Error deleting table", tableName, err);
        } else {
            console.log("Deleted table", tableName, data);
            createTable(tableName);
        }
    });
}

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