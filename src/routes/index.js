
import Register from '../views/Register'
import Transaction from '../views/Transaction'
import CreateTransaction from '../views/CreateTransaction'

let indexRoutes = [

  {
    path: "/",
    name: "Register",
    component: Register,
    exact: true,
  }, 
  {
    path: "/transactions",
    name: "Transaction",
    component: Transaction,
    exact: true,
  }, 
  {
    path: "/create/transaction",
    name: "CreateTransaction",
    component: CreateTransaction,
    exact: true,
  }, 

];

export default indexRoutes;
