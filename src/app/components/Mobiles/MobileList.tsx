"use client";

import React, { useEffect, useState } from "react";
import getMobiles from "../../services/getMobiles";
import styles from "./MobileList.module.css";
import Link from "next/link";
import Search from "./Search";
import getMobilesBySearch from "@/app/services/getMobilesBySearch";
import deleteMobile from "@/app/services/deleteMobile";

export default function MobileList() {
  const [mobiles, setMobiles] = useState<Mobile[]>([]);

  const getData = async () => {
    const data = await getMobiles();
    setMobiles(data);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: String
  ) => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete?")) {
      const response = await deleteMobile(id);
      if (response.status === 200) {
        alert(response.data.message);
        getData();
        return;
      }
      alert("Error while deleting mobile, please try again.");
    }
  };
  const renderMobiles = () => {
    return mobiles?.map(
      ({ mobile, ram, storage, quantity, brand, _id }: Mobile) => (
        <div className={styles.row} key={_id?.toString()}>
          <div className={styles.col}>{brand}</div>
          <div className={styles.col}>{mobile}</div>
          <div className={styles.col}>
            {ram} / {storage} - GB
          </div>
          <div className={styles.col}>{quantity.toString()}</div>
          <div className={styles.col}>
            <Link href={`/mobiles/edit/${_id}`}>Edit </Link>

            <Link href={`#`} onClick={(e) => handleDelete(e, _id as String)}>
              Delete{" "}
            </Link>
          </div>
        </div>
      )
    );
  };

  const onSearch = async (formData: MobileSearch) => {
    console.log("search...");
    setMobiles(await getMobilesBySearch(formData));
  };
  const onClear = () => {
    getData();
  };
  return (
    <>
      <Search onSearch={onSearch} onClear={onClear} />
      <div className='flex'>
        <h1>Mobile List</h1>
        <Link href='/mobiles/create' className={styles.link}>
          Create New Mobile
        </Link>
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
