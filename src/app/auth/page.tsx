"use client";
import React, { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import styles from "./auth.module.scss";
import { FaMobileAlt } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { MdErrorOutline } from "react-icons/md";

const AuthPage = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^09\d{9}$/.test(phone)) {
      setError("شماره موبایل معتبر نیست");
      return;
    }
    setError(undefined);
    setLoading(true);
    try {
      const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
      const data = await res.json();
      if (data.results && data.results[0]) {
        localStorage.setItem("user", JSON.stringify(data.results[0]));
        router.push("/dashboard");
      } else {
        setError("خطا در دریافت اطلاعات کاربر");
      }
    } catch {
      setError("خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authWrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>ورود به حساب کاربری</h2>
        <div className={styles.inputWrapper}>
          <Input
            name="phone"
            type="tel"
            placeholder=" "
            value={phone}
            onChange={e => setPhone(e.target.value)}
            error={error}
            maxLength={11}
            autoFocus
            className={styles.input}
          />
          <span className={styles.floatingLabel}>شماره موبایل</span>
          <span className={styles.icon}><FaMobileAlt /></span>
        </div>
        <Button type="submit" disabled={loading} className={styles.button}>
          <FiLock style={{marginLeft:8, verticalAlign:'middle'}} size={18} />
          {loading ? "در حال ورود..." : "ورود"}
        </Button>
        {error && (
          <div style={{display:'flex',alignItems:'center',color:'#e00',marginTop:'0.5rem',fontSize:'0.98rem'}}>
            <MdErrorOutline size={18} style={{marginLeft:4}} />
            <span>{error}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default AuthPage; 