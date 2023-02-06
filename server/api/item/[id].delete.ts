import { deleteItem } from "~~/server/src/item";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  await deleteItem(id);
  return {
    message: "success",
  };
});
