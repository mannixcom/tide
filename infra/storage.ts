export const bucket = new sst.aws.Bucket("MyBucket");

export const tidetable = new sst.aws.Dynamo("TideTable",{
  fields:{
    pointId: 'string'
  },
  primaryIndex: {hashKey: "pointId"}
})
