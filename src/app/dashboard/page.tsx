"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.scss";
import { MdTaskAlt } from "react-icons/md";

const DashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    const user = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (!user) {
      router.replace("/auth");
    }
  }, [router]);

  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.card}>
        <MdTaskAlt size={44} color="#0070f3" style={{marginBottom: '1rem'}} />
        <h1>خوش آمدید به داشبورد 🎉</h1>
        <p style={{textAlign:'center', color:'#444', fontSize:'1.1rem', marginTop:'1.2rem'}}>شما با موفقیت وارد سامانه شدید. از اینجا می‌توانید به امکانات داشبورد دسترسی داشته باشید.</p>
      </div>
    </div>
  );
};

export default DashboardPage; 