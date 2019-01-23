import React from 'react'
import { Link } from 'gatsby'
import styles from './Navigation.module.scss'

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
  {path: '/about', label: 'About'},
  {path: '/menu', label: 'Menu'},
  {path: '/catering', label: 'Catering'},
  // {path: '/order', label: 'Order Online'},
  {path: '/contact', label: 'Contact'},
]

export class Navigation extends React.Component<NavigationProps, NavigationState> {
  readonly state: NavigationState = {
    show: false
  }

  public render() {
    const { show } = this.state;
    const { title } = this.props;

    const navMenu = (
      <ul className={styles.navMenu}>
        {routes.map((route, i) => (
          <li className={styles.navItem} key={i}>
            <Link to={route.path}>{route.label}</Link>
          </li>
        ))}
      </ul>
    )

    const mobileMenu = (
      <ul className={styles.mobileMenu}>
        {routes.map((route, i) => (
          <li className={styles.mobileItem} key={i}>
            <Link to={route.path}>{route.label}</Link>
          </li>
        ))}
      </ul>
    )

    return (
      <nav className={styles.nav} role="navigation">
        <div className={styles.bar}>
          <p className={styles.navTitle}>
            <Link to="/">{title}</Link>
          </p>
          {navMenu}
          <span className={styles.menu} onClick={() => this.setState({ show: !show })}>
            <i className={"fas fa-bars"} />
          </span>
        </div>
        {show && mobileMenu}
      </nav>
    )
  }
}
