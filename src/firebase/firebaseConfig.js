// Importa o core do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
// Importa o Realtime Database
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBvMZpj_fmfEB0IcH9Tg3oH-Q6rC2UqMmg",
  authDomain: "aniversarios-f6a6c.firebaseapp.com",
  databaseURL: "https://aniversarios-f6a6c-default-rtdb.firebaseio.com",
  projectId: "aniversarios-f6a6c",
  storageBucket: "aniversarios-f6a6c.firebasestorage.app",
  messagingSenderId: "973503443451",
  appId: "1:973503443451:web:176da0bc5f43b142c5db5e",
};

// Inicializa
const app = initializeApp(firebaseConfig);
// Exporta o database
export const database = getDatabase(app);
