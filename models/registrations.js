var AWS = require('aws-sdk');
AWS.config.loadFromPath('config/api.json');

var dynamodbDoc = new AWS.DynamoDB.DocumentClient();

var tableName = 'registrations';
var params = {
    TableName: tableName
};

module.exports = {
    register: function (registration, callback) {
        var item = {};
        item["email"] = registration.email;
        item["name"] = registration.name;
        params.Item = item;

        dynamodbDoc.put(params, callback);
    },

    getRegistrations: function (callback) {
        dynamodbDoc.scan(params, callback);
    }
};