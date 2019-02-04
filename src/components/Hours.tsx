import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import { ContentfulHours, HoursData } from '../types';
import { sortDays } from '../utils';
import styles from './Hours.module.scss';

interface HoursProps {}

interface HoursPropsWithData {
  data: HoursData;
}

export const HoursComponent: React.SFC<HoursPropsWithData> = ({data}) => {
  const hours: ContentfulHours[] = sortDays(data.allContentfulHours.edges);
  console.log(hours);
  return (
    <div className={styles.hours}>
      <p className={styles.hours_title}>Hours</p>
      {hours.slice(3).map((edge, i) => (
        <span className={styles.hours_item} key={i}>
          <p className={styles.hours_label}>
            {edge.node.daysOfTheWeek}
          </p>
          <p className={styles.hours_details}>
            {`${edge.node.open} - ${edge.node.close}`}
          </p>
        </span>
      ))}
    </div>
  );
};

export const Hours: React.SFC<HoursProps> = (props) => (
  <StaticQuery
    query={HoursQuery}
    render={(data: HoursData) => <HoursComponent data={data} {...props} />}
  />
);

const HoursQuery = graphql`
  query {
    allContentfulHours {
      edges {
        node {
          daysOfTheWeek
          open
          close
        }
      }
    }
  }
`;
