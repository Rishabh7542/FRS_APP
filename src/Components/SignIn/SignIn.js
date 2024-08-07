import React from 'react';
import './SignIn.css'

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
        }
    }


    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value });
    }


    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value });
    }


    onSubmitSignIn = () => {
        const {loadUserData,onRouteChange} = this.props;
        // Sending Data to Server
        fetch('http://localhost:3001/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword,
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    loadUserData(user);
                    onRouteChange('home');
                }
            });
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw5 center signIn-container" >
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
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
                                value="Sign in"
                                onClick={this.onSubmitSignIn} />
                        </div>
                        <div className="lh-copy mt3">
                            <p
                                className="f6 link dim black db"
                                onClick={() => { onRouteChange('register') }}>Register</p>
                            {/* <a href="#0" class="f6 link dim black db">Forgot your password?</a> */}
                        </div>
                    </div>
                </main>
            </article >
        );
    }
}

export default SignIn;