import React, {Component} from 'react';
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom';

class Transaction extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            mobile : '' , 
            data : [] ,
            status : 'ALL'
        }
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value });
     }

     componentDidMount(){
        
     }

     search = () => {
         if(this.state.mobile.length > 0 ){
            axios.get(`http://localhost:4000/transaction/getall/${this.state.mobile}`)
            .then( result => {
                    this.setState({data : result.data , status : 'ALL'})
            })
            .catch( err => {
                console.log(err);
            })
        }
     }

     incoming = () => {
         if(this.state.mobile.length > 0 ){
            axios.get(`http://localhost:4000/transaction/getall/in/${this.state.mobile}`)
            .then( result => {
                    this.setState({data : result.data , status : 'IN'})
            })
            .catch( err => {
                console.log(err);
            })
        }
     }

     outgoing = () => {
         if(this.state.mobile.length > 0 ){
            axios.get(`http://localhost:4000/transaction/getall/out/${this.state.mobile}`)
            .then( result => {
                    this.setState({data : result.data , status : 'OUT'})
            })
            .catch( err => {
                console.log(err);
            })
        }
     }

    render(){
        const { mobile , status} = this.state;
        return (
            <div className="container-fluid bg-light h-100">
            <div className="row justify-content-center">
            <div className="col-md-10 mt-5 px-4">
            <div className="card shadow px-4 py-3 bg-white border-0 rounded" >
                <div className="input-group mb-0">
                <input type="text" value={mobile} name="mobile" 
                onChange={ (e) => this.formValueChange(e)}
                className="form-control" placeholder="Enter Mobile No"></input>
                <div className="input-group-append">
                    <button 
                    onClick={this.search}
                    className="btn btn-secondary btn-sm" type="button">Search History</button>
                </div>
                </div>
            </div>
            </div>
              <div className="col-md-10 mt-3 px-4">
            
            <div className="card shadow px-4 py-2 bg-white border-0 rounded" >
                <div className="card-header bg-white p-0" >
                    <h5 className="text-secondary mb-3 mt-3">Transaction History</h5>
                    <div className="d-flex mb-3" >
                        <button   onClick={this.search}className={`btn btn-${status == 'ALL' ? 'primary' : 'secondary'} btn-sm mr-2`}>All Transactions</button>
                        <button  onClick={this.incoming} className={`btn btn-${status == 'IN' ? 'primary' : 'secondary'} btn-sm mr-2`}>Incoming</button>
                        <button  onClick={this.outgoing} className={`btn btn-${status == 'OUT' ? 'primary' : 'secondary'} btn-sm mr-2`}>Outgoing</button>
                    </div>
                </div>
                <div className="card-body p-0" >
                    <table className="table">
                        <thead className="thead-dark py-1">
                            <tr>
                            <th  class="py-1" scope="col">Name</th>
                            <th  class="py-1" scope="col">Mobile No</th>
                            <th  class="py-1" scope="col">Amount</th>
                            <th  class="py-1" scope="col">In/Out</th>
                            <th  class="py-1" scope="col">Date</th>
                            <th  class="py-1" scope="col">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map( (record , index) => (
                                <tr>
                                    <td>{( mobile == record.mobile ) ? record.to.name : record.from.name}</td>
                                    <td>{( mobile == record.mobile ) ? record.to.mobile : record.from.mobile}</td>
                                    <td>{`LKR ${record.amount}.00`}</td>
                                    <td><span className={`badge badge-${mobile == record.mobile ? 'warning text-white' : 'success'}`}>
                                        {( mobile == record.mobile ) ? 'OUT' : 'IN'  }</span></td>
                                    <td>{moment(record.created_at).format('YYYY MMMM Do ')}</td>
                                    <td>{moment(record.created_at).format('LT')}</td>
                                    <td>{}</td>
                                </tr>
                            ))}

                            {
                                this.state.data.length  ==  0 &&  
                                <tr>
                                    <td colSpan="6" className="text-center">No Result Found !</td>
                                </tr>
                            }
                        </tbody>
                        </table>
                            <hr></hr>
                            <h6 className="text-muted">If you want create a transaction ?</h6>
                        <Link to={'/create/transaction'}>
                        <button 
                    onClick={this.search}
                    className="btn btn-success btn-sm mb-3" type="button">Create Transaction</button>
                    </Link>
                    </div>
                </div>
              </div>
            
            </div>
            </div>
          );
    }

    
   
}

export default Transaction;
