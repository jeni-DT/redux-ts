import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
// import { Greet } from './components/Greet';
// import { Person } from './components/Person';
// import { PersonList } from './components/PersonList';
// import { Status } from './components/Status';
import Edit from './ToolkitCrud/Forms/Update/Edit';
import Main from './ToolkitCrud/Forms/view/Main';
import UserList from './ToolkitCrud/Forms/User/UserList';

function App() {
  // const personName ={
  //   first:'Asha',
  //   last:'Aro',

  // }
  // const nameList =[
  //   {
  //     first:'jeni',
  //     last:'Aro',
  //   },
  //   {
  //     first:'Rithika',
  //     last:'Kumar'
  //   },
  //   {
  //     first:'Parves',
  //     last:'Mushraf'
  //   }
  // ]
  
  return (
    <div >
      {/* <Greet name='Jeni' age={22} isLoggedIn={false}/>
     <Person name={personName}/>
     <PersonList names={nameList}/>
     <Status status='loading' /> */}
      <Routes>
        {/* <Route path="/" element={<Navbar />} /> */}
        <Route path="/resort" element={<Main />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/edit/:id" element={<Edit />} />
        
      
      </Routes>
        </div>
  );
}

export default App;
