import { firestore } from "../lib/firebase";

export class Test {
  async insert(data: any) {
    return await firestore.collection("test").add(data);
  }
}
