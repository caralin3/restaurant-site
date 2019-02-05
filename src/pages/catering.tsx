import React from 'react';
import styles from '../appearance/styles/Catering.module.scss';
import {
  Button,
  DateInput,
  EmailInput,
  Label,
  Layout,
  NetlifyForm,
  NumberInput,
  PhoneInput,
  TextArea,
  TextInput,
  TimeInput,
  ValidationText
} from '../components';
import { CateringResponse } from '../types';
import { validEmail, validPhone, formatDate, formatTime, formatPhone, encode } from '../utils';

interface CateringProps { }

interface CateringState {
  count: number;
  date: string;
  email: string;
  error: string;
  event: string;
  name: string;
  notes: string;
  phone: string;
  submitted: boolean;
  time: string;
  valid: {
    count: boolean;
    date: boolean;
    email: boolean;
    event: boolean;
    name: boolean;
    phone: boolean;
    time: boolean;
  };
}

export default class Catering extends React.Component<CateringProps, CateringState> {
  public readonly state: CateringState = {
    count: 0,
    date: '',
    email: '',
    error: '',
    event: '',
    name: '',
    notes: '',
    phone: '',
    submitted: false,
    time: '',
    valid: {
      count: true,
      date: true,
      email: true,
      event: true,
      name: true,
      phone: true,
      time: true,
    }
  };

  private isValidForm = () => {
    const { count, date, email, event, name, phone, time } = this.state;
    return (
      !!count &&
      count > 0 &&
      !!date &&
      !!email &&
      validEmail(email) &&
      !!event &&
      !!name &&
      !!phone &&
      validPhone(phone) &&
      !!time
    );
  }

  private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { count, date, email, event, name, notes, phone, time } = this.state;
    if (this.isValidForm()) {
      const data: CateringResponse = {
        count,
        email,
        event,
        name,
        notes,
        date: formatDate(date),
        phone: formatPhone(phone),
        time: formatTime(time),
      };
      fetch('https://restaurant-site.netlify.com/contact/?no-cache=1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'catering', ...data })
      })
        .then(() => this.setState({ submitted: true }))
        .catch(error => {
          console.error(error);
          this.setState({ error: 'Submission failed. Please try again in a few minutes.' });
        });
      this.setState({ submitted: true });
    } else {
      this.setState({
        valid: {
          count: !!count,
          date: !!date,
          email: !!email || validEmail(email),
          event: !!event,
          name: !!name,
          phone: !!phone || validPhone(phone),
          time: !!time,
        }
      });
    }
  }

  public render() {
    const { count, date, email, error, event, name, notes, phone, submitted, time, valid } = this.state;

    return (
      <Layout pageTitle="Catering">
        <div className={styles.catering}>
          <div className={styles.catering_header}>
            <h2 className={styles.catering_title}>Catering Inquiry</h2>
            <a className={styles.catering_cta}>View Catering Menu</a>
          </div>
          <p className={styles.catering_copy}>
            Please fill out this form if you are interested in our catering services.
          </p>
          {!submitted ?
            <NetlifyForm
              className={styles.catering_form}
              name="catering"
              onSubmit={(e) => this.handleSubmit(e)}
            >
              {error && <p>{error}</p>}
              <div className={styles.catering_form_section}>
                <Label text="Name" required={true}>
                  <TextInput
                    name="name"
                    placeholder="Firstname Lastname"
                    onChange={(e) =>
                      this.setState({
                        name: e.target.value,
                        valid: { ...valid, name: true }
                      })
                    }
                    value={name}
                  />
                  {!valid.name && <ValidationText />}
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
              </div>
              <div className={styles.catering_form_section}>
                <Label text="Phone" required={true}>
                  <PhoneInput
                    onChange={(e) =>
                      this.setState({
                        phone: e.target.value,
                        valid: { ...valid, phone: true }
                      })
                    }
                    value={phone}
                  />
                  {!valid.phone && (!!phone ? <ValidationText /> :
                    <ValidationText text="Invalid Format" />)
                  }
                </Label>
                <Label text="Type of Event" required={true}>
                  <TextInput
                    name="event"
                    placeholder="Graduation, Birthday, etc."
                    onChange={(e) =>
                      this.setState({
                        event: e.target.value,
                        valid: { ...valid, event: true }
                      })
                    }
                    value={event}
                  />
                  {!valid.event && <ValidationText />}
                </Label>
              </div>
              <div className={styles.catering_form_section}>
                <Label text="Catering Date" required={true}>
                  <DateInput
                    name="date"
                    onChange={(e) =>
                      this.setState({
                        date: e.target.value,
                        valid: { ...valid, date: true }
                      })
                    }
                    value={date}
                  />
                  {!valid.date && <ValidationText />}
                </Label>
                <Label text="Catering Time" required={true}>
                  <TimeInput
                    name="time"
                    onChange={(e) =>
                      this.setState({
                        time: e.target.value,
                        valid: { ...valid, time: true }
                      })
                    }
                    value={time}
                  />
                  {!valid.time && <ValidationText />}
                </Label>
                <Label text="Number of People" required={true}>
                  <NumberInput
                    name="count"
                    onChange={(e) =>
                      this.setState({
                        count: parseInt(e.target.value, 10),
                        valid: { ...valid, count: true }
                      })
                    }
                    value={count === 0 ? '' : count}
                  />
                  {!valid.count && <ValidationText />}
                </Label>
              </div>
              <Label text="Additional Information">
                <TextArea
                  className={styles.catering_form_textarea}
                  name="notes"
                  placeholder="Let us know any additional information about your event..."
                  onChange={(e) => this.setState({ notes: e.target.value })}
                  value={notes}
                />
              </Label>
              <Button type="submit" text="Send" />
            </NetlifyForm> :
            <div className={styles.catering_confirm}>
              <h2 className={styles.catering_confirm_heading}>Thank you for your submission!</h2>
              <p className={styles.catering_confirm_copy}>We will respond via email as soon as possible.</p>
            </div>
          }
        </div>
      </Layout>
    );
  }
}
