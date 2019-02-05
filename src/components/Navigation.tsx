import React from 'react';
import { Link } from 'gatsby';
import styles from './Navigation.module.scss';
import { Footer } from './';

interface NavigationProps {
  title: string;
}

interface NavigationState {
  show: boolean;
}

interface NavRoute {
  path: string;
  label: string;
}

const routes: NavRoute[] = [
  {path: '/about/', label: 'About'},
  {path: '/menu/', label: 'Menu'},
  {path: '/catering/', label: 'Catering'},
  // {path: '/order/', label: 'Order Online'},
  {path: '/contact/', label: 'Contact'},
];

export class Navigation extends React.Component<NavigationProps, NavigationState> {
  readonly state: NavigationState = {
    show: false
  };

  public render() {
    const { show } = this.state;
    const { title } = this.props;

    const navMenu = (
      <ul className={styles.nav_menu}>
        {routes.map((route, i) => (
          <Link
            key={i}
            className={styles.nav_item}
            activeStyle={{
              backgroundColor: '#9d0214'
            }}
            to={route.path}
          >
            {route.label}
          </Link>
        ))}
      </ul>
    );

    const mobileMenu = (
      <div className={show ? styles.mobile_open : styles.mobile}>
        <ul className={styles.mobile_content}>
          <span className={styles.mobile_button} onClick={() => this.setState({ show: !show })}>
            <i className="fas fa-times" />
          </span>
          {routes.map((route, i) => (
            <Link to={route.path} className={styles.mobile_item} key={i}>
              {route.label}
            </Link>
          ))}
        </ul>
        <div className={styles.mobile_footer}>
          <Footer />
        </div>
      </div>
    );

    return (
      <nav className={styles.nav} role="navigation">
          <p className={styles.nav_title}>
            <Link to="/">{title}</Link>
          </p>
          {navMenu}
          <span className={styles.nav_button} onClick={() => this.setState({ show: !show })}>
            <i className="fas fa-bars" />
          </span>
        {mobileMenu}
      </nav>
    );
  }
}
