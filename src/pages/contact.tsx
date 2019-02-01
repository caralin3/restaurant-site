import React from 'react';
import styles from '../appearance/styles/Contact.module.scss';
import {
  EmailInput,
  Label,
  Layout,
  NetlifyForm,
  TextArea,
  TextInput,
  ValidationText
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
      message: true,
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
          {!submitted ?
            <NetlifyForm
              className={styles.form}
              name="contact"
              onSubmit={(e) => this.handleSubmit(e)}
            >
              <h2 className={styles.title}>Contact Us</h2>
              {error && <p>{error}</p>}
              <Label className={styles.field} text="Name" subtext="(optional)">
                <TextInput
                  className={styles.input}
                  name="name"
                  placeholder="Firstname Lastname"
                  onChange={(e) => this.setState({ name: e.target.value })}
                  value={name}
                />
              </Label>
              <Label className={styles.field} text="Email">
                <EmailInput
                  className={styles.input}
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
              <Label className={styles.field} text="Message">
                <TextArea
                  className={styles.textarea}
                  name="message"
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
              <button className={styles.button} type="submit">
                Send
            </button>
            </NetlifyForm> :
            <div className={styles.form}>
              <h2 className={styles.title}>Thank you for your submission!</h2>
              <p>We will respond via email as soon as possible.</p>
            </div>
          }
        </div>
      </Layout>
    );
  }
}
