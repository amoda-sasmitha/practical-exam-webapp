import React, {Component} from 'react';
import axios from 'axios'
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
class Transaction extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            from_mobile : '' , 
            to_mobile : '', 
            amount : '',
            errors : {}
        }
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value });
     }

     submit = () => {
    
        if( this.validate() ) {
            axios.post(`http://localhost:4000/transaction/create` , {
                from_mobile : this.state.from_mobile ,
                to_mobile : this.state.to_mobile,
                amount : this.state.amount
            })
            .then( result => {
                   if(result.status == 200 ){
                    toast.success( 'Transaction Added Successfully!', {
                        hideProgressBar: true,
                        closeOnClick: true,
                        draggable: true,
                      });
                   }else{
                    toast.error( result.message , {
                        hideProgressBar: true,
                        closeOnClick: true,
                        draggable: true,
                      });
                   }
            })
            .catch( err => {
                console.log(err);
                toast.error( 'Receiver/ Sender Not Found !' , {
                    hideProgressBar: true,
                    closeOnClick: true,
                    draggable: true,
                  });
            })
        }
     }

    
     

    render(){
        const { from_mobile , to_mobile , amount  , errors} = this.state;
        return (
            <div className="container-fluid bg-light h-100">
            <div className="row justify-content-center pt-5">
           
              <div className="col-md-10 mt-3 px-4">
            
                <div className="card shadow px-4 py-2 bg-white border-0 rounded" >
                <div className="card-header bg-white p-0" >
                    <h5 className="text-secondary mb-3 mt-3">Create Transaction</h5>
                    
                </div>
                <div className="card-body p-0" >
                <input type="text" 
                        className="mt-3 form-control"  
                        placeholder="Your Mobile No"
                        name="from_mobile"
                        onChange={ (e) => this.formValueChange(e)}
                        value={from_mobile}
                        />
                     
                    { errors.from_mobile && errors.from_mobile.length > 0 &&
                        <h4 className="mt-2 small text-danger mt-0  mb-0">
                            {errors.from_mobile}
                        </h4>
                    }

                <input type="text" 
                        className="mt-3 form-control"  
                        onChange={ (e) => this.formValueChange(e)}
                        placeholder="Receiver Mobile No"
                        name="to_mobile"
                        value={to_mobile}
                        />
                   
                     { errors.to_mobile && errors.to_mobile.length > 0 &&
                        <h4 className="mt-2 small text-danger mt-0  mb-0">
                            {errors.to_mobile}
                        </h4>
                     }  
                    
                    <input type="number" 
                        className="mt-3 form-control"  
                        onChange={ (e) => this.formValueChange(e)}
                        placeholder="Amount"
                        name="amount"
                        value={amount}
                        />
                     
                    { errors.amount && errors.amount.length > 0 &&
                        <h4 className="mt-2 small text-danger mt-0  mb-0">
                            {errors.amount}
                        </h4>
                     } 
                   
                <button 
                 onClick={this.submit}
                className="btn btn-primary btn-sm mt-3 mb-3 ">Create Transaction</button>
                    </div>
                </div>
              </div>
            
            </div>
            </div>
          );
    }

    validate = () => {
        let { errors , from_mobile, to_mobile , amount  } = this.state;
        let count = 0;
        
        if( from_mobile.length == 0 ){
            errors.from_mobile = "Your mobile no can not be empty"
            count++
        }else{
            errors.from_mobile = "" 
        }

        if( to_mobile.length == 0 ){
            errors.to_mobile = "Receiver's mobile no can not be empty"
            count++
        }else{
            errors.to_mobile = "" 
        }
        
        if( amount.length == 0 ){
            errors.amount = "Amount can not be empty"
            count++
        }else{
            errors.amount = "" 
        }

        this.setState({errors});
        return count == 0;
    }

    
   
}

export default Transaction;
