"use client";

import React, { useEffect, useState } from "react";
import styles from "./brands.module.css";
import Link from "next/link";
import getBrands from "../services/getBrands";

export default function MobileList() {
  const [brands, setBrands] = useState<Brand[]>([]);

  const getData = async () => {
    const data = await getBrands();
    setBrands(data);
  };
  useEffect(() => {
    getData();
  }, []);

  const renderBrands = () => {
    return brands?.map(({ brand, _id }: Brand) => (
      <div className={styles.row} key={_id?.toString()}>
        <div className={styles.col}>{brand}</div>

        <div className={styles.col}>
          <Link href={`/brands/edit/${_id}`}>Edit </Link>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className='flex'>
        <h1>Brand List</h1>
        <Link href='/brands/create' className={styles.link}>
          Create New Brand
        </Link>
      </div>
      <section>
        <header className={styles.header}>
          <div className={styles.col}>Brand</div>
          <div className={styles.col}>Actions</div>
        </header>
        {brands.length === 0 ? (
          <div className='row'>
            <div className={`${styles.col} ${styles.noResult}`}>
              No Result Found!
            </div>
          </div>
        ) : (
          brands && renderBrands()
        )}
      </section>
    </>
  );
}
