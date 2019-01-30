import React from 'react';
import { Layout } from '../components';
import styles from '../appearance/styles/Contact.module.scss';

interface ContactProps {}

interface ContactState {
  email: string;
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
      console.log(email, message, name);
      this.setState({ submitted: true })
      fetch("https://restaurant-site.netlify.com/contact/?no-cache=1", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: this.encode({ "form-name": "contact", ...this.state })
      })
        .then(() => alert("Success!"))
        .catch(error => alert(error));

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
    const { email, message, name, submitted, valid } = this.state;

    return (
      <Layout pageTitle="Contact">
        <div className={styles.contact}>
          {!submitted ?
          <form
            action="/no-cache=1"
            name="contact"
            data-netlify="true"
            data-netlify-honeypot="bot"
            method="POST"
            className={styles.form}
            onSubmit={(e) => this.handleSubmit(e)}
          >
            <h2 className={styles.title}>Contact Us</h2>
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
              <label>
                Don't fill this out: {' '}
                <input name="bot" />
              </label>
            </p>
            <label className={styles.field}>
              <span className={styles.label}>
                Name <small className={styles.sublabel}>(optional)</small>
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
          </form> : 
          <div className={styles.form}>
            <h2 className={styles.title}>Thank you for your submission. We will respond via email as soon as possible.</h2>
          </div>
          }
        </div>
      </Layout>
    );
  }
}
