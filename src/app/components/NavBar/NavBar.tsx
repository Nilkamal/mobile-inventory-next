import React from "react";
import styles from "./NavBar.module.css";
import Link from "next/link";
export default function NavBar() {
  return (
    <header className={styles.header}>
      <nav className={styles.navBar}>
        <h1>Mahaveer Mobile</h1>
        <ul className={styles.navLinks}>
          <li>
            <Link className={styles.link} href='/'>
              Mobiles
            </Link>
          </li>
          <li>
            <Link className={styles.link} href='/brands/'>
              Brands
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
