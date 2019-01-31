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
  onSubmit,
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

interface SubLabelProps {
  text: string;
}

export const SubLabel: React.SFC<SubLabelProps> = ({
  text,
}) => (
    <small>{text}</small>
  );
