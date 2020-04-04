import React from 'react';
import {MaskedTextField, TextField, Text, Button} from 'office-ui-fabric-react';
import {currentTheme} from '../App';

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

        const templateId = 'sdt_contact_form';

        this.sendFeedback(templateId, {subject: this.state.subject, message_html: this.state.message, from_phone: this.state.phone, reply_to: this.state.email})
      }
    
      sendFeedback (templateId, variables) {
        window.emailjs.send(
          'gmail', templateId,
          variables
          ).then(res => {
            this.setState(defaultState);
          })
          .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
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