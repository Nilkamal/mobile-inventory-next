"use client";
import React, { useState, useEffect } from "react";

import styles from "./edit.module.css";
import { useParams, useRouter } from "next/navigation";
import getBrands from "../../../services/getBrands";
import saveMobile from "../../../services/saveMobile";
import getMobile from "@/app/services/getMobile";
import updateMobile from "@/app/services/updateMobile";

export default function Edit() {
  const router = useRouter();
  const params = useParams();
  console.log(params);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [formData, setFormData] = useState<Mobile>({
    brand: "",
    mobile: "",
    ram: "",
    storage: "",
    quantity: 0,
    _id: "",
  });

  const getBrandsData = async () => {
    const brands = await getBrands();
    setBrands(brands);
  };

  const getMobileData = async () => {
    const mobile = await getMobile(params.id as String);
    setFormData({ ...formData, ...mobile.data });
  };
  useEffect(() => {
    getBrandsData();
    getMobileData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await updateMobile(formData);
    if (response?.status === 200) {
      setFormData({ brand: "", mobile: "", ram: "", storage: "", quantity: 0 });
      router.push("/");
      alert(response.data.message);
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles.mobileForm}>
      <h1 className={styles.heading}>Save Mobile Stock</h1>
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
            {brands.map(({ _id, brand }: Brand) => (
              <option value={_id.toString()}>{brand}</option>
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
            value={formData.mobile.toString()}
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
            value={formData.ram.toString()}
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
            value={formData.storage.toString()}
            name='storage'
            onChange={handleChange}
            className={styles.formControl}
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='quantity'>
          Quantity:
          <input
            type='number'
            id='quantity'
            value={formData.quantity.toString()}
            name='quantity'
            onChange={handleChange}
            className={styles.formControl}
            min={0}
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
