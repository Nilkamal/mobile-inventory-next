"use client";
import React, { useState, useEffect } from "react";

import styles from "./edit.module.css";
import { useParams, useRouter } from "next/navigation";
import updateBrand from "@/app/services/updateBrand";
import getBrand from "@/app/services/getBrand";

export default function Create() {
  const router = useRouter();
  const params = useParams();
  const [brand, setBrand] = useState<String>("");

  const getBrandData = async () => {
    const data = await getBrand(params.id as String);
    setBrand(data.brand);
  };

  useEffect(() => {
    getBrandData();
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrand(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await updateBrand(params.id as String, brand);
    if (response?.status === 200) {
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
