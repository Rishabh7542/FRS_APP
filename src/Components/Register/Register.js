import React from 'react';
import './Register.css'

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            registerName: '',
            registerEmail: '',
            registerPassword: '',
        }
    }

    onNameChange = (event) => {
        this.setState({ registerName: event.target.value });
    };

    onEmailChange = (event) => {
        this.setState({ registerEmail: event.target.value });
    };

    onPasswordChange = (event) => {
        this.setState({ registerPassword: event.target.value });
    };

    onSubmitRegister = () => {
        const { loadUserData,onRouteChange } = this.props;
        // Sending data to server
        fetch('http://localhost:3001/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({                  // sending request body to the server
                name: this.state.registerName,
                email: this.state.registerEmail,
                password: this.state.registerPassword,
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user) {
                    loadUserData(user);
                    onRouteChange('home');
                }
            })
    }

    render() {

        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw5 center register-container" >
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="name"
                                    name="name"
                                    onChange={this.onNameChange}
                                    id="name" />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    onChange={this.onEmailChange}
                                    id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    onChange={this.onPasswordChange}
                                    id="password" />
                            </div>
                            {/* <label class="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label> */}
                        </fieldset>
                        <div className="">
                            <input
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register"
                                onClick={this.onSubmitRegister}
                            />
                        </div>
                        {/* <div class="lh-copy mt3">
                            <p href="#0" class="f6 link dim black db pointer" onClick={() => {onRouteChange('home')}}>Register</p>
                            <a href="#0" class="f6 link dim black db">Forgot your password?</a>
                        </div> */}
                    </div>
                </main>
            </article >
        );
    }
}

export default Register;

