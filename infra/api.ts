import { bucket, tidetable } from "./storage";

export const tideapi = new sst.aws.ApiGatewayV2("TideApi", {
  transform: {
    route:{
      handler:{
        link: [bucket, tidetable]
      },
      args: {
        auth: {iam: true}
      },
    }
  }

});
  tideapi.route("GET /tide", "packages/functions/src/api.handler");
  tideapi.route("GET /location", "packages/functions/src/getLocation.handler");
  tideapi.route("POST /location", "packages/functions/src/addLocation.handler");
