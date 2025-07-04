import { handler } from "./index";
import { APIGatewayProxyResult } from "aws-lambda";

const mockEvent = {
  body: JSON.stringify({
    name: "John Doe",
    email: "john@example.com",
    summary: "Experienced developer",
  }),
};

(async () => {
  try {
    const result = await handler(mockEvent as any, {} as any, () => {}) as APIGatewayProxyResult;
    console.log("Lambda response:", result);
  } catch (err) {
    console.error("Lambda error:", err);
  }
})();

