import React, { Component } from 'react';
import css from './App.module.css';
import { ContactForm } from './contactform/ContactForm';
import { Filter } from './filter/Filter';
import { ContactList } from './contactlist/ContactList';
import Notiflix from 'notiflix';
import { nanoid } from 'nanoid';
import { localStorageLoad } from '../js/system/localstorage';
import {
  localStorageGetStatus,
  localStorageAdd,
  localStorageRemove,
} from '../js/locallibrary/locallibrary';

export class App extends Component {
  static propTypes = {};
  static defaultProps = {
    initialValue: 0,
  };

  localStorageLibraryName = 'contacts';

  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      // contacts: [
      //   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      //   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      //   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      //   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      //   { id: 'id-5', name: 'Harry Potter', number: '459-12-56' },
      //   { id: 'id-6', name: 'Hermione Grande', number: '443-89-12' },
      //   { id: 'id-7', name: 'Diana Prince', number: '645-17-79' },
      // ],
      filter: '',
    };
  }

  handleAddContact = evt => {
    evt.preventDefault();
    const name = evt.target.form.name.value;
    const number = evt.target.form.number.value;
    const id = nanoid();
    if (
      name !== '' &&
      this.state.contacts.find(contact => contact.name === name)
    ) {
      Notiflix.Notify.info('Contact allready exists');
      return;
    }
    if (name === '' || number === '') {
      Notiflix.Notify.warning('Please input missing data');
      return;
    }
    const regexName = new RegExp("^[a-zA-Za]+(([' -][a-zA-Za])?[a-zA-Za]*)*$");
    const regexNumberPattern =
      /^\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    const regexNumber = new RegExp(regexNumberPattern);
    if (!regexName.test(name) || !regexNumber.test(number)) {
      Notiflix.Notify.failure('Correct inputed data');
      return;
    }
    Notiflix.Notify.success('Adding new contact');
    const element = localStorageGetStatus(
      this.localStorageLibraryName,
      name,
      'name'
    ); //  libraryName, element, keySearch
    if (element !== undefined) {
      Notiflix.Notify.info('Contact allready exists in localstorage');
      //resolve: remove contact, add contact with new id?
    } else {
      localStorageAdd(this.localStorageLibraryName, {
        id: id,
        name: name,
        number: number,
      }); //libraryName, object
    }

    this.setState(prevState => {
      return {
        contacts: [
          ...prevState.contacts,
          {
            id: id,
            name: name,
            number: number,
          },
        ],
      };
    });
    evt.target.form.reset();
  };

  handleDeleteContact = evt => {
    evt.preventDefault();
    const id = evt.target.dataset.id;

    const element = localStorageGetStatus(
      this.localStorageLibraryName,
      id,
      'id'
    ); // libraryName, element, keySearch
    if (element !== undefined) {
      localStorageRemove(this.localStorageLibraryName, id, 'id');
    } else {
      Notiflix.Notify.info('Contact does not exists in localstorage');
    }
    this.setState(prevState => {
      const contactsLocal = [...prevState.contacts];
      const index = contactsLocal.findIndex(element => element.id === id);
      if (index > -1) {
        contactsLocal.splice(index, 1);
      }
      return {
        contacts: [...contactsLocal],
      };
    });
  };

  handleFilterContact = evt => {
    this.setState(prevState => {
      return { filter: evt.target.value };
    });
  };

  render() {
    return (
      <div className={css.app_holder}>
        <h1 className={css.app_title}>Phonebook</h1>
        <ContactForm addContact={this.handleAddContact} />
        <h2 className={css.app_subtitle}>Contacts</h2>
        <Filter
          inputValue={this.state.filter}
          action={this.handleFilterContact}
        />

        <ContactList
          contacts={this.state.contacts}
          deleteContact={this.handleDeleteContact}
          filter={this.state.filter}
        />
      </div>
    );
  }

  componentDidMount() {
    if (this.localStorageLibraryName in localStorage) {
      const libraryLocal = localStorageLoad(this.localStorageLibraryName);
      this.setState(prevState => {
        return {
          contacts: [...libraryLocal],
        };
      });
    }
  }
}

