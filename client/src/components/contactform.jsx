import React from 'react';
import {MaskedTextField, TextField, Text, Button} from 'office-ui-fabric-react';
import axios from 'axios';
import {currentTheme} from '../App'

const defaultState = {
    subject: "",
    email: "",
    phone: "",
    message: "",
    sent: false,
    buttonText: "Email Me"
}

var url = window.location.href;
if (url.substring(url.length - 6, url.length) === ":3000/") { //development version only
    url = url.substring(0, url.length - 6);
}

const apiAddress = url + ":4444/api/v1";

class ContactForm extends React.Component {

    state = defaultState;

    buttonStyles = {
        root: {
            background: currentTheme.palette.themeTertiary,
            margin: 5
        }
    }

    formSubmit = (e) => {
        e.preventDefault()
      
        this.setState({
            buttonText: '...sending'
        })
      
        let data = {
            subject: this.state.subject,
            email: this.state.email,
            phone: this.state.phone,
            message: this.state.message
        }
        
        axios.post(apiAddress, data)
        .then( res => {
            this.setState({ sent: true }, this.setState(defaultState))
        })
        .catch( () => {
          console.log('Message not sent')
        })
      }

    render() {
        return (
            <div className="DefaultComponentWrapper">
                <Text variant={"xLargePlus"}>Contact Me</Text>
                <div className="EmailHeader">
                    <TextField placeholder="Subject" styles={{fieldGroup: {width: 300}}} value={this.state.subject} onChange={this._onSubjChange} underlined />
                    <TextField placeholder="Email" styles={{fieldGroup: {width: 200}}} value={this.state.email} onChange={this._onEmailChange} underlined />
                    <MaskedTextField mask="(999) 999 - 9999" value={this.state.phone} onChange={this._onPhoneChange} underlined />
                </div>
                <TextField placeholder="Message" styles={{fieldGroup: {width: 700}}} multiline rows={10} value={this.state.message} onChange={this._onMsgChange} underlined />
                <Button styles={this.buttonStyles} onClick={this.formSubmit}>{this.state.buttonText}</Button>
            </div>
        )
    }

    _onSubjChange = (event, newValue) =>
    {
       this.setState({ subject: newValue || '' });
    }

    _onEmailChange = (event, newValue) => 
    {
        this.setState({ email: newValue || '' });
    }

    _onPhoneChange = (event, newValue) => 
    {
        this.setState({ phone: newValue || '' });
    }

    _onMsgChange = (event, newValue) => 
    {
        this.setState({ message: newValue || '' });
    }
}

export default ContactForm;