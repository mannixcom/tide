import { Resource } from "sst";
import { Example } from "@tide/core/example";

console.log(`${Example.hello()} Linked to ${Resource.MyBucket.name}.`);
