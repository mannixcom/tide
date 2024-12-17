import { Resource } from "sst";
import * as uuid from "uuid";
import { Util } from "../../core/src/example"
import { Example } from "@tide/core/example";
import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = Util.handler(async (event) => {
 
  console.log(Resource.TideTable.name,'event')
  const input = {
    TableName: Resource.TideTable.name,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
    },
  }

  const result = await dynamoDb.send(new QueryCommand(input));
  console.log(result, 'result')
  return JSON.stringify(result.Items);
});
