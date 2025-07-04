import type { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body || "{}");
    const { name, email, summary } = body;

    if (!name || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Name and email are required." }),
      };
    }

    await dynamoDb
      .put({
        TableName: "resumeTable", // Make sure this table exists
        Item: {
          email,
          name,
          summary: summary || "",
          createdAt: new Date().toISOString()
        }
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User info saved successfully!" }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};

