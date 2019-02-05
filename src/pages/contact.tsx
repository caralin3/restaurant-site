import React from 'react';
import styles from '../appearance/styles/Contact.module.scss';
import {
  Button,
  EmailInput,
  Label,
  Layout,
  NetlifyForm,
  TextArea,
  TextInput,
  ValidationText,
  Hours,
  Location
} from '../components';
import { ContactResponse } from '../types';
import { encode, validEmail } from '../utils';

interface ContactProps { }

interface ContactState {
  email: string;
  error: string;
  message: string;
  name: string;
  submitted: boolean;
  valid: {
    email: boolean;
    message: boolean;
  };
}

export default class Contact extends React.Component<ContactProps, ContactState> {
  public readonly state: ContactState = {
    email: '',
    error: '',
    message: '',
    name: '',
    submitted: false,
    valid: {
      email: true,
      message: true
    }
  };
  
  private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { email, message, name } = this.state;
    if (!!email && validEmail(email) && !!message) {
      const data: ContactResponse = {
        email,
        name,
        message,
      };
      // fetch('https://restaurant-site.netlify.com/contact/?no-cache=1', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      //   body: encode({ 'form-name': 'contact', ...data })
      // })
      //   .then(() => this.setState({ submitted: true }))
      //   .catch(error => {
      //     console.error(error);
      //     this.setState({ error: 'Submission failed. Please try again in a few minutes.' });
      //   });
      this.setState({ submitted: true });

    } else {
      this.setState({
        valid: {
          email: !!email || validEmail(email),
          message: !!message,
        }
      });
    }
  }

  public render() {
    const { email, error, message, name, submitted, valid } = this.state;

    return (
      <Layout pageTitle="Contact">
        <div className={styles.contact}>
          <h2 className={styles.contact_title}>Contact Us</h2>
          <div className={styles.contact_top}>
            {!submitted ?
              <NetlifyForm
                className={styles.contact_form}
                name="contact"
                onSubmit={(e) => this.handleSubmit(e)}
              >
                <p className={styles.contact_form_title}>Contact Form</p>
                {error && <p>{error}</p>}
                <Label text="Name" subtext="(optional)">
                  <TextInput
                    name="name"
                    onChange={(e) => this.setState({ name: e.target.value })}
                    value={name}
                  />
                </Label>
                <Label text="Email" required={true}>
                  <EmailInput
                    onChange={(e) =>
                      this.setState({
                        email: e.target.value,
                        valid: { ...valid, email: true }
                      })
                    }
                    value={email}
                  />
                  {!valid.email && <ValidationText />}
                </Label>
                <Label text="Message" required={true}>
                  <TextArea
                    name="message"
                    placeholder="Let us know if you have a comment or question..."
                    onChange={(e) =>
                      this.setState({
                        message: e.target.value,
                        valid: { ...valid, message: true }
                      })
                    }
                    value={message}
                  />
                  {!valid.message && <ValidationText />}
                </Label>
                <Button type="submit" text="Send" />
              </NetlifyForm> :
              <div className={styles.contact_confirm}>
                <h2 className={styles.contact_confirm_heading}>Thank you for your submission!</h2>
                <p className={styles.contact_confirm_copy}>We will respond via email as soon as possible.</p>
              </div>
            }
            <div className={styles.contact_hoursLocation}>
              <div className={styles.contact_hours}>
                <Hours />
              </div>
              <div className={styles.contact_location}>
                <Location />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
