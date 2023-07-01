import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Kryteria zaliczenia
// Użyj tego szablonu projektu React jako punktu wyjścia dla swojej aplikacji.
// https://github.com/goitacademy/react-homework-template#readme
// Utworzone zostały repozytoria goit-react-hw-03-phonebook i goit-react-hw-03-image-finder.
// Zadanie domowe zawiera odnośniki: do plików źródłowych i strony roboczej projektów na GitHub Pages.
// W stanie komponentów przechowywany jest minimalny niezbędny zestaw danych, pozostałe są obliczane.
// Po uruchomieniu kodu zadania na konsoli nie ma błędów i ostrzeżeń.
// Dla każdego komponentu istnieje oddzielny folder z plikiem komponentu React i plikiem stylów.
// Dla komponentów opisane są propTypes.
// Wszystko, czego komponent żąda w postaci propsów, jest do niego przekazywane przy wywołaniu.
// Nazwy komponentów są zrozumiałe, opisowe.
// Kod JS jest czysty i zrozumiały, wykorzystany został Prettier.
// Stylizacja wykonana CSS-modułami lub Styled Components.
