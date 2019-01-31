export const validEmail = (email: string) => {
  const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regExp.test(email.trim());
};

export const validPhone = (phone: string) => {
  const value = phone.replace(/[^\d]/g, '');
  const isNum = /^\d+$/.test(value);
  return (isNum && value.length === 10);
}