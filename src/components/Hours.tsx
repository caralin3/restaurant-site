import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import { ContentfulHours, HoursData } from '../types';
import { sortDays } from '../utils';
import styles from './Hours.module.scss';

interface HoursProps {}

interface HoursPropsWithData {
  data: HoursData;
}

interface HoursState {
  hours: ContentfulHours[];
}

export class HoursComponent extends React.Component<HoursPropsWithData, HoursState> {
  public readonly state: HoursState = {
    hours: []
  };

  public componentDidMount() {
    const { data } = this.props;
    const hours: ContentfulHours[] = sortDays(data.allContentfulHours.edges);
    this.setState({ hours });
  }

  public render() {
    const { hours } = this.state;

    return (
      <div className={styles.hours}>
        <p className={styles.hours_title}>Hours</p>
        {!!hours && hours.map((edge, i) => (
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
  }
}

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
