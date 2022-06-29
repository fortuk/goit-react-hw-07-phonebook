import { useState } from "react";
import s from './ContactForm.module.css'
import { connect } from 'react-redux';
import contactsActions from '../../redux/contacts/contacts-actions';
import PropTypes from "prop-types";



function ContactForm({ onSubmit, contacts }) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleChange = event => {
        const { name, value } = event.currentTarget;

        switch (name) {
            case 'name':
                setName(value);
                break;

            case 'number':
                setNumber(value);
                break;

            default:
                return;
        }
    };

    const handleSubmit = event => {
        event.preventDefault();

        const options = { name, number };

        if (
            contacts.find(
                contact => name.toLowerCase() === contact.name.toLowerCase(),
            )
        ) {
            alert(`${name} is already in contacts`);
        } else {
            onSubmit(options);
        }

        reset();
    };

    const reset = () => {
        setName('');
        setNumber('');
    };



    return (

        <form onSubmit={handleSubmit} className={s.form}>
            <label className={s.label}> Name
                <input className={s.input}
                    onChange={handleChange}
                    value={name}
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                    required
                />
            </label>
            <label className={s.label}> Number
                <input className={s.input}
                    onChange={handleChange}
                    value={number}
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                    required
                />
            </label>
            <button type="Submit" className={s.button}>Add</button>

        </form>
    )
}
ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    contacts: PropTypes.string.isRequired,
};

const mapStateToProps = ({ contacts: { items } }) => ({
    contacts: items,
});

const mapDispatchToProps = dispatch => ({
    onSubmit: contact => dispatch(contactsActions.addContact(contact)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);