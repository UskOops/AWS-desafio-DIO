"use strict";

const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;

const fetchItem = async (event) => {
    const { id } = event.pathParameters;

    try {
        const result = await dynamodb.get({
            TableName: TABLE_NAME,
            Key: { id },
        }).promise();
        if (!result.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "Item not found" }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(result.Item),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal server error" }),
        };
    }
};

exports.handler = fetchItem;