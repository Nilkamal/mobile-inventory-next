"use client";
import React, { useState, useEffect } from "react";

import styles from "./create.module.css";
import { useRouter } from "next/navigation";
import saveBrand from "@/app/services/saveBrand";

export default function Create() {
  const router = useRouter();
  const [brand, setBrand] = useState<String>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrand(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await saveBrand(brand);
    if (response?.status === 201) {
      setBrand("");
      router.push("/brands");
      alert(response.data.message);
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles.mobileForm}>
      <h1 className={styles.heading}>Create Brand</h1>
      <div className={styles.formGroup}>
        <label htmlFor='brand'>
          Brand:
          <input
            type='text'
            id='brand'
            value={brand.toString()}
            name='brand'
            onChange={handleChange}
            className={styles.formControl}
          />
        </label>
      </div>

      <div className={styles.formGroup}>
        <button type='submit' className={styles.button}>
          Save
        </button>
      </div>
    </form>
  );
}
