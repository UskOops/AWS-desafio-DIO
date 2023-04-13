'use strict';

const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const updateItem = async (event) => {

  // Obtém o ID do item da URL da solicitação
  const { id } = event.pathParameters;

  // Verifica se o ID é um valor válido no formato UUID
  if (!isValidUUID(id)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid item ID' })
    };
  }

  // Obtém o valor do campo "itemStatus" do corpo da solicitação
  const { itemStatus } = JSON.parse(event.body);

  // Verifica se o valor do campo "itemStatus" é um valor booleano válido
  if (typeof itemStatus !== 'boolean') {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid item status' })
    };
  }

  // Atualiza o registro no banco de dados
  await dynamodb.update({
    TableName: 'ItemTable',
    Key: { id },
    UpdateExpression: 'set itemStatus = :itemStatus',
    ExpressionAttributeValues: {
      ':itemStatus': itemStatus
    },
    ReturnValues: 'ALL_NEW'
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Item updated' })
  };
};

// Função que verifica se o valor fornecido é um UUID válido
function isValidUUID(uuid) {
  const uuidv4Regex = /^[0-9a-f]{8}-?[0-9a-f]{4}-?4[0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}$/i;
  return uuidv4Regex.test(uuid);
}

module.exports = {
  handler: updateItem
};
