import s from './Filter.module.css'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import contactsActions from '../../redux/contacts/contacts-actions';

const Filter = ({ inputValue, onChange }) => (
    <label className={s.label}>
        <input type="text" value={inputValue} onChange={onChange} className={s.input} />
    </label>
)
Filter.propTypes = {
    inputValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    inputValue: state.contacts.filter,
});
const mapDispatchToProps = dispatch => ({
    onChange: event => dispatch(contactsActions.changeFilter(event.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);