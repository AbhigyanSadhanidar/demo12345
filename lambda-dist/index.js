"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;

const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dynamoDb = new aws_sdk_1.default.DynamoDB.DocumentClient();

const handler = async (event) => {
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
        TableName: "resumeTable", // Ensure this DynamoDB table exists
        Item: {
          email,
          name,
          summary: summary || "",
          createdAt: new Date().toISOString(),
        },
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

exports.handler = handler;

