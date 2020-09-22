import React, {Component} from 'react';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

class Register extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            name : '',
            address : '' , 
            mobile : '' ,
            errors : {},
        }
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value });
     }

     onFormSubmit(e){
        e.preventDefault();
        if( this.validate() ) {
            axios.post(`http://localhost:4000/users/register` , {
                name : this.state.name ,
                address : this.state.address,
                mobile : this.state.mobile
            })
            .then( result => {
                   if(result.status == 200 ){
                    toast.success( 'User Registed Successfully!', {
                        hideProgressBar: true,
                        closeOnClick: true,
                        draggable: true,
                      });
                   }else{
                    toast.error( 'User Registation Failed !', {
                        hideProgressBar: true,
                        closeOnClick: true,
                        draggable: true,
                      });
                   }
            })
            .catch( err => {
                console.log(err);
                toast.error( 'User Registation Failed !', {
                    hideProgressBar: true,
                    closeOnClick: true,
                    draggable: true,
                  });
            })
        }
     }



    render(){
        const {name , mobile , address , errors } = this.state;
        return (
            <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 bg-login">
                <img src="" alt=""></img>
                <div className="content">
                  <h1 className="brand font-weight-bold mb-0">Welcome</h1>
                  <h5 className="mb-0 text-white font-weight-bold">Check our product for your journey</h5>
                  <h5 className="mb-0 text-white font-weight-bold">Hope your always enjoy !</h5>
                </div>
              </div>

              <div className="col-md-4 login-area">
                <form className="mx-4" method="POST" onSubmit={(e) => this.onFormSubmit(e)}>
                <div className="form-group">
                   
                    <input type="text" 
                        className="form-control"  
                        placeholder="Full Name"
                        name="name"
                        onChange={ (e) => this.formValueChange(e)}
                        value={name}
                        />
                     
                    { errors.name && errors.name.length > 0 &&
                        <h4 className="mt-2 small text-danger mt-0  mb-0">
                            {errors.name}
                        </h4>
                    } 
                   
                </div>
                <div className="form-group">
                
                    <input type="text" 
                        className="form-control"  
                        onChange={ (e) => this.formValueChange(e)}
                        placeholder="Mobile No"
                        name="mobile"
                        value={mobile}
                        />
                   
                     { errors.mobile && errors.mobile.length > 0 &&
                        <h4 className="mt-2 small text-danger mt-0  mb-0">
                            {errors.mobile}
                        </h4>
                     } 
                    
                </div>
                <div className="form-group">
                    
                    <input type="text" 
                        className="form-control"  
                        onChange={ (e) => this.formValueChange(e)}
                        placeholder="Address"
                        name="address"
                        value={address}
                        />
                     
                    { errors.address && errors.address.length > 0 &&
                        <h4 className="mt-2 small text-danger mt-0  mb-0">
                            {errors.address}
                        </h4>
                     } 
                   
                </div>
                
                <button type="submit" className="btn btn-primary btn-block">REGISTER</button>
                
                <p className="text-center my-3">already have an account ?</p>
                <Link to={'/transactions'}>
                <button type="button" className="btn btn-dark btn-block">View Transactions</button>
                </Link>
                </form>
            </div>
            </div>
            </div>
          );
    }

    validate = () => {
        let { errors , name, mobile , address  } = this.state;
        let count = 0;
        
        if( name.length == 0 ){
            errors.name = "Name can not be empty"
            count++
        }else{
            errors.name = "" 
        }

        if( mobile.length == 0 ){
            errors.mobile = "Mobile number can not be empty"
            count++
        }else{
            errors.mobile = "" 
        }
        
        if( address.length == 0 ){
            errors.address = "Address can not be empty"
            count++
        }else{
            errors.address = "" 
        }

        this.setState({errors});
        return count == 0;
    }
   
}

export default Register;
