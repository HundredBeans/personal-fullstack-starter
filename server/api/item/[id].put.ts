import { InputItem, updateItem } from "~~/server/src/item";

export default defineEventHandler(async (event) => {
  const body = await readBody<InputItem>(event);
  const id = event.context.params.id;
  await updateItem(id, body);
  return {
    message: "success",
  };
});
