import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { CosmosClient } from "@azure/cosmos";

const endpoint = "https://tailwindz.documents.azure.com:443/";
const key =
  "LlaC0cYzRCO9KMxTt4FBb5sRpWqocG1hK0sWkb2EDJqqx9LYXs2yI2Ms1QCJMJYFYPOFrMom5dzXOukxzzk7ig==";
const client = new CosmosClient({ endpoint, key });

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  const database = client.database("tailwind");
  const container = database.container("products");

  let iterator = container.items.readAll();

  let items = await iterator.fetchAll();

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: items.resources
  };
};

export default httpTrigger;
