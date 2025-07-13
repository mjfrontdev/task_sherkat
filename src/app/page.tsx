"use client";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import styles from "./landing.module.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import { MdTaskAlt, MdDashboard } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";

const welcomeText = "به سامانه احراز هویت خوش آمدید!";

const LandingPage = () => {
  const router = useRouter();
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    AOS.init({ duration: 900, once: true });
    // انیمیشن تایپینگ متن خوش آمدگویی
    let i = 0;
    const interval = setInterval(() => {
      if (textRef.current) {
        textRef.current.innerText = welcomeText.slice(0, i + 1);
      }
      i++;
      if (i === welcomeText.length) clearInterval(interval);
    }, 60);
    return () => {
      clearInterval(interval);
      if (AOS.refreshHard) AOS.refreshHard();
    };
  }, []);

  return (
    <div className={styles.landingWrapper}>
      <div className={styles.card} data-aos="zoom-in">
        <MdTaskAlt size={48} color="#0070f3" style={{marginBottom: '1rem'}} data-aos="fade-down" />
        <h1 ref={textRef} className={styles.animatedText}></h1>
        <div className={styles.btnGroup}>
          <Button onClick={() => router.push("/auth")} data-aos="fade-up" data-aos-delay="300">
            <FiLogIn style={{marginLeft:8, verticalAlign:'middle'}} size={20} /> ورود
          </Button>
          <Button onClick={() => router.push("/dashboard")} data-aos="fade-up" data-aos-delay="500" style={{background:'#222'}}>
            <MdDashboard style={{marginLeft:8, verticalAlign:'middle'}} size={20} /> داشبورد
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
