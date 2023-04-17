const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const { id, price } = JSON.parse(event.body);

    const params = {
      TableName: 'Items',
      Item: { id, price }
    };

    await dynamodb.put(params).promise();

    const response = {
      statusCode: 200,
      body: JSON.stringify('Item inserido com sucesso!')
    };

    return response;
  } catch (err) {
    console.error(err);
    
    const response = {
      statusCode: 500,
      body: JSON.stringify('Erro interno do servidor')
    };

    return response;
  }
};
