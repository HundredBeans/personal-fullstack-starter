import { InputItem, insertItem } from "~~/server/src/item";

export default defineEventHandler(async (event) => {
  const body = await readBody<InputItem>(event);
  const returnedData = await insertItem(body);
  return {
    message: "success",
    data: returnedData,
  };
});
