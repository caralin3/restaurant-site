export const formatMoney = (amt: number) => (
  `$${amt.toFixed(2)}`
);

export const formatMoneyNoSign = (amt: number) => (
  `${amt.toFixed(2)}`
);

export const formatPhone = (num: string) => {
  const value = num.replace(/[^\d]/g, '');
  if (value.length === 10) {
    return value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
  return num;
};

export const formatDate = (date: string) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const value = new Date(date);
  const month = months[value.getMonth()];
  const day = value.getDay();
  const year = value.getFullYear();
  return `${month} ${day}, ${year}`;
};

export const formatTime = (time: string) => {
  const values = time.split(':');
  let dd = 'AM';
  const h = parseInt(values[0], 10);
  const m = parseInt(values[1], 10);
  let hh = h;
  if (hh >= 12) {
    hh = h - 12;
    dd = 'PM';
  }
  if (hh === 0) {
    hh = 12;
  }

  const mm = m < 10 ? `0${m}` : m;
  return `${hh}:${mm} ${dd}`;
};
