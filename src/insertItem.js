"use strict";

const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;

const insertItem = async (event) => {
  try {
    const { item } = JSON.parse(event.body);

    if (!item) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Item is required" }),
      };
    }

    const createdAt = new Date().toISOString();
    const id = v4();

    const newItem = {
      id,
      item,
      createdAt,
      itemStatus: false,
    };

    await dynamodb.put({
      TableName: TABLE_NAME,
      Item: newItem,
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(newItem),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};

exports.handler = insertItem;