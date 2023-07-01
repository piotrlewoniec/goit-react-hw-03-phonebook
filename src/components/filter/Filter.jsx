import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ inputValue, action }) => (
  <>
    <p className={css.info}>Find contacts by name</p>
    <input
      className={css.inputfield}
      type="text"
      value={inputValue}
      onChange={action}
    />
  </>
);

Filter.propTypes = {
  inputValue: PropTypes.string,
  action: PropTypes.func,
};
