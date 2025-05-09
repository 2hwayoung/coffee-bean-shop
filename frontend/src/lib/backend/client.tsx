import createClient from "openapi-fetch"; 
import { paths } from "./generated/schema";

const client = createClient<paths>({
  baseUrl: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
