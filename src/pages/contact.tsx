import React from 'react';
import { Layout, NetlifyForm, SubLabel } from '../components';
import styles from '../appearance/styles/Contact.module.scss';

interface ContactProps {}

interface ContactState {
  email: string;
  error: string;
  message: string;
  name: string;
  submitted: boolean;
  valid: {
    email: boolean;
    message: boolean;
  }
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
  }

  private isValidEmail = () => {
    const { email } = this.state;
    const regExp = /\S+@\S+\.\S+/;
    return regExp.test(email);
  };

  private encode = (data: any) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { email, message, name } = this.state;
    if (!!email && this.isValidEmail() && !!message) {
      fetch("https://restaurant-site.netlify.com/contact/?no-cache=1", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: this.encode({ "form-name": "contact", ...this.state })
      })
        .then(() => this.setState({ submitted: true }))
        .catch(error => {
          console.error(error);
          this.setState({ error: 'Submission failed. Please try again in a few minutes.' })
        });

    } else {
      this.setState({
        valid: {
          email: !!email || this.isValidEmail(),
          message: !!message,
        }
      });
    }
    e.preventDefault();
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
            <label className={styles.field}>
              <span className={styles.label}>
                Name <SubLabel text="(optional)" />
              </span>
              <input
                className={styles.input}
                name="name"
                onChange={(e) => this.setState({ name: e.target.value })}
                type="text"
                value={name}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>
                Email
              </span>
              <input
                className={styles.input}
                name="email"
                onChange={(e) => this.setState({ email: e.target.value, valid: {...valid, email: true} })}
                type="email"
                value={email}
              />
              {!valid.email && <small className={styles.invalid}>Email is required</small>}
            </label>
            <label className={styles.field}>
              <span className={styles.label}>
                Message
              </span>
              <textarea
                className={styles.textarea}
                name="message"
                onChange={(e) => this.setState({ message: e.target.value, valid: {...valid, message: true}  })}
                value={message}
              />
              {!valid.message && <small className={styles.invalid}>Message is required</small>}
            </label>
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
