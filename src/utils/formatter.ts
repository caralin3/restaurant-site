export const formatPhone = (num: string) => {
  let value = num.replace(/[^\d]/g, '');
  if (value.length === 10) {
    return value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
  return num;
}