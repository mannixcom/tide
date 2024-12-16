import { bucket } from "./storage";

export const tideapi = new sst.aws.ApiGatewayV2("TideApi", {
  transform: {
    route:{
      handler:{
        link: [bucket]
      },
      args: {
        auth: {iam: true}
      },
    }
  }

});
  tideapi.route("GET /tide", "packages/functions/src/api.handler") 