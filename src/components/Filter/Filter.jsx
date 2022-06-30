import React from 'react';
import s from './Filter.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { filterContact } from '../../redux/contacts/contacts-actions';
import { getFilter } from '../../redux/contacts/contacts-selectors';

export default function Filter() {
    const value = useSelector(getFilter);
    const dispatch = useDispatch();
    return (
        <label className={s.label}>
            <input type="text" value={value} onChange={e => dispatch(filterContact(e.target.value))} className={s.input} />
        </label>
    );
}
