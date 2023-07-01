import PropTypes from 'prop-types';
import css from './ContactForm.module.css';
import { Button } from '../button/Button';

export const ContactForm = ({ addContact }) => (
  <form name="contactform" autoComplete="on" method="POST" validate="true">
    <label className={css.inputlabel}>
      Name
      <input
        className={css.inputfield}
        type="text"
        name="name"
        minLength="2"
        maxLength="50"
        autoComplete="name"
        placeholder=" "
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
    </label>
    <label className={css.inputlabel}>
      Number
      <input
        className={css.inputfield}
        type="tel"
        name="number"
        autoComplete="tel"
        placeholder=" "
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
    </label>
    <Button label="Add contact" action={addContact} formButton={true} />
  </form>
);

ContactForm.propTypes = {
  addContact: PropTypes.func,
};
