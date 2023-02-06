import { firestore, timestamp } from "../lib/firebase";

// Models
export type Item = {
  id: string;
  name: string;
  description: string;
  type: string;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
};

export type ReturnedItem = Omit<Item, "createdAt" | "updatedAt"> & {
  createdAt: Date;
  updatedAt: Date;
};

export type InputItem = Omit<Item, "id" | "createdAt" | "updatedAt">;

export async function insertItem(data: InputItem) {
  const docSnapshot = await firestore.collection("item").add({
    ...data,
    createdAt: timestamp(),
    updatedAt: timestamp(),
  });
  const itemSnapshot = await docSnapshot.get();
  const itemData = itemSnapshot.data() as Omit<Item, "id">;
  return {
    ...itemData,
    id: itemSnapshot.id,
    createdAt: itemData.createdAt.toDate(),
    updatedAt: itemData.updatedAt.toDate(),
  };
}

// CRUD Functions
export async function updateItem(id: string, data: InputItem) {
  return await firestore
    .collection("item")
    .doc(id)
    .update({
      ...data,
      updatedAt: timestamp(),
    });
}

export async function getItem(id?: string) {
  if (id) {
    const docSnapshot = await firestore.collection("item").doc(id).get();
    if (docSnapshot.exists) {
      const itemData = docSnapshot.data() as Omit<Item, "id">;
      return {
        ...itemData,
        id: docSnapshot.id,
        createdAt: itemData.createdAt.toDate(),
        updatedAt: itemData.updatedAt.toDate(),
      };
    } else {
      return null;
    }
  } else {
    const docSnapshots = await firestore.collection("item").get();
    const result: ReturnedItem[] = [];
    docSnapshots.forEach((doc) => {
      const itemData = doc.data() as Omit<Item, "id">;
      result.push({
        ...itemData,
        id: doc.id,
        createdAt: itemData.createdAt.toDate(),
        updatedAt: itemData.updatedAt.toDate(),
      });
    });
    return result;
  }
}

export async function deleteItem(id: string) {
  return await firestore.collection("item").doc(id).delete();
}
