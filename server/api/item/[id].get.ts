import { getItem } from "~~/server/src/item";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const returnedData = await getItem(id);
  if (!returnedData) {
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: "Item not found",
      })
    );
  }
  return {
    message: "success",
    data: returnedData,
  };
});
