<script setup lang="ts">
import { VForm } from "vuetify/components";
import { InputItem, ReturnedItem } from "~~/server/src/item";

const { data, refresh } = await useFetch<{ data: ReturnedItem[] }>("/api/item");
const itemData = computed(() => {
  return data.value ? data.value.data : [];
});
const formRef = ref<typeof VForm>(null);

const state = reactive({
  name: "",
  type: "",
  descripton: "",
  valid: false,
  selectedId: "",
});

async function submitForm() {
  const { valid } = await formRef.value.validate();

  if (valid) {
    !state.selectedId
      ? await addItem({
          name: state.name,
          type: state.type,
          description: state.descripton,
        })
      : await updateItem(state.selectedId, {
          name: state.name,
          type: state.type,
          description: state.descripton,
        });
  }
}

const setForm = (data: ReturnedItem) => {
  state.descripton = data.description;
  state.name = data.name;
  state.selectedId = data.id;
  state.type = data.type;
};

const deleteItem = async (id: string) => {
  await useFetch(`/api/item/${id}`, {
    method: "delete",
  });
  await refresh();
};

const addItem = async (data: InputItem) => {
  await useFetch("/api/item", {
    method: "post",
    body: data,
  });
  await refresh();
};

const updateItem = async (id: string, data: Partial<InputItem>) => {
  await useFetch(`/api/item/${id}`, {
    method: "put",
    body: data,
  });
  await refresh();
};
</script>

<template>
  <v-container fluid>
    <h1 class="pr-4">Item Page</h1>
    <div>
      <v-form ref="formRef" v-model="state.valid">
        <v-text-field
          v-model="state.name"
          label="Name"
          :rules="[
            (v) => (!state.selectedId ? !!v : true) || 'Name is required',
          ]"
          required
        ></v-text-field>
        <v-text-field
          v-model="state.type"
          label="Type"
          :rules="[
            (v) => (!state.selectedId ? !!v : true) || 'Type is required',
          ]"
          required
        ></v-text-field>
        <v-text-field
          v-model="state.descripton"
          label="Description"
          :rules="[
            (v) =>
              (!state.selectedId ? !!v : true) || 'Description is required',
          ]"
          required
        ></v-text-field>
      </v-form>
      <v-btn @click="submitForm">{{
        state.selectedId ? `Update ${state.selectedId}` : "New Item"
      }}</v-btn>
    </div>
    <br />
    <div class="d-flex justify-space-between flex-wrap">
      <v-card
        v-for="item of itemData"
        :key="item.id"
        variant="outlined"
        width="300"
      >
        <v-card-title> {{ item.name }} </v-card-title>
        <v-card-subtitle>{{
          new Date(item.createdAt).toLocaleString()
        }}</v-card-subtitle>
        <v-card-text>{{ item.description }}</v-card-text>
        <v-card-actions>
          <v-btn @click="deleteItem(item.id)">Delete</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="tertiary" @click="setForm(item)">Update</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

<style lang="scss" scoped>
.d-flex {
  gap: 24px;
}
</style>
