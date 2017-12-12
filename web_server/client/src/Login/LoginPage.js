import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../Auth/Auth';
import LoginForm from './LoginForm';

class LoginPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            errors: {},
            user: {
                username: '',
                password: ''
            }
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    // event handler for login page
    processForm(event) {
        event.preventDefault();

        // this needs to be updated to fetch from mysql
        console.log('Loging form values. username: ' + this.state.user.username + '...password: ' + this.state.user.password);

        // construct fetch options
        const init = {
            method: 'POST',
            cache: false,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.user.username,
                password: this.state.user.password
            })
        };
        // fetch('http://localhost:3000/auth/login', init)
        //     .then(response => {
        //         if (response.status === 200) {
        //             this.setState({
        //                 errors: {}
        //             });
        //
        //             response.json().then(function(json){
        //                 console.log(json);
        //                 Auth.authenticateUser(json.token, this.state.user.email);  // handle token and email
        //                 this.context.router.replace('/');
        //             }.bind(this));
        //         } else {
        //             console.log('Login failed');
        //             response.json().then(function(json){
        //                 const errors = json.errors ? json.errors : {};  // parse for errors
        //                 errors.summary = json.message;
        //                 this.setState({errors});
        //             }.bind(this));
        //         }
        //     });
    }

    changeUser(event) {
        const inputField = event.target.name;   // gets the input field values
        const user = this.state.user;
        user[inputField] = event.target.value;

        this.setState({ user });
    }

    render(){
        return (
            <LoginForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                user={this.state.user}
            />
        );
    }
}

LoginPage.contextTypes = {
    router: PropTypes.object.isRequired
}

export default LoginPage;
