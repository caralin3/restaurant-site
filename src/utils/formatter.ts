export const formatPhone = (num: number) => {
  const input = num.toString();
  let phone = '(';
  phone += input.slice(0, 3) + ') ';
  phone += input.slice(3, 6) + '-';
  phone += input.slice(6);
  return phone;
}