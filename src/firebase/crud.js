import { database } from "./firebaseConfig.js";

import {
  ref,
  push,
  set,
  get,
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";

const referencia = ref(database, "Pessoas");

export async function salvar(nome, data, imagem) {
  const novo = push(referencia);

  await set(novo, {
    nome,
    data,
    imagem,
  });
}

export async function listar() {
  const snapshot = await get(referencia);

  if (snapshot.exists()) {
    return snapshot.val();
  }

  return {};
}
