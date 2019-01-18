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
  {path: '/hours', label: 'Hours & Location'},
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

    const navMenu = () => (
      <ul className={styles.navMenu}>
        {routes.map(route => (
          <li className={styles.navItem}>
            <Link to={route.path}>{route.label}</Link>
          </li>
        ))}
      </ul>
    )

    const mobileMenu = () => (
      <ul className={styles.mobileMenu}>
        {routes.map(route => (
          <li className={styles.mobileItem}>
            <Link to={route.path}>{route.label}</Link>
          </li>
        ))}
      </ul>
    )

    return (
      <nav className={styles.nav} role="navigation">
        <p className={styles.navTitle}>
          <Link to="/">{title}</Link>
        </p>
        <span className={styles.menu} onClick={() => this.setState({ show: !show })}>
          {!show && <i className={"fas fa-bars"} />}
        </span>
        <ul className={show ? styles.navMenu : styles.mobileMenu}>
          
          <li className={styles.navItem}>
            <Link to="/about">About</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/menu">Menu</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/about">Hours &amp; Location</Link>
          </li>
          {/* <li className={styles.navItem}>
            <Link to="/order/">Order Online</Link>
          </li> */}
          <li className={styles.navItem}>
            <Link to="/contact">Contact</Link>
          </li>
          {/* <li className={styles.navItem}>
            <Link to="/blog/">Blog</Link>
          </li> */}
        </ul>
      </nav>
    )
  }
}
