const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

const usersTable = process.env.USERS_TABLE;
const productsTable = process.env.PRODUCTS_TABLE;

const response = (code, data = {}) => ({
  statusCode: code,
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json"
  }
});

module.exports.handler = async (event) => {
  const { path, httpMethod, body } = event;

  try {
    if (path === "/users") {
      if (httpMethod === "GET") {
        const data = await dynamo.scan({ TableName: usersTable }).promise();
        return response(200, data);
      }

      if (httpMethod === "POST") {
        await dynamo.put({ TableName: usersTable, Item: JSON.parse(body)}).promise();
        return response(200);
      }
    }

    if (path === "/products") {
      if (httpMethod === "GET") {
        const data = await dynamo.scan({ TableName: productsTable }).promise();
        return response(200, data);
      }

      if (httpMethod === "POST") {
        await dynamo.put({ TableName: productsTable, Item: JSON.parse(body)}).promise();
        return response(200);
      }
    }
  } catch (err) {
    return response(500, { msg: err.message })
  }
}