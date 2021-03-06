import React, {Component} from 'react'
import { Redirect } from 'react-router-dom';
import { signinS, authenticate } from '../Auth/Student'
class SigninS extends Component{
    constructor(){
        super()
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false,
            open:false

        }
    }

    handleChange = (str) => (event) => {
        this.setState({ error: "" });
        this.setState({
            [str]: event.target.value
        });
    };

    

    clickSubmit = (event) => {
        event.preventDefault();
        this.setState({loading:true})
        const {email,password} = this.state
        const user = {
            email: email,
            password: password
        };
        console.log(user);
        
        signinS(user)
            .then(data => {
                if (data.error) {
                    this.setState({ error: data.error,loading:false })
                }
                else {
                    //authenticate
                    authenticate(data, () => {
                        this.setState({redirectToReferer:true,loading:false})
                    })
                    //redirect
                }
            });
    };
    
    signinForm = (email, password) => (
        <form>
                <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input 
                            onChange = {this.handleChange("email")} 
                            type = "email" 
                            className = "form-control"
                            value = {email}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input 
                            onChange = {this.handleChange("password")} 
                            type = "password" 
                            className = "form-control"
                            value = {password}>
                        </input>   
                    </div>
                    <button onClick = {this.clickSubmit}  className="btn btn-raised btn-primary">Submit</button>
                </form>
          
    )

    render() {
        const {email, password, error,redirectToReferer,loading} = this.state;
        if (redirectToReferer) {
           return <Redirect to="/DashboardS"></Redirect>
       }
        return (
            <div>
                <div className="jumbotron">
                        <h3 className="font-weight-bold">Jaypee Institute Of Information Technology</h3>
                        <h4>Project Portal</h4>
                </div>    
                <div className="container">
                    <h2 className="mt-5 mb-5">SignIn</h2>

                    <div className="alert alert-danger" style={{display:error?"":"NONE"}}>
                        {error}
                    </div>
                    {loading ? (
                        <div className="jumbotron text-center">
                            <h2>Loading...</h2>
                            </div>
                    ) : (
                            ""
                    )}


                    {this.signinForm(email,password)}    
                </div>
            </div>
        );
    };
};

export default SigninS;