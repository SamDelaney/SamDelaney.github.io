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
        
        axios.post('API_URI', data)
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
                    <TextField placeholder="Subject" styles={{fieldGroup: {width: 300}}} underlined />
                    <TextField placeholder="Email" styles={{fieldGroup: {width: 200}}}underlined />
                    <MaskedTextField mask="(999) 999 - 9999" underlined />
                </div>
                <TextField placeholder="Message" styles={{fieldGroup: {width: 700}}} multiline rows={10} underlined />
                <Button styles={this.buttonStyles}>{this.state.buttonText}</Button>
            </div>
        )
    }
}

export default ContactForm;