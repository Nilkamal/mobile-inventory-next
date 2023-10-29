import React from "react";
import getMobiles from "../../services/getMobiles";
import styles from "./MobileList.module.css";
import Link from "next/link";

export default async function MobileList() {
  const mobiles = await getMobiles();
  const renderMobiles = () => {
    return mobiles?.map(
      ({ mobile, ram, storage, quantity, brand, _id }: Mobile) => (
        <div className={styles.row}>
          <div className={styles.col}>{brand}</div>
          <div className={styles.col}>{mobile}</div>
          <div className={styles.col}>
            {ram} / {storage} - GB
          </div>
          <div className={styles.col}>{quantity.toString()}</div>
          <div className={styles.col}>
            <Link href={`/mobiles/create/${_id}`}>Edit </Link>
          </div>
        </div>
      )
    );
  };

  //   const onSearch = async (formData) => {
  //     setMobiles(await searchMobiles(formData));
  //   };
  //   const onClear = () => {
  //     console.log("onClear");
  //     getData();
  //   };
  return (
    <>
      <div>
        <h1>Mobile List</h1>
        <Link href='/create'>Create</Link>
      </div>
      {/* <Search onSearch={onSearch} onClear={onClear} /> */}
      <section>
        <header className={styles.header}>
          <div className={styles.col}>Brand</div>
          <div className={styles.col}>Mobile</div>
          <div className={styles.col}>Ram / Storage</div>
          <div className={styles.col}>Quantity</div>
          <div className={styles.col}>Actions</div>
        </header>
        {mobiles.length === 0 ? (
          <div className='row'>
            <div className={`${styles.col} ${styles.noResult}`}>
              No Result Found!
            </div>
          </div>
        ) : (
          mobiles && renderMobiles()
        )}
      </section>
    </>
  );
}