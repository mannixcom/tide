import { Resource } from "sst";
import * as uuid from "uuid";
import { Util } from "../../core/src/example"
import { Example } from "@tide/core/example";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = Util.handler(async (event) => {
  let data = {
    latitude: "",
    longitude: "",
    tag: "",
    data: {}
  }

  if(event.body != null){
    data = JSON.parse(event.body)
  }
  console.log(event.requestContext.authorizer?.iam.cognitoIdentity.identityId, 'useavailible')
  const params = {
    TableName: Resource.TideTable.name,
    Item:{
      pointId: uuid.v1(),
      userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
      latitude: data.latitude,
      longitude: data.longitude,
      tag: data.tag,
      data: data.data
    }
  }

  await dynamoDb.send(new PutCommand(params))
  return JSON.stringify(params.Item);
});
