import PropTypes from 'prop-types'
import s from './ContactList.module.css'
import { connect } from 'react-redux';
import contactsActions from '../../redux/contacts/contacts-actions';


const ContactList = ({ contacts, onDeleteContact }) => {
    return (
        <ul className={s.list}>
            {contacts.map(({ id, name, number }) => (
                <li key={id} className={s.item}>
                    {name}: {number}
                    <button onClick={() => onDeleteContact(id)} type="button" className={s.button}>DELETE</button>

                </li>

            ))}
        </ul>
    );
}
ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        }),
    ).isRequired,
    onDeleteContact: PropTypes.func.isRequired,
};
const getVisibleContacts = (allContats, filter) => {
    const normalizedFilter = filter.toLowerCase();

    return allContats.filter(({ name }) =>
        name.toLowerCase().includes(normalizedFilter),
    );
};

const mapStateToProps = ({ contacts: { filter, items } }) => ({
    contacts: getVisibleContacts(items, filter),
});

const mapDispatchToProps = dispatch => ({
    onDeleteContact: id => dispatch(contactsActions.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);

