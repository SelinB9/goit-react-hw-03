import React from 'react';
import { useState } from 'react';
import { useFormik, } from 'formik';
import{nanoid} from 'nanoid';
import * as Yup from 'yup'; 



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
  const {values,handleSubmit,handleChange,} = useFormik({
    initialValues: {
      name: '',
      number: '',
    },
    onSubmit: (values, { resetForm }) => {
      addContact({ ...values, id: nanoid() });//3 nokta ile values icerisindeki degerleri aliyoruz ve id ekliyoruz yeni nesne oluşmuş oluyor id de barındıran
      resetForm();
    }
  });
  return (
   <form onSubmit={handleSubmit}>
   <div>
      <input
        type="text" name="name"
        value={values.name}
      onChange={handleChange}/>
    </div>

   <div>
  < input
  type="number" name="number"
  value={values.number}
  onChange={handleChange}/>
      </div>

      <button type="submit">Add contact</button>
      
</form>
  );
      
}


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


return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox value={filter} onChange={e=> setFilter(e.target.value)}/>
      <ContactList contacts={filteredContacts} />
    
    </div>
  );
}

/*40.satır onsubmit ve handle submit arasındaki fark?
onsubmit ,Formik hook’una (useFormik) verdiğin bir ayardır.
Yani form submit edildiğinde Formik’in ne yapması gerektiğini söylersin.
Sen yazıyorsun.
handleSubmit ise Formik’in sana verdiği bir fonksiyondur.
Yani form submit edildiğinde bu fonksiyonu çağırmalısın.
handleSubmit, senin onSubmit fonksiyonunu çalıştıran aracıdır.
Bunu formun onSubmit eventine bağlarsın.
*/
export default App;