// Importar os módulos necessários
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
//import { getAnalytics } from "firebase/analytics";



// Configuração do Firebase (coloque os valores do Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyDqMj02srKYjOa9cDxPAo3e0LY5SSd1tvE",
    authDomain: "cardapioweb-accd0.firebaseapp.com",
    projectId: "cardapioweb-accd0",
    storageBucket: "cardapioweb-accd0.appspot.com", // Corrigido o valor do storageBucket
    messagingSenderId: "289081688430",
    appId: "1:289081688430:web:abec0f7ae96fc99f9bc17f",
    measurementId: "G-LRW3K53RS3",
};

// Inicializar o Firebase App
const app = initializeApp(firebaseConfig);

// Inicializar os serviços
//const analytics = getAnalytics(app); // Para rastrear eventos (opcional)
export const storage = getStorage(app); // Para o Firebase Storage
