import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RootRouter from './RootRouter'
import './App.css'

toast.configure() 

function App() {
  return (
    <RootRouter></RootRouter>
  );
}

export default App;
