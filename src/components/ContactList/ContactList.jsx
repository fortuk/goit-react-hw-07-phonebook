import { useEffect } from 'react';
import s from './ContactList.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts, deleteContact } from '../../redux/contacts/contacts-operations';
import { getFilteredContacts } from '../../redux/contacts/contacts-selectors';


export default function ContactList() {
    const contacts = useSelector(getFilteredContacts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    return (
        <ul className={s.list}>
            {contacts.map(({ id, name, number }) => {
                return (
                    <li key={id} className={s.item}>
                        {name}: <span >{number}</span>
                        <button onClick={() => deleteContact(id)} type="button" className={s.button}>DELETE</button>

                    </li>
                );
            })}
        </ul>
    );
}
