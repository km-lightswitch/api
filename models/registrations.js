var AWS = require('aws-sdk');
AWS.config.loadFromPath('config/api.json');

var dynamodbDoc = new AWS.DynamoDB.DocumentClient();

var tableName = 'registrations';
var params = {
    TableName: tableName
};

function putParams(email, name) {
    return {
        TableName: tableName,
        Item: {
            "email": email,
            "name": name
        },
        ConditionExpression: "#email <> :email",
        ExpressionAttributeNames: {"#email": "email"},
        ExpressionAttributeValues: {
            ":email": email
        }
    };
}

function getParams(email) {
    return {
        TableName: tableName,
        Key: {
            "email": email
        }
    };
}

module.exports = {
    register: function (registration, callback) {
        var params = putParams(registration.email, registration.name);

        dynamodbDoc.put(params, callback);
    },

    listRegistrations: function (callback) {
        dynamodbDoc.scan(params, callback);
    },

    getRegistration: function(email, callback) {
        var params = getParams(email);
        dynamodbDoc.get(params, callback);
    }


};