// 1 - Książka kontaktów
// Weź swoje rozwiązanie zadania z poprzedniej pracy domowej i dodaj przechowywanie kontaktów książki telefonicznej w localStorage. Wykorzystaj metody cyklu życiowego.

// Przy dodaniu i usunięciu kontaktu, zapisują się one w lokalnym magazynie.
// Przy ładowaniu aplikacji, kontakty, jeżeli są, sczytują się z lokalnego magazynu i zapisują w stanie.

// 2 - Książka kontaktów
// Napisz aplikację do przechowywania kontaktów książki telefonicznej.

// Krok 1
// Aplikacja powinna składać się z formularza i listy kontaktów. W obecnym kroku zrealizuj dodanie nazw kontaktu i wyświetlanie listy kontaktów. Aplikacja nie powinna przechowywać kontaktów między różnymi sesjami (odświeżenie strony).

// Wykorzystaj następujący układ input z wbudowaną walidacją dla nazwy kontaktu.

// <input
//   type="text"
//   name="name"
//   pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//   title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//   required
// />

// Stan zapisany w komponencie rodzicu <App> obowiązkowo powinien wyglądać następująco, nie można dodawać nowych właściwości.

// state = {
//   contacts: [],
//   name: ''
// }

// Każdy kontakt powinien być obiektem z właściwościami name i id. Do generowania identyfikatorów wykorzystaj dowolny pasujący pakiet, na przykład nanoid. Po tym kroku aplikacja powinna wyglądać mniej więcej tak:

// https://www.npmjs.com/package/nanoid

// Krok 2
// Rozszerz funkcjonalność aplikacji, pozwalając użytkownikom dodawać numery telefonów. W tym celu dodaj do formularza <input type="tel"> oraz właściwość dla zapisywania jego wartości w stanie.

// state = {
//   contacts: [],
//   name: '',
//   number: ''
// }

// Wykorzystaj ten układ input z wbudowaną walidacją dla numeru kontaktu.

// <input
//   type="tel"
//   name="number"
//   pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//   title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//   required
// />

// Po tym kroku aplikacja powinna wyglądać mniej więcej tak:

// Krok 3
// Dodaj pole wyszukiwania, które można wykorzystać do filtrowania listy kontaktów po nazwie.

// Pole wyszukiwania to input bez formularza, którego wartość zapisuje się w stanie (kontrolowany element).
// Logika filtrowania powinna ignorować wielkość liter.

// state = {
//   contacts: [],
//   filter: '',
//   name: '',
//   number: ''
// }

// Gdy pracujemy nad nową funkcjonalnością, wygodnie jest na stałe zakodować niektóre dane w stanie. Uchroni to od ręcznego wprowadzania danych w interfejsie dla testowania pracy nowej funkcjonalności. Można na przykład wykorzystać taki stan początkowy.

// state = {
//   contacts: [
//     {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
//     {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
//     {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
//     {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
//   ],
//   filter: '',
//   name: '',
//   number: ''
// }

// Krok 4
// Jeżeli twoja aplikacja realizowana jest w jednym komponencie <App>, wykonaj refaktor, dzieląc pasujące części na oddzielne komponenty. W stanie komponentu root <App> zostaną tylko właściwości contacts i filter.

// state = {
//   contacts: [],
//   filter: ''
// }

// Wystarczy wydzielić cztery komponenty: formularz dodania kontaktów, listę kontaktów, element listy kontaktów i filtr wyszukiwania.

// Po refaktorze komponent root aplikacji będzie wyglądał następująco:

// <div>
//   <h1>Phonebook</h1>
//   <ContactForm ... />

//   <h2>Contacts</h2>
//   <Filter ... />
//   <ContactList ... />
// </div>

// Krok 5
// Usuń użytkownikowi możliwość dodawania kontaktów, których nazwy są już w książce telefonicznej. W wypadku takiej próby pokaż alert z ostrzeżeniem.

// Krok 6
// Rozszerz funkcjonalność aplikacji, pozwalając użytkownikowi na usuwanie zapisanych wcześniej kontaktów.
