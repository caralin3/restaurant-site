export const formatPhone = (num: number) => {
  // let phoneNumber = phone.replace(/[^\d]/g, '');
  // if (phone.length === 10) {
  //   phoneNumber = phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  // }
  const input = num.toString();
  let phone = '(';
  phone += input.slice(0, 3) + ') ';
  phone += input.slice(3, 6) + '-';
  phone += input.slice(6);
  return phone;
}