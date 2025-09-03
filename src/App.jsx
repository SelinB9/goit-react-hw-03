import React from 'react';
import { useState } from 'react';

function App() {

  const [contact, setContact] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState(() => '');
  
  const filteredContacts = contact.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const Contact= ({name,number}) => {
    return (
      <li>
        <div>{name}</div>
        <div>{number}</div></li>
    );
  }


  const ContactList = ({ contacts }) => {
    return (
      <ul style={{listStyle:'none'}}>
        {contacts.map(contact=>(
          < Contact key={contact.id} name={contact.name} number={contact.number} />
        ))}
      </ul>

    );
  }


  const SearchBox = ({ value, onChange }) => {
    return (
      <div>
      <label style={{display: 'block'}}>Find contacts by name</label>
      <input
      type="text"
      value={value}
      onChange={onChange}
    /></div>
);
  }


  const ContactForm = ({addContact}) => {
    return (<div></div>
    );
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox value={filter} onChange={e=> setFilter(e.target.value)}/>
      <ContactList contacts={filteredContacts} />
    
    </div>
  );
}
export default App;