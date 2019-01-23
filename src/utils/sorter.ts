import { ContentfulHours } from '../types';

export const sortDays = (data: ContentfulHours[]) => {
  const sorter: any = {
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6,
    "Sunday": 7,
  }
  data.sort((a, b) => {
    const day1 = a.node.daysOfTheWeek;
    const day2 = b.node.daysOfTheWeek;
    if (sorter[day1] > sorter[day2]) {
      return 1;
    }
    return -1;
  });
  return data;
}