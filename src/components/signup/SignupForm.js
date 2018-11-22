import React from 'react';
import timezone from '../../data/timezone';
import map from 'lodash/map';
import timezones from '../../data/timezone';
//import axios from 'axios';
import classnames from 'classnames';
import validationInput from '../../validations/signup';
import TextFieldGroup from '../../common/TextFieldGroup';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            timezone: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    isValid() {
        const { errors, isValid } = validationInput(this.state);
        console.log("--isValid--", isValid);
        if (!isValid) {
            this.setState({ errors });
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({ errors: {} });
        //axios.post('localhost:53762/api/Account/Register', this.state);
        console.log("--State--", this.state);

        var self = this;
        if (this.isValid()) {
            this.props.userSignupRequest(this.state)
                .then(function (response) {
                    console.log("--Response--", response);
                    self.setState({ errors: response.data.errors });

                })
                .catch(function (error) {
                    console.log("--Request error--", error);
                });
        }
    }
    render() {
        const { errors } = this.state;
        const options = map(timezones, (val, key) =>
            <option key={val} value={val}>{key}</option>
        );
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Join our community!</h1>

                <TextFieldGroup
                    error={errors.username}
                    label="Username"
                    onChange={this.onChange}
                    value={this.state.username}
                    field="username"
                />
                <TextFieldGroup
                    error={errors.email}
                    label="Email"
                    onChange={this.onChange}
                    value={this.state.email}
                    field="email"
                />
                <TextFieldGroup
                    error={errors.password}
                    label="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                    field="password"
                    type="password"
                />
                <TextFieldGroup
                    error={errors.passwordConfirmation}
                    label="Password Confirmation"
                    onChange={this.onChange}
                    value={this.state.passwordConfirmation}
                    field="passwordConfirmation"
                    type="password"
                />
                <div className={classnames("form-group", { 'has-error': errors.timezone })}>
                    <label className="control-label" >Timezone</label>
                    <select
                        value={this.state.Timezone}
                        onChange={this.onChange}
                        name="Timezone"
                        className="form-control"
                    >
                        <option value="" disabled>Choose Your Timezone</option>
                        {options}
                    </select>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-lg">
                        Sign up</button>

                </div>
            </form>
        );
    }
}

export default SignupForm;