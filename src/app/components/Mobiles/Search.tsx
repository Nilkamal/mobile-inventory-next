"use client";

import React, { useState, useEffect } from "react";
import styles from "./Search.module.css";
import getBrands from "@/app/services/getBrands";

interface SearchProps {
  onSearch: (formData: MobileSearch) => void;
  onClear: () => void;
}
export default function Search({ onSearch, onClear }: SearchProps) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [formData, setFormData] = useState<MobileSearch>({
    brand: "",
    mobile: "",
    ram: "",
    storage: "",
  });

  useEffect(() => {
    const getBrandsData = async () => {
      setBrands(await getBrands());
    };
    getBrandsData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    onSearch(formData);
  };

  const handleClear = () => {
    setFormData({ brand: "", mobile: "", ram: "", storage: "" });
    onClear();
  };
  return (
    <main>
      <h2>Search</h2>
      <form onSubmit={handleSubmit} className={styles.mobileForm}>
        <div className={styles.formGroup}>
          <label htmlFor='brand'>
            Brand:
            <select
              id='brand'
              name='brand'
              placeholder='Select Brand'
              value={formData.brand.toString()}
              onChange={handleChange}
              className={`${styles.formControl} ${styles.formSelect}`}
            >
              <option selected>--Select Brand--</option>
              {brands?.map(({ _id, brand }) => (
                <option key={_id.toString()} value={_id.toString()}>
                  {brand}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor='mobile'>
            Mobile:
            <input
              type='text'
              id='mobile'
              value={formData.mobile}
              name='mobile'
              onChange={handleChange}
              className={styles.formControl}
            />
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor='ram'>
            RAM:
            <input
              type='number'
              id='ram'
              value={formData.ram}
              name='ram'
              onChange={handleChange}
              className={styles.formControl}
            />
          </label>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor='storage'>
            Storage:
            <input
              type='number'
              id='storage'
              value={formData.storage}
              name='storage'
              onChange={handleChange}
              className={styles.formControl}
            />
          </label>
        </div>

        <div className={styles.formGroup}>
          <button type='submit' className={styles.button}>
            Search
          </button>
          <button
            type='button'
            className={`${styles.button} ${styles.clear}`}
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </form>
    </main>
  );
}
