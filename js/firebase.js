// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// ✅ Config Firebase kamu
const firebaseConfig = {
  apiKey: "AIzaSyCGHVLWrxgKfhCgou1tU4TE6IoB47YSnHA",
  authDomain: "koperasiapp-3ed9a.firebaseapp.com",
  projectId: "koperasiapp-3ed9a",
  storageBucket: "koperasiapp-3ed9a.appspot.com",
  messagingSenderId: "384453632263",
  appId: "1:384453632263:web:ade0643cb33614c9f2a5a2",
  measurementId: "G-M3EMXST4S5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fungsi untuk menambahkan Kas ke Firestore
window.addKasFirebase = async (kas) => {
  try {
    await addDoc(collection(db, "kas"), kas);
    return true;
  } catch (err) {
    console.error("Gagal simpan kas:", err);
    alert("❌ Gagal simpan kas");
  }
};

// Fungsi untuk mengambil data Kas dari Firestore
window.loadKasFirebase = async () => {
  const kasArray = [];
  const snapshot = await getDocs(collection(db, "kas"));
  snapshot.forEach(doc => kasArray.push(doc.data()));
  return kasArray;
};