"use strict";

const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;

const fetchItems = async (event) => {
    try {
        const results = await dynamodb.scan({
            TableName: TABLE_NAME,
        }).promise();

        if (results.Items.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "No items found" }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(results.Items),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal server error" }),
        };
    }
};

exports.handler = fetchItems;