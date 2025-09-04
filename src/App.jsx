import React, { useEffect } from 'react';
import { useState } from 'react';
import { useFormik, } from 'formik';
import{nanoid} from 'nanoid';
import * as Yup from 'yup'; 



const Contact= ({id,name,number,onDelete}) => {
  return (
    <li style={{ display: "flex", justifyContent: "space-between" ,alignItems: "center", gap: 20, marginBottom: 10 }}>
      <div>
      <div>{name}</div>
      <div>{number}</div>
      </div>
        <button type="button" onClick={()=>onDelete(id)}>Delete</button>
    </li>
    
    
  );
}

const ContactList = ({ contacts, deleteContact }) => {
  return (
    <div>
      <ul style={{ listStyle: 'none' }}>
        {contacts.map(contact => (
          < Contact key={contact.id} name={contact.name} number={contact.number} id={contact.id} onDelete={deleteContact} />
        ))}
        
      </ul>
      
    </div>
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
    validationSchema: Yup.object({
      name: Yup.string().min(3).max(50).required("Name is required"),
      number: Yup.string().matches(/^\d+$/, "Only numbers allowed").min(3).max(50).required("Number is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      addContact({ ...values, id: nanoid() });//3 nokta ile values icerisindeki degerleri aliyoruz ve id ekliyoruz yeni nesne oluşmuş oluyor id de barındıran
      resetForm();
    },
});
  return (
   <form onSubmit={handleSubmit}>
      <div>
        <label style={{display: 'block'}}>Name</label>
      <input
        type="text" name="name"
        value={values.name}
      onChange={handleChange}/>
    </div>

      <div>
        <label style={{display: 'block'}}>Number</label>
  < input 
     type="text" name="number"
     value={values.number}
          onChange={handleChange}
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key)) e.preventDefault();
          }}/>
      </div>

      <button type="submit">Add contact</button>
      
</form>
  );
      
}


function App() {

  const [contact, setContact] = useState(() => {
    const savedContact = localStorage.getItem("contactData");
    return savedContact ? JSON.parse(savedContact) : [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  });
 
  useEffect(() => {
    localStorage.setItem("contactData", JSON.stringify(contact));
  }, [contact]);

  const [filter, setFilter] = useState(() => '');
  
  const filteredContacts = contact.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const addContact = newContact => {
    setContact(prev => [...prev, newContact]);
  };

  const deleteContact = contactId => {
    setContact(prev => prev.filter(contact => contact.id !== contactId));
  }
  

  /**const addContact = newContact => {
  setContact(prev => {
    const nextId = prev.length + 1; // mevcut contact sayısına 1 ekle
    return [...prev, { ...newContact, id: `id-${nextId}` }];
  });
}; */

return (
    <div>
      <h1>Phonebook</h1>
    <ContactForm addContact={addContact} />
      <SearchBox value={filter} onChange={e=> setFilter(e.target.value)}/>
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    
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