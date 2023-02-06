import { getItem } from "~~/server/src/item";

export default defineEventHandler(async (_event) => {
  const returnedData = await getItem();
  return {
    message: "success",
    data: returnedData,
  };
});
