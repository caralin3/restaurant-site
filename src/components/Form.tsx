import React from 'react';
// import styles from './Form.module.scss';

export const Form: React.SFC<React.FormHTMLAttributes<HTMLFormElement>> = ({
  children,
  onSubmit,
  ...props
}) => (
    <form
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        if (onSubmit) onSubmit(e);
      }}
      {...props}
    >
      {children}
    </form>
  );

export const NetlifyForm: React.SFC<React.FormHTMLAttributes<HTMLFormElement>> = ({
  children,
  name,
  ...props
}) => (
    <Form
      action="/no-cache=1"
      data-netlify="true"
      data-netlify-honeypot="bot"
      method="POST"
      name={name}
      {...props}
    >
      <input type="hidden" name="form-name" value={name} />
      <p hidden>
        <label>
          Don't fill this out: {' '}
          <input name="bot" />
        </label>
      </p>
      {children}
    </Form>
  );

interface LabelProps extends React.HTMLProps<HTMLLabelElement> {
  subtext?: string;
  text: string;
}

export const Label: React.SFC<LabelProps> = ({
  children,
  text,
  subtext,
  ...props
}) => (
    <label {...props}>
      <p>
        {text} {' '}
        <small>{subtext}</small>
      </p>
      {children}
    </label>
  );

export const TextInput: React.SFC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  // className,
  ...props
}) => <input type="text" {...props} />;

export const TextArea: React.SFC<React.InputHTMLAttributes<HTMLTextAreaElement>> = ({
  // className,
  ...props
}) => <textarea type="text" {...props} />;

export const EmailInput: React.SFC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  // className,
  ...props
}) => <input type="email" name="email" placeholder="example@email.com" {...props} />;

export const NumberInput: React.SFC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  // className,
  ...props
}) => <input type="number" {...props} />;

export const DateInput: React.SFC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  // className,
  ...props
}) => <input type="date" {...props} />;

export const TimeInput: React.SFC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  // className,
  ...props
}) => <input type="time" {...props} />;

export const PhoneInput: React.SFC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  // className,
  ...props
}) =>
  <input
    aria-label="phone_input"
    maxLength={14}
    name="phone"
    placeholder="(555) 456-7891"
    type="phone"
    {...props}
  />;

interface ValidationTextProps extends React.HTMLAttributes<HTMLElement> {
  text?: string;
}

export const ValidationText: React.SFC<ValidationTextProps> = ({
  text,
  ...props
}) => (
  <small {...props}>{!!text ? text : 'Field is required'}</small>
)
