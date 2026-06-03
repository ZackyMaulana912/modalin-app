import React from "react";
import {
  apiRegister,
  apiLogin,
  apiForgotPassword,
  apiVerifyOTP,
  apiResetPassword,
  apiUpdatePersonal,
  apiUpdateBusiness,
  apiChangePassword,
  apiUploadFiles,
} from "./services/api";
import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import imgHero from "@/assets/images/hero.png";
import imgLogo from "@/assets/images/logo.png";
const svgRegPaths = {
  p3e801e80: "M11 12C12.25 12C13.3125 11.5625 14.1875 10.6875C15.0625 9.8125 15.5 8.75 15.5 7.5C15.5 6.25 15.0625 5.1875 14.1875 4.3125C13.3125 3.4375 12.25 3 11 3C9.75 3 8.6875 3.4375 7.8125 4.3125C6.9375 5.1875 6.5 6.25 6.5 7.5C6.5 8.75 6.9375 9.8125 7.8125 10.6875C8.6875 11.5625 9.75 12 11 12ZM11 10.2C10.25 10.2 9.6125 9.9375 9.0875 9.4125C8.5625 8.8875 8.3 8.25 8.3 7.5C8.3 6.75 8.5625 6.1125 9.0875 5.5875C9.6125 5.0625 10.25 4.8 11 4.8C11.75 4.8 12.3875 5.0625 12.9125 5.5875C13.4375 6.1125 13.7 6.75 13.7 7.5C13.7 8.25 13.4375 8.8875 12.9125 9.4125C12.3875 9.9375 11.75 10.2 11 10.2ZM11 15C8.56667 15 6.35 14.3208 4.35 12.9625C2.35 11.6042 0.9 9.78333 0 7.5C0.9 5.21667 2.35 3.39583 4.35 2.0375C6.35 0.679167 8.56667 0 11 0C13.4333 0 15.65 0.679167 17.65 2.0375C19.65 3.39583 21.1 5.21667 22 7.5C21.1 9.78333 19.65 11.6042 17.65 12.9625C15.65 14.3208 13.4333 15 11 15ZM11 13C12.8833 13 14.6125 12.5042 16.1875 11.5125C17.7625 10.5208 18.9667 9.18333 19.8 7.5C18.9667 5.81667 17.7625 4.47917 16.1875 3.4875C14.6125 2.49583 12.8833 2 11 2C9.11667 2 7.3875 2.49583 5.8125 3.4875C4.2375 4.47917 3.03333 5.81667 2.2 7.5C3.03333 9.18333 4.2375 10.5208 5.8125 11.5125C7.3875 12.5042 9.11667 13 11 13Z",
  pd7965c0: "M0 8C0 3.58172 3.58172 0 8 0H390C394.418 0 398 3.58172 398 8V45C398 49.4183 394.418 53 390 53H7.99999C3.58171 53 0 49.4183 0 45V8Z",
};
const svgLoginPaths = svgRegPaths;
import imgNavHome from "@/assets/icons/nav-home.png";
import imgNavScoring from "@/assets/icons/nav-scoring.png";
import imgNavAnomali from "@/assets/icons/nav-anomali.png";
import imgNavRekom from "@/assets/icons/nav-rekom.png";
import imgNavAi from "@/assets/icons/nav-ai.png";
import imgArrowUp from "@/assets/icons/arrow-up.png";
import imgArrowDown from "@/assets/icons/arrow-down.png";
import imgPerson from "@/assets/images/person.png";
import imgEditIcon from "@/assets/icons/edit.png";
import imgUploadIcon from "@/assets/icons/upload.png";
import imgBoxImportant from "@/assets/icons/box-important.png";
import imgForward from "@/assets/icons/forward.png";
import imgHighImportance from "@/assets/icons/high-importance.png";
import imgMarket from "@/assets/images/market.png";
import imgVerificationBadge from "@/assets/icons/verification-badge.png";
import imgFolder from "@/assets/icons/folder.png";
import imgLock from "@/assets/icons/lock.png";
import imgComboChart from "@/assets/icons/combo-chart.png";
const svgPaths = {
  p1a406200: "M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z",
};
import imgTipsLight from "@/assets/icons/tips-light.png";
import imgButuhModal from "@/assets/images/butuh-modal.png";
const svgDashPaths = {
  p1e3fa6c0: "M12.7071 8.07107C13.0976 7.68054 13.0976 7.04738 12.7071 6.65685L6.34315 0.292893C5.95262 -0.097631 5.31946 -0.097631 4.92893 0.292893C4.53841 0.683418 4.53841 1.31658 4.92893 1.70711L10.5858 7.36396L4.92893 13.0208C4.53841 13.4113 4.53841 14.0445 4.92893 14.435C5.31946 14.8256 5.95262 14.8256 6.34315 14.435L12.7071 8.07107ZM0 7.36396V8.36396H12V7.36396V6.36396H0V7.36396Z",
  p3e801e80: "M11 12C12.25 12C13.3125 11.5625 14.1875 10.6875C15.0625 9.8125 15.5 8.75 15.5 7.5C15.5 6.25 15.0625 5.1875 14.1875 4.3125C13.3125 3.4375 12.25 3 11 3C9.75 3 8.6875 3.4375 7.8125 4.3125C6.9375 5.1875 6.5 6.25 6.5 7.5C6.5 8.75 6.9375 9.8125 7.8125 10.6875C8.6875 11.5625 9.75 12 11 12ZM11 10.2C10.25 10.2 9.6125 9.9375 9.0875 9.4125C8.5625 8.8875 8.3 8.25 8.3 7.5C8.3 6.75 8.5625 6.1125 9.0875 5.5875C9.6125 5.0625 10.25 4.8 11 4.8C11.75 4.8 12.3875 5.0625 12.9125 5.5875C13.4375 6.1125 13.7 6.75 13.7 7.5C13.7 8.25 13.4375 8.8875 12.9125 9.4125C12.3875 9.9375 11.75 10.2 11 10.2ZM11 15C8.56667 15 6.35 14.3208 4.35 12.9625C2.35 11.6042 0.9 9.78333 0 7.5C0.9 5.21667 2.35 3.39583 4.35 2.0375C6.35 0.679167 8.56667 0 11 0C13.4333 0 15.65 0.679167 17.65 2.0375C19.65 3.39583 21.1 5.21667 22 7.5C21.1 9.78333 19.65 11.6042 17.65 12.9625C15.65 14.3208 13.4333 15 11 15ZM11 13C12.8833 13 14.6125 12.5042 16.1875 11.5125C17.7625 10.5208 18.9667 9.18333 19.8 7.5C18.9667 5.81667 17.7625 4.47917 16.1875 3.4875C14.6125 2.49583 12.8833 2 11 2C9.11667 2 7.3875 2.49583 5.8125 3.4875C4.2375 4.47917 3.03333 5.81667 2.2 7.5C3.03333 9.18333 4.2375 10.5208 5.8125 11.5125C7.3875 12.5042 9.11667 13 11 13Z",
};
import imgBCA from "@/assets/images/bca.png";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: i * 0.15 },
  }),
};

function useCountUp(target: number, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(ease * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

function CountUp({ to, duration = 1200, format }: { to: number; duration?: number; format?: (n: number) => string }) {
  const val = useCountUp(to, duration);
  return <>{format ? format(val) : val.toLocaleString("id-ID")}</>;
}

type Page = "home" | "register" | "login" | "forgot-password" | "verify-code" | "new-password" | "profile" | "dashboard" | "cairkan-dana" | "bayar-tagihan" | "hasil-scoring" | "anomali-arus-kas" | "rekomendasi" | "ai-advisor";

interface UserProfile {
  nik: string;
  nama: string;
  email: string;
  telepon: string;
  alamat: string;
  identitasUsaha: string;
  namaPemilik: string;
  jenisUsaha: string;
  alamatUsaha: string;
  lamaBerdiri: string;
  omzetBulanan: string;
  pengeluaranBulanan: string;
  totalHutang: string;
  totalAset: string;
  frekuensiTransaksi: string;
}

const arrowLeftPath = "M14.7071 8.07107C15.0976 7.68054 15.0976 7.04738 14.7071 6.65685L8.34315 0.292893C7.95262 -0.097631 7.31946 -0.097631 6.92893 0.292893C6.53841 0.683418 6.53841 1.31658 6.92893 1.70711L12.5858 7.36396L6.92893 13.0208C6.53841 13.4113 6.53841 14.0445 6.92893 14.435C7.31946 14.8256 7.95262 14.8256 8.34315 14.435L14.7071 8.07107ZM0 7.36396V8.36396H14V7.36396V6.36396H0V7.36396Z";
const eyePath = "M11 12C12.25 12 13.3125 11.5625 14.1875 10.6875C15.0625 9.8125 15.5 8.75 15.5 7.5C15.5 6.25 15.0625 5.1875 14.1875 4.3125C13.3125 3.4375 12.25 3 11 3C9.75 3 8.6875 3.4375 7.8125 4.3125C6.9375 5.1875 6.5 6.25 6.5 7.5C6.5 8.75 6.9375 9.8125 7.8125 10.6875C8.6875 11.5625 9.75 12 11 12V12M11 10.2C10.25 10.2 9.6125 9.9375 9.0875 9.4125C8.5625 8.8875 8.3 8.25 8.3 7.5C8.3 6.75 8.5625 6.1125 9.0875 5.5875C9.6125 5.0625 10.25 4.8 11 4.8C11.75 4.8 12.3875 5.0625 12.9125 5.5875C13.4375 6.1125 13.7 6.75 13.7 7.5C13.7 8.25 13.4375 8.8875 12.9125 9.4125C12.3875 9.9375 11.75 10.2 11 10.2V10.2M11 15C8.56667 15 6.35 14.3208 4.35 12.9625C2.35 11.6042 0.9 9.78333 0 7.5C0.9 5.21667 2.35 3.39583 4.35 2.0375C6.35 0.679167 8.56667 0 11 0C13.4333 0 15.65 0.679167 17.65 2.0375C19.65 3.39583 21.1 5.21667 22 7.5C21.1 9.78333 19.65 11.6042 17.65 12.9625C15.65 14.3208 13.4333 15 11 15V15M11 13C12.8833 13 14.6125 12.5042 16.1875 11.5125C17.7625 10.5208 18.9667 9.18333 19.8 7.5C18.9667 5.81667 17.7625 4.47917 16.1875 3.4875C14.6125 2.49583 12.8833 2 11 2C9.11667 2 7.3875 2.49583 5.8125 3.4875C4.2375 4.47917 3.03333 5.81667 2.2 7.5C3.03333 9.18333 4.2375 10.5208 5.8125 11.5125C7.3875 12.5042 9.11667 13 11 13V13";

interface NavbarProps {
  activeNav: string | null;
  onNavClick: (id: string) => void;
  onDaftar: () => void;
  onMasuk: () => void;
}

function Navbar({ activeNav, onNavClick, onDaftar, onMasuk }: NavbarProps) {
  return (
    <motion.nav
      className="bg-white shadow-[0px_4px_2px_rgba(0,0,0,0.25)] w-full fixed top-0 left-0 z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between px-11 py-6">
        <img src={imgLogo} alt="ModalIn" className="h-[53px] w-[175px] object-cover" />
        <div className="flex items-center gap-16">
          <button
            onClick={() => onNavClick("produk")}
            className={`text-base font-['Plus_Jakarta_Sans',sans-serif] transition-colors ${activeNav === "produk"
              ? "text-[#006b55] font-semibold"
              : "text-black font-normal"
              }`}
          >
            Produk
          </button>
          <button
            onClick={() => onNavClick("cara-kerja")}
            className={`text-base font-['Plus_Jakarta_Sans',sans-serif] transition-colors ${activeNav === "cara-kerja"
              ? "text-[#006b55] font-semibold"
              : "text-black font-normal"
              }`}
          >
            Cara Kerja
          </button>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={onMasuk} className="text-black font-normal text-base font-['Plus_Jakarta_Sans',sans-serif] hover:text-[#006b55] transition-colors">Masuk</button>
          <button
            onClick={onDaftar}
            className="bg-[#00d4aa] text-white font-bold text-base font-['Plus_Jakarta_Sans',sans-serif] px-7 py-2.5 rounded-[9px] hover:opacity-90 transition-opacity"
          >
            Daftar
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

function Hero({ onRegister }: { onRegister: () => void }) {
  return (
    <section className="w-full relative overflow-hidden" style={{ minHeight: 583 }}>
      <img
        src={imgHero}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
      <div className="relative z-10 max-w-5xl mx-auto px-8 py-24 flex flex-col items-center gap-12 text-center">
        <motion.div
          className="flex flex-col gap-3"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h1
            variants={fadeUp}
            className="text-white font-extrabold text-[64px] leading-[72px] tracking-[-1.28px] font-['Plus_Jakarta_Sans',sans-serif]"
          >
            Pemberdayaan
          </motion.h1>
          <motion.h1
            variants={fadeUp}
            className="text-white font-extrabold text-[64px] leading-[72px] tracking-[-1.28px] font-['Plus_Jakarta_Sans',sans-serif]"
          >
            UMKM dengan <span>AI</span> <span>Credit Scoring</span> Modern
          </motion.h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          className="text-white font-normal text-lg leading-7 font-['Plus_Jakarta_Sans',sans-serif] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
        >
          Akses permodalan kini lebih inklusif dengan teknologi<br />
          penilaian kredit alternatif. Kami menganalisis potensi bisnis<br />
          Anda melampaui riwayat bank konvensional.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="flex justify-center"
        >
          <motion.button
            onClick={onRegister}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="bg-gradient-to-r from-[#00d4aa] to-[#006b55] text-white font-bold text-base font-['Plus_Jakarta_Sans',sans-serif] px-8 py-4 rounded-xl flex items-center gap-4 hover:opacity-90 transition-opacity"
          >
            Mulai Analisis Sekarang
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d={svgPaths.p1a406200} fill="white" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({ title, description, index }: { title: string; description: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ scale: 1.02, boxShadow: "0px 8px 24px rgba(0,0,0,0.12)" }}
      className="bg-white shadow-[0px_4px_2px_rgba(0,0,0,0.25)] rounded-2xl px-10 py-6 w-full cursor-default"
    >
      <h3 className="text-[#001038] font-semibold text-[28px] leading-9 font-['Plus_Jakarta_Sans',sans-serif] mb-2.5">
        {title}
      </h3>
      <p className="text-[#44464f] font-normal text-base leading-6 font-['Plus_Jakarta_Sans',sans-serif]">
        {description}
      </p>
    </motion.div>
  );
}

function Features({ sectionRef }: { sectionRef: React.RefObject<HTMLElement> }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={sectionRef} id="produk" className="w-full bg-[#eff4ff] py-16 px-16 mt-16">
      <div className="flex gap-10 items-start max-w-[1200px] mx-auto">
        <motion.div
          className="shrink-0"
          initial={{ opacity: 0, x: -48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <img
            src={imgMarket}
            alt="Pasar tradisional"
            className="w-[424px] h-[753px] object-cover rounded-[18px]"
          />
        </motion.div>
        <div className="flex flex-col gap-6 pt-2 flex-1">
          <motion.div
            ref={ref}
            className="mb-4"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-[#001038] font-bold text-[40px] leading-[48px] tracking-[-0.4px] font-['Plus_Jakarta_Sans',sans-serif]">
              Fitur Unggulan Kami
            </h2>
            <p className="text-[#44464f] font-normal text-lg leading-7 font-['Plus_Jakarta_Sans',sans-serif] mt-3 max-w-[600px]">
              Teknologi mutakhir yang dirancang khusus untuk mengakselerasi pertumbuhan bisnis mikro dan menengah di Indonesia.
            </p>
          </motion.div>
          <FeatureCard
            index={0}
            title="AI Credit Scoring"
            description="Scoring alternatif berbasis kecerdasan buatan untuk menilai kelayakan kredit berdasarkan data operasional real-time."
          />
          <FeatureCard
            index={1}
            title="Smart Advisor"
            description="Rekomendasi finansial cerdas yang dipersonalisasi untuk membantu pengambilan keputusan bisnis yang lebih tepat"
          />
          <FeatureCard
            index={2}
            title="Cash Flow Detection"
            description="Deteksi dini anomali dan kesehatan arus kas untuk mencegah risiko finansial sebelum menjadi masalah besar."
          />
        </div>
      </div>
    </section>
  );
}

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  index: number;
}

function Step({ icon, title, description, index }: StepProps) {
  return (
    <motion.div
      className="flex flex-col items-center text-center gap-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.18, ease: "easeOut" }}
    >
      <motion.div
        className="bg-[#2f6ab7] rounded-full size-[100px] flex items-center justify-center shrink-0"
        whileHover={{ scale: 1.1, rotate: 6 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      >
        {icon}
      </motion.div>
      <div>
        <h3 className="text-black font-semibold text-[28px] leading-9 font-['Plus_Jakarta_Sans',sans-serif]">
          {title}
        </h3>
        <div className="text-[rgba(0,0,0,0.8)] font-normal text-base leading-6 font-['Plus_Jakarta_Sans',sans-serif] mt-1">
          {description}
        </div>
      </div>
    </motion.div>
  );
}

function HowItWorks({ sectionRef, onRegister }: { sectionRef: React.RefObject<HTMLElement>; onRegister: () => void }) {
  return (
    <section ref={sectionRef} id="cara-kerja" className="w-full px-8 pt-16 pb-16">
      <motion.div
        className="bg-[#eff4ff] rounded-[27px] max-w-[1302px] mx-auto overflow-hidden py-16 px-12"
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <h2 className="text-[#001038] font-bold text-[40px] leading-[48px] tracking-[-0.4px] font-['Plus_Jakarta_Sans',sans-serif] text-center mb-16">
          Cara Kerja ModalIn
        </h2>
        <div className="flex justify-around items-start gap-8">
          <Step
            index={0}
            icon={
              <div className="relative size-[56px] flex items-center justify-center">
                <img src={imgFolder} alt="" className="size-[56px] object-contain" />
                <img src={imgLock} alt="" className="absolute bottom-0 right-0 size-5 object-contain" />
              </div>
            }
            title="Hubungkan Data"
            description={
              <>
                Integrasikan data transaksi dan<br />
                operasional bisnis Anda dengan aman.
              </>
            }
          />
          <Step
            index={1}
            icon={
              <img src={imgComboChart} alt="" className="size-[56px] object-contain" />
            }
            title="Analisis AI"
            description={
              <>
                Mesin cerdas kami menganalisis pola<br />
                pertumbuhan dan risiko bisnis secara<br />
                mendalam.
              </>
            }
          />
          <Step
            index={2}
            icon={
              <img src={imgVerificationBadge} alt="" className="size-[56px] object-contain" />
            }
            title="Dapatkan Skor"
            description={
              <>
                Dapatkan skor kredit alternatif dan akses<br />
                ke berbagai produk pendanaan.
              </>
            }
          />
        </div>
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
        >
          <motion.button
            onClick={onRegister}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#2f6ab7] text-white font-extrabold text-lg leading-7 font-['Plus_Jakarta_Sans',sans-serif] px-12 py-4 rounded-2xl hover:bg-[#2559a0] transition-colors"
          >
            Mulai Sekarang
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

function RegisterPage({ onBack, onLogin, onComplete }: { onBack: () => void; onLogin: () => void; onComplete: (nik: string, nama: string, email: string) => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    nik: "",
    nama: "",
    email: "",
    password: "",
    confirm: "",
  });

  const eyeIcon = (
    <svg width="22" height="15" viewBox="0 0 22 15" fill="none">
      <path d={svgRegPaths.p3e801e80} fill="#44464F" />
    </svg>
  );

  return (
    <motion.div
      className="min-h-screen w-full bg-[#f8f9ff] flex items-center justify-center py-10 px-4"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="bg-white rounded-[12px] w-full max-w-[448px] px-[28px] py-10 flex flex-col items-center gap-0 shadow-sm">
        {/* Logo */}
        <img src={imgLogo} alt="ModalIn" className="h-[47px] w-[155px] object-cover mb-6" />

        {/* Header */}
        <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[28px] leading-[36px] text-[#001038] text-center mb-1">
          Pendaftaran Akun
        </h1>
        <p className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] leading-[24px] text-[#44464f] text-center mb-6">
          Mulai langkah sukses UMKM Anda bersama ModalIn.
        </p>

        {/* NIK */}
        <div className="w-full mb-4">
          <label className="block font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[14px] leading-[20px] text-[#001038] tracking-[0.7px] mb-1.5">
            NIK
          </label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Masukkan 16 digit NIK"
            value={form.nik}
            maxLength={16}
            onChange={(e) => setForm({ ...form, nik: e.target.value.replace(/\D/g, "") })}
            className="w-full h-[49px] bg-[#eff4ff] border border-[#c5c6d0] rounded-[8px] px-4 font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] text-[#001038] placeholder:text-[#6b7280] outline-none focus:border-[#006b55] transition-colors"
          />
          {form.nik.length > 0 && form.nik.length < 16 && (
            <p className="text-red-500 text-[12px] mt-1 font-['Plus_Jakarta_Sans',sans-serif]">NIK harus 16 digit angka</p>
          )}
        </div>

        {/* Nama Lengkap */}
        <div className="w-full mb-4">
          <label className="block font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[14px] leading-[20px] text-[#001038] tracking-[0.7px] mb-1.5">
            Nama Lengkap
          </label>
          <input
            type="text"
            placeholder="Masukkan nama lengkap"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            className="w-full h-[49px] bg-[#eff4ff] border border-[#c5c6d0] rounded-[8px] px-4 font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] text-[#001038] placeholder:text-[#6b7280] outline-none focus:border-[#006b55] transition-colors"
          />
        </div>

        {/* Email */}
        <div className="w-full mb-4">
          <label className="block font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[14px] leading-[20px] text-[#001038] tracking-[0.7px] mb-1.5">
            Email
          </label>
          <input
            type="email"
            placeholder="contoh@modalin.co.id"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full h-[49px] bg-[#eff4ff] border border-[#c5c6d0] rounded-[8px] px-4 font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] text-[#001038] placeholder:text-[#6b7280] outline-none focus:border-[#006b55] transition-colors"
          />
        </div>

        {/* Password */}
        <div className="w-full mb-4">
          <label className="block font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[14px] leading-[20px] text-[#001038] tracking-[0.7px] mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 karakter"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full h-[49px] bg-[#eff4ff] border border-[#c5c6d0] rounded-[8px] px-4 pr-12 font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] text-[#001038] placeholder:text-[#6b7280] outline-none focus:border-[#006b55] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center"
            >
              {eyeIcon}
            </button>
          </div>
          {form.password.length > 0 && form.password.length < 8 && (
            <p className="text-red-500 text-[12px] mt-1 font-['Plus_Jakarta_Sans',sans-serif]">Password minimal 8 karakter</p>
          )}
        </div>

        {/* Konfirmasi Password */}
        <div className="w-full mb-6">
          <label className="block font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[14px] leading-[20px] text-[#001038] tracking-[0.7px] mb-1.5">
            Konfirmasi Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Ulangi Password"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              className="w-full h-[49px] bg-[#eff4ff] border border-[#c5c6d0] rounded-[8px] px-4 pr-12 font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] text-[#001038] placeholder:text-[#6b7280] outline-none focus:border-[#006b55] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center"
            >
              {eyeIcon}
            </button>
          </div>
          {form.confirm.length > 0 && form.confirm !== form.passwordBaru && (
            <p className="text-red-500 text-[12px] mt-1 font-['Plus_Jakarta_Sans',sans-serif]">Password tidak sama</p>
          )}
        </div>

        {/* Daftar Sekarang Button */}
        {(() => {
          const nikOk = form.nik.length === 16;
          const namaOk = form.nama.trim().length > 0;
          const emailOk = form.email.trim().length > 0;
          const passOk = form.password.length >= 8;
          const confirmOk = form.confirm === form.password && form.confirm.length >= 8;
          const canSubmit = nikOk && namaOk && emailOk && passOk && confirmOk;
          return (
            <>
              {errorMsg && (
                <p className="text-red-500 text-[13px] mb-3 w-full font-['Plus_Jakarta_Sans',sans-serif]">
                  {errorMsg}
                </p>
              )}
              <motion.button
                whileHover={canSubmit ? { scale: 1.02 } : {}}
                whileTap={canSubmit ? { scale: 0.97 } : {}}
                onClick={async () => {
                  if (!canSubmit || loading) return;
                  setLoading(true);
                  setErrorMsg("");
                  try {
                    await apiRegister({
                      nik: form.nik,
                      nama: form.nama,
                      email: form.email,
                      password: form.password,
                    });
                    onComplete(form.nik, form.nama, form.email);
                  } catch (err: unknown) {
                    setErrorMsg(err instanceof Error ? err.message : "Gagal mendaftar.");
                  } finally {
                    setLoading(false);
                  }
                }}
                className={`w-full h-[53px] rounded-[8px] font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[16px] text-white mb-5 transition-opacity ${canSubmit ? "bg-gradient-to-r from-[#00D4AA] to-[#00B08E] cursor-pointer hover:opacity-95" : "bg-[#a0a0a0] cursor-not-allowed"}`}
              >
                {loading ? "Mendaftar..." : "Daftar Sekarang"}
              </motion.button>
            </>
          );
        })()}

        {/* Sudah punya akun */}
        <p className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] leading-[24px] text-[#44464f]">
          Sudah punya akun?{" "}
          <button
            onClick={onLogin}
            className="font-bold text-[#006b55] hover:underline"
          >
            Masuk
          </button>
        </p>
      </div>
    </motion.div>
  );
}

function LoginPage({ onRegister, onForgotPassword, onSuccess }: { onRegister: () => void; onForgotPassword: () => void; onSuccess: (user: UserProfile & { id: string }) => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  const eyeIcon = (
    <svg width="22" height="15" viewBox="0 0 22 15" fill="none">
      <path d={svgLoginPaths.p3e801e80} fill="#44464F" />
    </svg>
  );

  return (
    <motion.div
      className="min-h-screen w-full bg-[#f8f9ff] flex items-center justify-center py-10 px-4"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="bg-white rounded-[9px] w-full max-w-[450px] px-[28px] py-10 flex flex-col items-center shadow-sm">
        {/* Logo */}
        <img src={imgLogo} alt="ModalIn" className="h-[47px] w-[155px] object-cover mb-6" />

        {/* Header */}
        <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[28px] leading-[36px] text-[#001038] text-center mb-1">
          Masuk ke ModalIn
        </h1>
        <p className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] leading-[24px] text-[#44464f] text-center mb-6">
          Wujudkan Akses Modal UMKM Anda
        </p>

        {/* Email */}
        <div className="w-full mb-4">
          <label className="block font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[14px] leading-[20px] text-[#001038] tracking-[0.7px] mb-1.5">
            Email
          </label>
          <input
            type="email"
            placeholder="contoh@modalin.co.id"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full h-[49px] bg-[#eff4ff] border border-[#c5c6d0] rounded-[8px] px-4 font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] text-[#001038] placeholder:text-[#6b7280] outline-none focus:border-[#006b55] transition-colors"
          />
        </div>

        {/* Password */}
        <div className="w-full mb-2">
          <label className="block font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[14px] leading-[20px] text-[#001038] tracking-[0.7px] mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan Password Anda"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full h-[49px] bg-[#eff4ff] border border-[#c5c6d0] rounded-[8px] px-4 pr-12 font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] text-[#001038] placeholder:text-[#6b7280] outline-none focus:border-[#006b55] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center"
            >
              {eyeIcon}
            </button>
          </div>
        </div>

        {/* Lupa Password */}
        <div className="w-full flex justify-end mb-5">
          <button
            onClick={onForgotPassword}
            className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[14px] leading-[20px] text-[#7b8dc6] tracking-[0.7px] hover:underline"
          >
            Lupa Password?
          </button>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-[#dfe4ff] mb-5" />


        {errorMsg && (
          <p className="text-red-500 text-[13px] mb-3 w-full font-['Plus_Jakarta_Sans',sans-serif] text-center">
            {errorMsg}
          </p>
        )}

        {/* Masuk Button */}
        {(() => {
          const canLogin = form.email.trim().length > 0 && form.password.length > 0;
          return (
            <motion.button
              whileHover={canLogin ? { scale: 1.02 } : {}}
              whileTap={canLogin ? { scale: 0.97 } : {}}
              onClick={async () => {
                if (!canLogin || loading) return;
                setLoading(true);
                setErrorMsg("");
                try {
                  const result = await apiLogin({ email: form.email, password: form.password });
                  // Isi userProfile dari data backend
                  onSuccess(result);
                } catch (err: unknown) {
                  setErrorMsg(err instanceof Error ? err.message : "Email atau password salah.");
                } finally {
                  setLoading(false);
                }
              }}
              className={`w-full h-[53px] rounded-[8px] font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[16px] text-white mb-5 transition-opacity ${canLogin ? "bg-gradient-to-r from-[#00D4AA] to-[#00B08E] cursor-pointer hover:opacity-95" : "bg-[#a0a0a0] cursor-not-allowed"}`}
            >
              {loading ? "Masuk..." : "Masuk"}
            </motion.button>
          );
        })()}

        {/* Belum punya akun */}
        <p className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] leading-[24px] text-[#44464f]">
          Belum punya akun?{" "}
          <button
            onClick={onRegister}
            className="font-bold text-[#006b55] hover:underline"
          >
            Daftar Sekarang
          </button>
        </p>
      </div>
    </motion.div>
  );
}

// ── Sidebar nav ──────────────────────────────────────────────────────────────
function DashboardSidebar({ activePage, onNavigate, onLogout }: { activePage?: string; onNavigate?: (page: Page) => void; onLogout?: () => void }) {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try { return localStorage.getItem("modalin_sidebar_collapsed") === "true"; } catch { return false; }
  });

  const toggleCollapsed = () => {
    setCollapsed(prev => {
      const next = !prev;
      try { localStorage.setItem("modalin_sidebar_collapsed", String(next)); } catch {}
      return next;
    });
  };

  const navItems = [
    { icon: imgNavHome, label: "Dashboard", page: "dashboard" as Page },
    { icon: imgNavScoring, label: "Hasil Scoring", page: "hasil-scoring" as Page },
    { icon: imgNavAnomali, label: "Anomali Arus Kas", page: "anomali-arus-kas" as Page },
    { icon: imgNavRekom, label: "Rekomendasi", page: "rekomendasi" as Page },
    { icon: imgNavAi, label: "AI Advisor", page: "ai-advisor" as Page },
  ];
  const activePages: Record<string, string> = {
    "dashboard": "dashboard",
    "hasil-scoring": "hasil-scoring",
    "anomali-arus-kas": "anomali-arus-kas",
    "rekomendasi": "rekomendasi",
    "ai-advisor": "ai-advisor",
  };
  return (
    <aside
      className="bg-[#2f6ab7] flex flex-col shrink-0 sticky top-0 h-screen transition-all duration-300 ease-in-out"
      style={{ width: collapsed ? "72px" : "311px" }}
    >
      {/* Toggle button */}
      <button
        onClick={toggleCollapsed}
        className="absolute -right-3 top-8 z-10 bg-white border border-[#c5c6d0] rounded-full size-6 flex items-center justify-center shadow-md hover:bg-[#f0f4ff] transition-colors"
        title={collapsed ? "Buka sidebar" : "Tutup sidebar"}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="#2f6ab7"
          style={{ transform: collapsed ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.3s" }}>
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>

      <div className="flex-1 flex flex-col gap-1 overflow-y-auto overflow-x-hidden">
        {/* Logo */}
        <div className={`px-3 pt-[30px] pb-4 ${collapsed ? "px-2" : "px-6"}`}>
          {collapsed ? (
            <div className="bg-white rounded-[10px] p-2 flex items-center justify-center">
              <img src={imgLogo} alt="ModalIn" className="h-[28px] w-[28px] object-contain" />
            </div>
          ) : (
            <div className="bg-white rounded-[12px] px-3 py-2 flex items-center justify-center">
              <img src={imgLogo} alt="ModalIn" className="h-[47px] w-full object-contain" />
            </div>
          )}
        </div>
        {!collapsed && (
          <p className="text-white text-[14px] font-semibold tracking-[0.7px] uppercase font-['Plus_Jakarta_Sans',sans-serif] pl-[66px] pb-6">
            UMKM CREDIT SCORING
          </p>
        )}
        {collapsed && <div className="pb-4" />}

        {navItems.map(({ icon, label, page }) => {
          const isActive = activePage === activePages[page];
          return (
            <div
              key={label}
              onClick={() => onNavigate?.(page)}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-5 py-[18px] mx-2 px-3 rounded-[8px] cursor-pointer transition-all ${isActive
                ? "bg-gradient-to-r from-[#00D4AA] to-[#00B08E]"
                : "hover:bg-white/10"
                } ${collapsed ? "justify-center" : ""}`}
            >
              <img src={icon} alt="" className="size-[30px] object-contain shrink-0" />
              {!collapsed && (
                <span className="text-white font-semibold text-[20px] tracking-[0.7px] font-['Plus_Jakarta_Sans',sans-serif] whitespace-nowrap">{label}</span>
              )}
            </div>
          );
        })}
      </div>

      <div className={`px-2 pb-6 pt-3 border-t border-white/20`}>
        <button
          onClick={onLogout}
          title={collapsed ? "Keluar" : undefined}
          className={`flex items-center gap-4 w-full py-[14px] px-3 rounded-[8px] hover:bg-white/10 transition-all cursor-pointer ${collapsed ? "justify-center" : ""}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 17L21 12L16 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 12H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {!collapsed && <span className="text-white font-semibold text-[20px] tracking-[0.7px] font-['Plus_Jakarta_Sans',sans-serif]">Keluar</span>}
        </button>
      </div>
    </aside>
  );
}

// ── Edit Informasi Pribadi modal ──────────────────────────────────────────────
function EditPersonalInfoModal({
  initial,
  onClose,
  onSave,
}: {
  initial: Pick<UserProfile, "nik" | "nama" | "email" | "telepon" | "alamat">;
  onClose: () => void;
  onSave: (data: Pick<UserProfile, "nik" | "nama" | "email" | "telepon" | "alamat">) => void;
}) {
  const [form, setForm] = useState({ ...initial });
  const [nikError, setNikError] = useState("");
  const nikValid = /^\d{16}$/.test(form.nik);
  const allFilled = nikValid && form.nama.trim() && form.email.trim() && form.telepon.trim() && form.alamat.trim();

  const fieldClass = "w-full h-[58px] bg-[#eff4ff] border border-[#a3a3a3] rounded-[12px] px-4 font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] text-[#001038] placeholder:text-[#6b7280] outline-none focus:border-[#006b55] transition-colors";
  const labelClass = "block font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[14px] leading-[20px] text-[#001038] tracking-[0.7px] mb-1.5";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <motion.div
        className="relative bg-white rounded-[12px] w-full max-w-[672px] shadow-xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="bg-[#f8f9ff] border-b border-[#a0a0a0] px-7 py-6">
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[28px] text-[#001038]">Edit Informasi Pribadi</h2>
          <p className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] text-[#44464f] mt-1">
            Perbarui detail profil Anda untuk akurasi data finansial.
          </p>
        </div>

        {/* Body */}
        <div className="px-7 pt-6 pb-4 flex flex-col gap-4">
          {/* NIK */}
          <div>
            <label className={labelClass}>NIK</label>
            <input
              className={`${fieldClass} ${nikError ? "border-red-400" : ""}`}
              placeholder="Masukkan 16 digit NIK"
              value={form.nik}
              maxLength={16}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                setForm({ ...form, nik: val });
                setNikError(val.length > 0 && val.length < 16 ? "NIK harus 16 digit angka" : "");
              }}
            />
            {nikError && <p className="text-red-500 text-[12px] mt-1 font-['Plus_Jakarta_Sans',sans-serif]">{nikError}</p>}
          </div>

          {/* Nama Lengkap */}
          <div>
            <label className={labelClass}>Nama Lengkap</label>
            <input className={fieldClass} placeholder="Masukkan nama lengkap" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} />
          </div>

          {/* Email + Telepon */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className={labelClass}>Alamat Email</label>
              <input type="email" className={fieldClass} placeholder="contoh@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="flex-1">
              <label className={labelClass}>Nomor Telepon</label>
              <div className="flex">
                <div className="h-[58px] bg-[#e5eeff] border border-[#a3a3a3] rounded-l-[12px] px-3 flex items-center shrink-0 font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[16px] text-[#44464f]">
                  ID +62
                </div>
                <input
                  className="flex-1 h-[58px] bg-[#eff4ff] border border-l-0 border-[#a3a3a3] rounded-r-[12px] px-4 font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] text-[#001038] placeholder:text-[#6b7280] outline-none focus:border-[#006b55] transition-colors"
                  placeholder="812-3456-7890"
                  value={form.telepon}
                  onChange={(e) => setForm({ ...form, telepon: e.target.value.replace(/\D/g, "") })}
                />
              </div>
            </div>
          </div>

          {/* Alamat Lengkap */}
          <div>
            <label className={labelClass}>Alamat Lengkap</label>
            <textarea
              className="w-full bg-[#eff4ff] border border-[#a3a3a3] rounded-[12px] px-4 py-3 font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] text-[#001038] placeholder:text-[#6b7280] outline-none focus:border-[#006b55] transition-colors resize-none h-[125px]"
              placeholder="Masukkan alamat lengkap"
              value={form.alamat}
              onChange={(e) => setForm({ ...form, alamat: e.target.value })}
            />
          </div>

          {/* KTP warning */}
          <div className="bg-[#dce9ff] rounded-[12px] px-4 py-3 flex items-start gap-3">
            <img src={imgHighImportance} alt="" className="size-[30px] object-contain shrink-0 mt-0.5" />
            <p className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] text-[#44464f] leading-[20px]">
              Pastikan data yang Anda masukkan sesuai dengan KTP yang terdaftar untuk kelancaran proses verifikasi pinjaman selanjutnya.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#f8f9ff] rounded-b-[12px] px-7 py-5 flex items-center justify-end gap-6">
          <button
            onClick={onClose}
            className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[16px] text-[#2f6ab7] hover:underline"
          >
            Batal
          </button>
          <motion.button
            whileHover={allFilled ? { scale: 1.02 } : {}}
            whileTap={allFilled ? { scale: 0.97 } : {}}
            onClick={async () => {
              try {
                await apiUpdatePersonal(form);
              } catch (err) {
                console.error("Update personal gagal:", err);
              }
              onSave(form);
            }}
            className={`h-[48px] px-8 rounded-[8px] font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[16px] text-white transition-colors ${allFilled ? "bg-[#016b55] cursor-pointer" : "bg-[#a0a0a0] cursor-not-allowed"
              }`}
          >
            Simpan Perubahan
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

// ── Edit Informasi Bisnis modal ───────────────────────────────────────────────
type BusinessData = Omit<UserProfile, "nik" | "nama" | "email" | "telepon" | "alamat">;

function EditBusinessInfoModal({
  initial,
  onClose,
  onSave,
}: {
  initial: BusinessData;
  onClose: () => void;
  onSave: (data: BusinessData) => void;
}) {
  const [form, setForm] = useState({ ...initial });

  const fieldClass = "w-full h-[58px] bg-[#eff4ff] border border-[#a3a3a3] rounded-[12px] px-4 font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] text-[#001038] placeholder:text-[#6b7280] outline-none focus:border-[#006b55] transition-colors";
  const labelClass = "block font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[14px] leading-[20px] text-[#001038] tracking-[0.7px] mb-1.5";

  const allFilled =
    form.identitasUsaha.trim() &&
    form.namaPemilik.trim() &&
    form.jenisUsaha.trim() &&
    form.lamaBerdiri.trim() &&
    form.alamatUsaha.trim() &&
    form.omzetBulanan.trim() &&
    form.pengeluaranBulanan.trim() &&
    form.totalAset.trim() &&
    form.totalHutang.trim() &&
    form.frekuensiTransaksi.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <motion.div
        className="relative bg-white rounded-[12px] w-full max-w-[672px] max-h-[90vh] shadow-xl overflow-hidden flex flex-col"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="bg-[#f8f9ff] border-b border-[#a0a0a0] px-7 py-6 shrink-0">
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[28px] text-[#001038]">Edit Informasi Bisnis</h2>
          <p className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] text-[#44464f] mt-1">
            Perbarui detail bisnis Anda untuk akurasi data finansial.
          </p>
        </div>

        {/* Body — scrollable */}
        <div className="px-7 pt-6 pb-4 flex flex-col gap-4 overflow-y-auto">
          {/* Row 1: Identitas Usaha + Nama Pemilik */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className={labelClass}>Identitas Usaha</label>
              <input className={fieldClass} placeholder="Nama usaha / merek" value={form.identitasUsaha} onChange={(e) => setForm({ ...form, identitasUsaha: e.target.value })} />
            </div>
            <div className="flex-1">
              <label className={labelClass}>Nama Pemilik</label>
              <input className={fieldClass} placeholder="Nama pemilik usaha" value={form.namaPemilik} onChange={(e) => setForm({ ...form, namaPemilik: e.target.value })} />
            </div>
          </div>

          {/* Row 2: Jenis Usaha + Lama Berdiri */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className={labelClass}>Jenis Usaha</label>
              <select
                value={form.jenisUsaha}
                onChange={(e) => setForm({ ...form, jenisUsaha: e.target.value })}
                className={`${fieldClass} appearance-none cursor-pointer ${!form.jenisUsaha ? "text-[#6b7280]" : "text-[#001038]"}`}
              >
                <option value="" disabled hidden>Pilih jenis usaha</option>
                <option value="Bisnis Kuliner">Bisnis Kuliner</option>
                <option value="Produk Kreatif">Produk Kreatif</option>
                <option value="Toko & E-commerce">Toko &amp; E-commerce</option>
                <option value="Jasa & Freelancer">Jasa &amp; Freelancer</option>
                <option value="Produk Digital">Produk Digital</option>
              </select>
            </div>
            <div className="flex-1">
              <label className={labelClass}>Lama Berdiri (Bulan)</label>
              <div className="flex">
                <input
                  className="flex-1 h-[58px] bg-[#eff4ff] border border-[#a3a3a3] rounded-l-[12px] px-4 font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] text-[#001038] placeholder:text-[#6b7280] outline-none focus:border-[#006b55] transition-colors"
                  placeholder="Contoh: 24"
                  inputMode="numeric"
                  value={form.lamaBerdiri}
                  onChange={(e) => setForm({ ...form, lamaBerdiri: e.target.value.replace(/\D/g, "") })}
                />
                <div className="h-[58px] bg-[#e5eeff] border border-l-0 border-[#a3a3a3] rounded-r-[12px] px-4 flex items-center shrink-0 font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[16px] text-[#44464f]">
                  Bulan
                </div>
              </div>
            </div>
          </div>

          {/* Alamat Bisnis */}
          <div>
            <label className={labelClass}>Alamat Bisnis</label>
            <textarea
              className="w-full bg-[#eff4ff] border border-[#a3a3a3] rounded-[12px] px-4 py-3 font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] text-[#001038] placeholder:text-[#6b7280] outline-none focus:border-[#006b55] transition-colors resize-none h-[100px]"
              placeholder="Masukkan alamat bisnis lengkap"
              value={form.alamatUsaha}
              onChange={(e) => setForm({ ...form, alamatUsaha: e.target.value })}
            />
          </div>

          {/* Divider */}
          <div className="border-t border-[#c5c6d0] my-1" />

          {/* Data Keuangan */}
          <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[18px] text-[#001038]">Data Keuangan</h3>

          {/* Row: Omzet + Pengeluaran */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className={labelClass}>Rata-rata Omzet Bulanan (Rp)</label>
              <div className="flex">
                <div className="h-[58px] bg-[#e5eeff] border border-[#a3a3a3] rounded-l-[12px] px-3 flex items-center shrink-0 font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[16px] text-[#44464f]">Rp</div>
                <input
                  className="flex-1 h-[58px] bg-[#eff4ff] border border-l-0 border-[#a3a3a3] rounded-r-[12px] px-4 font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] text-[#001038] placeholder:text-[#6b7280] outline-none focus:border-[#006b55] transition-colors"
                  placeholder="0"
                  inputMode="numeric"
                  value={form.omzetBulanan ? parseInt(form.omzetBulanan).toLocaleString("id-ID") : ""}
                  onChange={(e) => setForm({ ...form, omzetBulanan: e.target.value.replace(/\D/g, "") })}
                />
              </div>
            </div>
            <div className="flex-1">
              <label className={labelClass}>Rata-rata Pengeluaran Bulanan (Rp)</label>
              <div className="flex">
                <div className="h-[58px] bg-[#e5eeff] border border-[#a3a3a3] rounded-l-[12px] px-3 flex items-center shrink-0 font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[16px] text-[#44464f]">Rp</div>
                <input
                  className="flex-1 h-[58px] bg-[#eff4ff] border border-l-0 border-[#a3a3a3] rounded-r-[12px] px-4 font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] text-[#001038] placeholder:text-[#6b7280] outline-none focus:border-[#006b55] transition-colors"
                  placeholder="0"
                  inputMode="numeric"
                  value={form.pengeluaranBulanan ? parseInt(form.pengeluaranBulanan).toLocaleString("id-ID") : ""}
                  onChange={(e) => setForm({ ...form, pengeluaranBulanan: e.target.value.replace(/\D/g, "") })}
                />
              </div>
            </div>
          </div>

          {/* Row: Total Aset + Total Hutang */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className={labelClass}>Estimasi Total Aset Usaha (Rp)</label>
              <div className="flex">
                <div className="h-[58px] bg-[#e5eeff] border border-[#a3a3a3] rounded-l-[12px] px-3 flex items-center shrink-0 font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[16px] text-[#44464f]">Rp</div>
                <input
                  className="flex-1 h-[58px] bg-[#eff4ff] border border-l-0 border-[#a3a3a3] rounded-r-[12px] px-4 font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] text-[#001038] placeholder:text-[#6b7280] outline-none focus:border-[#006b55] transition-colors"
                  placeholder="0"
                  inputMode="numeric"
                  value={form.totalAset ? parseInt(form.totalAset).toLocaleString("id-ID") : ""}
                  onChange={(e) => setForm({ ...form, totalAset: e.target.value.replace(/\D/g, "") })}
                />
              </div>
            </div>
            <div className="flex-1">
              <label className={labelClass}>Total Hutang (Rp)</label>
              <div className="flex">
                <div className="h-[58px] bg-[#e5eeff] border border-[#a3a3a3] rounded-l-[12px] px-3 flex items-center shrink-0 font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[16px] text-[#44464f]">Rp</div>
                <input
                  className="flex-1 h-[58px] bg-[#eff4ff] border border-l-0 border-[#a3a3a3] rounded-r-[12px] px-4 font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] text-[#001038] placeholder:text-[#6b7280] outline-none focus:border-[#006b55] transition-colors"
                  placeholder="0"
                  inputMode="numeric"
                  value={form.totalHutang ? parseInt(form.totalHutang).toLocaleString("id-ID") : ""}
                  onChange={(e) => setForm({ ...form, totalHutang: e.target.value.replace(/\D/g, "") })}
                />
              </div>
            </div>
          </div>

          {/* Frekuensi Transaksi */}
          <div>
            <label className={labelClass}>Frekuensi Transaksi Digital per Bulan</label>
            <input
              className={fieldClass}
              placeholder="Contoh: 20"
              inputMode="numeric"
              value={form.frekuensiTransaksi}
              onChange={(e) => setForm({ ...form, frekuensiTransaksi: e.target.value.replace(/\D/g, "") })}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#f8f9ff] rounded-b-[12px] border-t border-[#a0a0a0] px-7 py-5 flex items-center justify-end gap-6 shrink-0">
          <button onClick={onClose} className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[16px] text-[#2f6ab7] hover:underline">
            Batal
          </button>
          <motion.button
            whileHover={allFilled ? { scale: 1.02 } : {}}
            whileTap={allFilled ? { scale: 0.97 } : {}}
            onClick={async () => {
              try {
                await apiUpdateBusiness(form);
              } catch (err) {
                console.error("Update bisnis gagal:", err);
              }
              onSave(form);
            }}
            className={`h-[48px] px-8 rounded-[8px] font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[16px] text-white transition-colors ${allFilled ? "bg-[#016b55] cursor-pointer" : "bg-[#a0a0a0] cursor-not-allowed"
              }`}
          >
            Simpan Perubahan
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

// ── Ubah Kata Sandi modal ─────────────────────────────────────────────────────
function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ passwordLama: "", passwordBaru: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const passwordValid = form.passwordBaru.length >= 8;
  const confirmValid = form.confirm === form.passwordBaru && form.confirm.length >= 8;
  const allValid = form.passwordLama.length > 0 && passwordValid && confirmValid;

  const EyeIcon = () => (
    <svg width="22" height="15" viewBox="0 0 22 15" fill="none">
      <path d={eyePath} fill="#44464F" />
    </svg>
  );

  const fieldClass = "w-full h-[58px] bg-[#eff4ff] border border-[#a3a3a3] rounded-[12px] px-4 pr-12 font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] text-[#001038] placeholder:text-[#6b7280] outline-none focus:border-[#006b55] transition-colors";
  const labelClass = "block font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[14px] leading-[20px] text-[#001038] tracking-[0.7px] mb-1.5";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <motion.div
        className="relative bg-white rounded-[12px] w-full max-w-[480px] shadow-xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="bg-[#f8f9ff] border-b border-[#a0a0a0] px-7 py-6">
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[28px] text-[#001038]">Ubah Kata Sandi</h2>
          <p className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] text-[#44464f] mt-1">
            Gunakan Kata Sandi yang kuat untuk menjaga keamanan akun Anda.
          </p>
        </div>

        {/* Body */}
        <div className="px-7 pt-6 pb-4 flex flex-col gap-5">
          {/* Password Lama */}
          <div>
            <label className={labelClass}>Password Lama</label>
            <input
              type="password"
              placeholder="Masukkan password lama"
              value={form.passwordLama}
              onChange={(e) => setForm({ ...form, passwordLama: e.target.value })}
              className={fieldClass}
            />
          </div>

          {/* Password Baru */}
          <div>
            <label className={labelClass}>Password Baru</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 karakter"
                value={form.passwordBaru}
                onChange={(e) => setForm({ ...form, passwordBaru: e.target.value })}
                className={fieldClass}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2">
                <EyeIcon />
              </button>
            </div>
            {form.passwordBaru.length > 0 && !passwordValid && (
              <p className="text-red-500 text-[12px] mt-1 font-['Plus_Jakarta_Sans',sans-serif]">Password minimal 8 karakter</p>
            )}
          </div>

          {/* Konfirmasi Password */}
          <div>
            <label className={labelClass}>Konfirmasi Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Ulangi Password"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                className={fieldClass}
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2">
                <EyeIcon />
              </button>
            </div>
            {form.confirm.length > 0 && form.confirm !== form.passwordBaru && (
              <p className="text-red-500 text-[12px] mt-1 font-['Plus_Jakarta_Sans',sans-serif]">Password tidak sama</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#f8f9ff] rounded-b-[12px] border-t border-[#a0a0a0] px-7 py-5 flex flex-col gap-3">
          {errorMsg && (
            <p className="text-red-500 text-[13px] text-right font-['Plus_Jakarta_Sans',sans-serif]">
              {errorMsg}
            </p>
          )}
          <div className="flex items-center justify-end gap-6">
            <button onClick={onClose} className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[16px] text-[#2f6ab7] hover:underline">
              Batal
            </button>
            <motion.button
              whileHover={allValid ? { scale: 1.02 } : {}}
              whileTap={allValid ? { scale: 0.97 } : {}}
              onClick={async () => {
                try {
                  await apiChangePassword(form.passwordLama, form.passwordBaru);
                  onClose();
                } catch (err: unknown) {
                  setErrorMsg(err instanceof Error ? err.message : "Gagal ubah password.");
                }
              }}
              className={`h-[48px] px-8 rounded-[8px] font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[16px] text-white transition-colors ${allValid ? "bg-[#016b55] cursor-pointer" : "bg-[#a0a0a0] cursor-not-allowed"
                }`}
            >
              Simpan Perubahan
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Dashboard page ────────────────────────────────────────────────────────────
function DashboardPage({ profile, onCairanDana, onBayarTagihan, onNavigate, loanData, onLogout, photoUrl }: {
  profile: UserProfile;
  onCairanDana: () => void;
  onBayarTagihan: () => void;
  onNavigate: (page: Page) => void;
  loanData: { amount: number; duration: number } | null;
  onLogout: () => void;
  photoUrl?: string | null;
}) {
  const font = "font-['Plus_Jakarta_Sans',sans-serif]";

  // ── Fetch skor kredit real dari AI API ────────────────────────────────────
  const [skorReal, setSkorReal] = useState<number>(0);
  const [statusReal, setStatusReal] = useState<string>("Layak Kredit");
  const [loadingDash, setLoadingDash] = useState(true);

  useEffect(() => {
    import("./services/api").then(({ apiGetScoring }) => {
      apiGetScoring()
        .then((data) => {
          setSkorReal(data.skor_kredit ?? 0);
          setStatusReal(
            data.skor_kredit === 0 ? "Belum Ada Scoring" :
              data.status === "Layak" ? "Layak Kredit" :
                data.status === "Layak Bersyarat" ? "Layak Bersyarat" : "Tidak Layak Kredit"
          );
        })
        .catch(() => { })
        .finally(() => setLoadingDash(false));
    });
  }, []);

  const arrowSvg = (
    <svg width="13" height="15" viewBox="0 0 13 14.7279" fill="none">
      <path d={svgDashPaths.p1e3fa6c0} fill="#006B55" />
    </svg>
  );
  const [showAllScoring, setShowAllScoring] = useState(false);
  const today = new Date();
  const formatTanggal = (d: Date) => d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  // Simpan history ke localStorage setiap kali ada skor baru
  useEffect(() => {
    if (!loadingDash && skorReal > 0) {
      const key = "modalin_scoring_history";
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      const todayStr = formatTanggal(today);
      // Hindari duplikat tanggal yang sama
      const filtered = existing.filter((r: any) => r.tanggal !== todayStr);
      const newEntry = { tanggal: todayStr, skor: skorReal, status: skorReal >= 500 ? "Layak" : "Tidak Layak" };
      const updated = [newEntry, ...filtered].slice(0, 10); // simpan max 10 history
      localStorage.setItem(key, JSON.stringify(updated));
    }
  }, [loadingDash, skorReal]);

  const allScoringRows = loadingDash ? [] : JSON.parse(localStorage.getItem("modalin_scoring_history") || "[]").map((r: any) => ({
    ...r,
    color: r.skor >= 500 ? "text-[#007059]" : "text-[#93000a]",
  }));

  const scoringRows = showAllScoring ? allScoringRows : allScoringRows.slice(0, 3);
  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9ff] relative">
      <DashboardSidebar activePage="dashboard" onNavigate={onNavigate} onLogout={onLogout} />
      <main className="flex-1 px-4 md:px-10 py-6 md:py-8 overflow-y-auto min-w-0">
        <DashboardHeader profile={profile} onNavigate={onNavigate} photoUrl={photoUrl} />

        {/* Stat cards row */}
        <motion.div className="grid grid-cols-4 gap-4 mb-6" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
          {/* Skor Kredit */}
          <motion.div variants={fadeUp} className="bg-white rounded-[7px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] px-5 pt-4 pb-5">
            <p className={`${font} font-semibold text-[14px] text-[#44464f] tracking-[0.7px] mb-2`}>Skor Kredit</p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`${font} font-extrabold text-[36px] text-[#001038] leading-none`}>
                {loadingDash ? "..." : <CountUp to={skorReal} />}
              </span>
              <span className={`${font} font-bold text-[10px] rounded-full px-2 py-1 ${loadingDash ? "text-[#44464f] bg-[#e0e0e0]" :
                skorReal === 0 ? "text-[#44464f] bg-[#e0e0e0]" :
                  skorReal >= 600 ? "text-[#007059] bg-[#51f9cd]" :
                    skorReal >= 500 ? "text-[#5a4000] bg-[#ffd966]" :
                      "text-white bg-[#ba1a1a]"
                }`}>
                {loadingDash ? "..." :
                  skorReal === 0 ? "Belum Ada Data" :
                    skorReal >= 600 ? "Layak Kredit" :
                      skorReal >= 500 ? "Layak Bersyarat" : "Tidak Layak Kredit"}
              </span>
            </div>
          </motion.div>
          {/* Total Data Transaksi */}
          <motion.div variants={fadeUp} className="bg-white rounded-[7px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] px-5 pt-4 pb-5">
            <p className={`${font} font-semibold text-[14px] text-[#44464f] tracking-[0.7px] mb-2`}>Total Data Transaksi</p>
            <div className="flex items-end gap-2">
              <span className={`${font} font-extrabold text-[36px] text-[#001038] leading-none`}>
                <CountUp to={parseInt(profile.frekuensiTransaksi) || 0} />
              </span>
              <span className={`${font} text-[12px] text-[#44464f] mb-1`}>transaksi/bulan</span>
            </div>
          </motion.div>
          {/* Limit Tersedia */}
          <motion.div variants={fadeUp} className="bg-white rounded-[7px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] px-5 pt-4 pb-5">
            <p className={`${font} font-semibold text-[14px] text-[#44464f] tracking-[0.7px] mb-2`}>Limit Tersedia</p>
            <p className={`${font} font-semibold text-[20px] text-[#001038] leading-none mb-2`}>
              {loadingDash ? "..." : `Rp ${(
                skorReal >= 700 ? 50_000_000 :
                  skorReal >= 600 ? 25_000_000 :
                    skorReal >= 500 ? 10_000_000 : 0
              ).toLocaleString("id-ID")}`}
            </p>
            {skorReal >= 500 ? (
              <button onClick={onCairanDana} className={`${font} font-semibold text-[12px] text-[#006b55] flex items-center gap-1`}>
                Cairkan Dana {arrowSvg}
              </button>
            ) : (
              <p className={`${font} font-medium text-[12px] text-[#ba1a1a]`}>Skor tidak memenuhi syarat</p>
            )}
          </motion.div>
          {/* Bayar Tagihan */}
          <motion.div
            variants={fadeUp}
            className="bg-white rounded-[7px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] px-5 pt-4 pb-5"
          >
            <p className={`${font} font-semibold text-[14px] text-[#44464f] tracking-[0.7px] mb-2`}>Bayar Tagihan</p>
            {loanData ? (
              <>
                <p className={`${font} font-semibold text-[20px] text-[#001038] leading-none mb-1`}>
                  Rp {loanData.amount.toLocaleString("id-ID")}
                </p>
                <p className={`${font} font-medium text-[12px] text-[#44464f] tracking-[0.7px] mb-2`}>
                  Kurang {loanData.duration} Bulan
                </p>
                <button onClick={onBayarTagihan} className={`${font} font-semibold text-[12px] text-[#006b55] flex items-center gap-1`}>
                  Bayar Sekarang {arrowSvg}
                </button>
              </>
            ) : (
              <p className={`${font} font-medium text-[12px] text-[#44464f] tracking-[0.7px]`}>Tidak ada tagihan</p>
            )}
          </motion.div>
        </motion.div>

        {/* Riwayat Scoring */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0.4} className="bg-white rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <p className={`${font} font-normal text-[20px] text-[#001038]`}>Riwayat Scoring Terbaru</p>
            <button onClick={() => setShowAllScoring(v => !v)} className={`${font} font-normal text-[16px] text-[#001038] hover:underline`}>
              {showAllScoring ? "Tutup" : "Lihat Semua"}
            </button>
          </div>
          <div className="border-b border-[#eeeef1] mb-3" />
          <div className="grid grid-cols-[1fr_80px_120px_40px] gap-x-4 mb-2 px-2">
            <span className={`${font} font-bold text-[16px] text-[#44464f]`}>Tanggal</span>
            <span className={`${font} font-bold text-[16px] text-[#44464f]`}>Skor</span>
            <span className={`${font} font-bold text-[16px] text-[#44464f]`}>Status</span>
            <span className={`${font} font-bold text-[16px] text-[#44464f] text-right`}>Aksi</span>
          </div>
          {scoringRows.map((row, i) => (
            <motion.div key={row.tanggal} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08, duration: 0.4 }} className="grid grid-cols-[1fr_80px_120px_40px] gap-x-4 items-center px-2 py-3 border-b border-[#eeeef1] last:border-0">
              <span className={`${font} font-normal text-[16px] text-[#001038]`}>{row.tanggal}</span>
              <span className={`${font} font-bold text-[16px] text-[#001038]`}>{row.skor}</span>
              <span className={`${font} font-bold text-[16px] ${row.color}`}>{row.status}</span>
              <div className="flex justify-end">
                <svg width="22" height="15" viewBox="0 0 22 15" fill="none">
                  <path d={svgDashPaths.p3e801e80} fill="#44464F" />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom row */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0.6} className="flex gap-6">
          {/* Butuh Modal */}
          <div className="flex-1 bg-[#2f6ab7] rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-6 relative overflow-hidden">
            <div className="relative z-10 pr-[180px]">
              <p className={`${font} font-normal text-[24px] text-white mb-3`}>Butuh modal tambahan?</p>
              <p className={`${font} font-normal text-[16px] text-[#b0bee8] mb-6`}>
                {skorReal >= 500
                  ? `Berdasarkan skor terbaru Anda, Anda memenuhi syarat untuk pinjaman mikro KUR hingga Rp ${(
                    skorReal >= 700 ? 50_000_000 :
                      skorReal >= 600 ? 25_000_000 :
                        skorReal >= 500 ? 10_000_000 : 0
                  ).toLocaleString("id-ID")}.`
                  : "Skor kredit Anda belum memenuhi syarat minimum. Tingkatkan skor Anda dengan rutin mengupload data transaksi."}
              </p>
              <motion.button
                onClick={onCairanDana}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`${font} font-bold text-[16px] text-white bg-[#006b55] rounded-[12px] px-8 py-3 hover:bg-[#015040] transition-colors`}
              >
                Ajukan Sekarang
              </motion.button>
            </div>
            <div className="absolute right-0 top-0 h-full w-[172px] flex items-center justify-center overflow-hidden">
              <img src={imgButuhModal} alt="" className="w-[166px] h-[111px] object-contain" />
            </div>
          </div>
          {/* Tips */}
          <div className="w-[304px] shrink-0 bg-white rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-6 flex flex-col">
            <img src={imgTipsLight} alt="" className="size-[40px] object-contain mb-4" />
            <p className={`${font} font-normal text-[18px] text-[#001038] mb-3`}>Tips Peningkatan Skor</p>
            <p className={`${font} font-normal text-[14px] text-[#44464f] leading-[20px] flex-1`}>
              Coba rutin mengunggah nota pembelian harian untuk meningkatkan akurasi analisis arus kas Anda.
            </p>
            <button onClick={() => onNavigate("rekomendasi")} className={`${font} font-bold text-[14px] text-[#006b55] mt-4 text-left hover:underline`}>
              Pelajari Selengkapnya
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

// ── Cairkan Dana page ─────────────────────────────────────────────────────────
function CairanDanaPage({ onBack, onNavigate, onConfirmLoan, profile, onLogout }: { onBack: () => void; onNavigate: (page: Page) => void; onConfirmLoan: (amount: number, duration: number) => void; profile: UserProfile; onLogout: () => void }) {
  const [jumlahRaw, setJumlahRaw] = useState("");
  const [lamaBulan, setLamaBulan] = useState(3);
  const font = "font-['Plus_Jakarta_Sans',sans-serif]";

  const [limitTersedia, setLimitTersedia] = useState<number>(25_000_000);
  useEffect(() => {
    import("./services/api").then(({ apiGetScoring }) => {
      apiGetScoring()
        .then((data) => {
          const skor = data.skor_kredit ?? 0;
          setLimitTersedia(skor >= 700 ? 50_000_000 : skor >= 600 ? 25_000_000 : skor >= 500 ? 10_000_000 : 0);
        })
        .catch(() => { });
    });
  }, []);

  const jumlah = parseInt(jumlahRaw.replace(/\D/g, "")) || 0;
  const admin = jumlah * 0.01;
  const totalBunga = jumlah * 0.0245 * lamaBulan;
  const cicilanPerBulan = lamaBulan > 0 ? (jumlah + totalBunga) / lamaBulan : 0;
  const totalTerima = jumlah - admin;

  const formatRp = (n: number) =>
    "Rp " + Math.round(n).toLocaleString("id-ID");

  const handleJumlahChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    if (!digits) { setJumlahRaw(""); return; }
    const clamped = Math.min(parseInt(digits), limitTersedia);
    setJumlahRaw(clamped.toLocaleString("id-ID"));
  };

  const durations = [1, 3, 6, 9, 12];
  const labelClass = `${font} font-semibold text-[16px] text-[#001038] mb-2 block`;
  const rowClass = "flex items-center justify-between py-2";
  const rowLabel = `${font} font-normal text-[16px] text-[#44464f]`;
  const rowValue = `${font} font-medium text-[16px] text-[#001038]`;

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9ff] relative">
      <DashboardSidebar activePage="dashboard" onNavigate={onNavigate} onLogout={onLogout} />
      <main className="flex-1 px-4 md:px-10 py-6 md:py-8 overflow-y-auto min-w-0">
        <div className="max-w-[672px]">
          <div className="bg-white rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-[#f8f9ff] border-b border-[#a0a0a0] px-7 py-6 shrink-0">
              <h2 className={`${font} font-semibold text-[28px] text-[#001038]`}>Cairkan Dana</h2>
            </div>

            {/* Body */}
            <div className="px-7 py-6 flex flex-col gap-5">
              {/* Limit card */}
              <div className="bg-[#2f6ab7] rounded-[12px] px-6 py-5">
                <p className={`${font} font-semibold text-[14px] text-[#bfc7e0] tracking-[0.7px] mb-1`}>Limit Tersedia</p>
                <p className={`${font} font-bold text-[40px] text-white tracking-[-0.4px] leading-none`}>
                  {`Rp ${limitTersedia.toLocaleString("id-ID")}`}
                </p>
              </div>

              {/* Jumlah Pencairan */}
              <div>
                <label className={labelClass}>Jumlah Pencairan</label>
                <div className="flex items-center h-[58px] bg-[#eff4ff] border border-[#a3a3a3] rounded-[12px] px-4 gap-2">
                  <span className={`${font} font-extrabold text-[20px] text-[#44464f]`}>Rp</span>
                  <input
                    className={`flex-1 bg-transparent outline-none ${font} font-extrabold text-[20px] text-[#44464f]`}
                    placeholder="0"
                    value={jumlahRaw}
                    onChange={handleJumlahChange}
                  />
                </div>
              </div>

              {/* Lama Cicilan */}
              <div>
                <label className={labelClass}>Lama Cicilan</label>
                <div className="flex gap-2 flex-wrap">
                  {durations.map((d) => (
                    <button
                      key={d}
                      onClick={() => setLamaBulan(d)}
                      className={`${font} font-semibold text-[14px] tracking-[0.7px] px-5 h-[38px] rounded-full transition-colors ${d === lamaBulan
                        ? "bg-[#016b55] text-white"
                        : "border border-[#c5c6d0] text-[#7d8390]"
                        }`}
                    >
                      {d} Bulan
                    </button>
                  ))}
                </div>
              </div>

              {/* Rekening Tujuan */}
              <div>
                <p className={`${font} font-semibold text-[16px] text-[#001038] mb-2`}>Rekening Tujuan</p>
                <div className="border border-[#c5c6d0] rounded-[12px] px-4 py-4 flex items-center gap-4">
                  <img src={imgBCA} alt="BCA" className="h-[48px] w-[67px] object-cover shrink-0" />
                  <div>
                    <p className={`${font} font-bold text-[16px] text-[#001038]`}>Bank Transfer - BCA</p>
                    <p className={`${font} font-semibold text-[14px] text-[#44464f] tracking-[0.7px]`}>Virtual Account: 8892 0012 3456 7890</p>
                  </div>
                  <img src={imgForward} alt="" className="size-[30px] object-contain ml-auto" />
                </div>
              </div>

              {/* Rincian Pencairan */}
              <div className="bg-[#eff4ff] rounded-[12px] px-6 py-4">
                <p className={`${font} font-semibold text-[14px] text-[#0b1c30] tracking-[0.7px] uppercase mb-3`}>RINCIAN PENCAIRAN</p>
                <div className={rowClass}>
                  <span className={rowLabel}>Jumlah Cair</span>
                  <span className={rowValue}>{jumlah > 0 ? formatRp(jumlah) : "Rp 0"}</span>
                </div>
                <div className={rowClass}>
                  <span className={rowLabel}>Admin (1%)</span>
                  <span className={`${font} font-medium text-[16px] text-[#ba1a1a]`}>{jumlah > 0 ? formatRp(admin) : "Rp 0"}</span>
                </div>
                <div className={rowClass}>
                  <span className={rowLabel}>Bunga (2.45%)</span>
                  <span className={rowValue}>{jumlah > 0 ? formatRp(totalBunga) : "Rp 0"}</span>
                </div>
                <div className={rowClass}>
                  <span className={rowLabel}>Cicilan per Bulan</span>
                  <span className={rowValue}>{jumlah > 0 ? formatRp(cicilanPerBulan) : "Rp 0"}</span>
                </div>
                <div className="border-t border-[#c5c6d0] mt-2 pt-2 flex items-center justify-between">
                  <span className={`${font} font-bold text-[16px] text-[#44464f]`}>Total Terima</span>
                  <span className={`${font} font-bold text-[16px] text-[#080808]`}>{jumlah > 0 ? formatRp(totalTerima) : "Rp 0"}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-[#f8f9ff] border-t border-[#a0a0a0] px-7 py-5 flex items-center justify-end gap-6 shrink-0">
              <button onClick={onBack} className={`${font} font-bold text-[16px] text-[#2f6ab7] hover:underline`}>
                Batal
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { if (jumlah > 0 && jumlah <= limitTersedia) { onConfirmLoan(jumlah, lamaBulan); onBack(); } }}
                className={`${font} font-bold text-[16px] text-white h-[48px] px-8 rounded-[8px] transition-colors ${jumlah > 0 && jumlah <= limitTersedia ? "bg-[#016b55] cursor-pointer" : "bg-[#a0a0a0] cursor-not-allowed"}`}
              >
                Cairkan Sekarang
              </motion.button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ── Bayar Tagihan page ────────────────────────────────────────────────────────
function BayarTagihanPage({ loanData, onBack, onNavigate, onClearLoan, onPayInstallment, onLogout }: {
  loanData: { amount: number; duration: number };
  onBack: () => void;
  onNavigate: (page: Page) => void;
  onClearLoan: () => void;
  onPayInstallment?: (remaining: number) => void;
  onLogout: () => void;
}) {
  const font = "font-['Plus_Jakarta_Sans',sans-serif]";
  const [paid, setPaid] = useState(false);
  const { amount, duration } = loanData;

  const pokokPerBulan = amount / duration;
  const bungaPerBulan = amount * 0.0245;
  const totalTagihan = pokokPerBulan + bungaPerBulan;

  const formatRp = (n: number) => "Rp " + Math.round(n).toLocaleString("id-ID");

  const rowClass = "flex items-center justify-between py-2";
  const rowLabel = `${font} font-normal text-[16px] text-[#44464f]`;
  const rowValue = `${font} font-medium text-[16px] text-[#001038]`;

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9ff] relative">
      <DashboardSidebar activePage="dashboard" onNavigate={onNavigate} onLogout={onLogout} />
      <main className="flex-1 px-4 md:px-10 py-6 md:py-8 overflow-y-auto min-w-0">
        <div className="max-w-[672px]">
          <div className="bg-white rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-[#f8f9ff] border-b border-[#a0a0a0] px-7 py-6 shrink-0">
              <h2 className={`${font} font-semibold text-[28px] text-[#001038]`}>Bayar Tagihan</h2>
            </div>

            {/* Body */}
            <div className="px-7 py-6 flex flex-col gap-5">
              {/* Loan summary card */}
              <div className="bg-[#2f6ab7] rounded-[12px] px-6 py-5">
                <div className="flex justify-between mb-3">
                  <div>
                    <p className={`${font} font-semibold text-[14px] text-[#bfc7e0] tracking-[0.7px] uppercase mb-1`}>ID PINJAMAN</p>
                    <p className={`${font} font-bold text-[16px] text-white`}>
                      {`MIND-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`${font} font-semibold text-[14px] text-[#bfc7e0] tracking-[0.7px] uppercase mb-1`}>JATUH TEMPO</p>
                    <p className={`${font} font-bold text-[16px] text-white`}>
                      {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                </div>
                <p className={`${font} font-semibold text-[14px] text-[#bfc7e0] mb-1`}>Total Tagihan</p>
                <p className={`${font} font-bold text-[40px] text-white tracking-[-0.4px] leading-none`}>{formatRp(totalTagihan)}</p>
              </div>

              {/* Metode Pembayaran */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className={`${font} font-semibold text-[14px] text-[#0b1c30] tracking-[0.7px] uppercase`}>METODE PEMBAYARAN</p>
                  <button className={`${font} font-semibold text-[14px] text-[#006b55] tracking-[0.7px] hover:underline`}>Ubah</button>
                </div>
                <div className="border border-[#c5c6d0] rounded-[12px] px-4 py-4 flex items-center gap-4">
                  <img src={imgBCA} alt="BCA" className="h-[48px] w-[67px] object-cover shrink-0" />
                  <div>
                    <p className={`${font} font-bold text-[16px] text-[#001038]`}>Bank Transfer - BCA</p>
                    <p className={`${font} font-semibold text-[14px] text-[#44464f] tracking-[0.7px]`}>Virtual Account: 8892 0012 3456 7890</p>
                  </div>
                  <img src={imgForward} alt="" className="size-[30px] object-contain ml-auto" />
                </div>
              </div>

              {/* Rincian Pembayaran */}
              <div className="bg-[#eff4ff] rounded-[12px] px-6 py-4">
                <p className={`${font} font-semibold text-[14px] text-[#0b1c30] tracking-[0.7px] uppercase mb-3`}>RINCIAN PEMBAYARAN</p>
                <div className={rowClass}>
                  <span className={rowLabel}>Pokok Pinjaman</span>
                  <span className={rowValue}>{formatRp(pokokPerBulan)}</span>
                </div>
                <div className={rowClass}>
                  <span className={rowLabel}>Bunga (2,45%)</span>
                  <span className={rowValue}>{formatRp(bungaPerBulan)}</span>
                </div>
                <div className="border-t border-[#c5c6d0] mt-1 pt-2 flex items-center justify-between">
                  <span className={rowLabel}>Denda Keterlambatan</span>
                  <span className={`${font} font-bold text-[16px] text-[#ba1a1a]`}>Rp 0</span>
                </div>
              </div>

              {/* Info box */}
              <div className="bg-[rgba(81,249,205,0.2)] rounded-[12px] px-4 py-4 flex items-start gap-3">
                <CheckCircle className="size-[24px] shrink-0 mt-0.5 text-[#00B08E]" />
                <p className={`${font} font-semibold text-[14px] text-[#007059] tracking-[0.7px]`}>
                  Pembayaran via Virtual Account akan terverifikasi secara otomatis dalam hitungan menit.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-[#f8f9ff] border-t border-[#a0a0a0] px-7 py-5 flex items-center justify-end gap-6 shrink-0">
              <button onClick={onBack} className={`${font} font-bold text-[16px] text-[#2f6ab7] hover:underline`}>
                Batal
              </button>
              {paid ? (
                <div className="flex items-center gap-2 bg-[#e0faf4] text-[#006b55] px-6 py-3 rounded-[8px]">
                  <CheckCircle className="size-5" />
                  <span className={`${font} font-bold text-[15px]`}>Pembayaran Berhasil!</span>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setPaid(true);
                    const remainingDuration = duration - 1;
                    setTimeout(() => {
                      if (remainingDuration <= 0) {
                        onClearLoan();
                      } else if (onPayInstallment) {
                        onPayInstallment(remainingDuration);
                      } else {
                        onClearLoan();
                      }
                      onBack();
                    }, 1500);
                  }}
                  className={`${font} font-bold text-[16px] text-white bg-[#016b55] h-[48px] px-8 rounded-[8px]`}
                >
                  Bayar Sekarang
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ── Profile page ──────────────────────────────────────────────────────────────
function ProfilePage({ profile, photoUrl, onPhotoChange, onUpdatePersonal, onUpdateBusiness, onNavigate, showCompletionWarning = false, onLogout }: {
  profile: UserProfile;
  photoUrl: string | null;
  onPhotoChange: (url: string | null) => void;
  onUpdatePersonal: (data: Pick<UserProfile, "nik" | "nama" | "email" | "telepon" | "alamat">) => void;
  onUpdateBusiness: (data: Omit<UserProfile, "nik" | "nama" | "email" | "telepon" | "alamat">) => void;
  onNavigate: (page: Page) => void;
  showCompletionWarning?: boolean;
  onLogout: () => void;
}) {
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const uploadRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = ev.target?.result as string;
      // Tampilkan preview langsung
      onPhotoChange(base64);
      localStorage.setItem("modelin_photo", base64);
      // Upload ke backend - simpan base64 ke MongoDB (persistent)
      try {
        const { apiUploadFoto } = await import("./services/api");
        const result = await apiUploadFoto(file);
        if (result?.fotoUrl) {
          onPhotoChange(result.fotoUrl);
          localStorage.setItem("modelin_photo", result.fotoUrl);
        }
      } catch (err) {
        console.error("Gagal upload foto ke backend:", err);
      }
    };
    reader.readAsDataURL(file);
  };

  const infoLabel = "font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[12px] tracking-[1.2px] uppercase text-[#757680]";
  const infoValue = "font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] text-[#001038] leading-[24px] mt-1";
  const cardClass = "bg-white rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-6";

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9ff] relative">
      <DashboardSidebar activePage="profile" onNavigate={onNavigate} onLogout={onLogout} />
      {toastMsg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-[#006b55] text-white font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[14px] px-6 py-3 rounded-[10px] shadow-lg animate-pulse">
          {toastMsg}
        </div>
      )}

      <main className="flex-1 px-4 md:px-10 py-6 md:py-8 overflow-y-auto min-w-0">
        <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[40px] tracking-[-0.4px] text-[#001038] mb-6">
          Profil &amp; Manajemen Data
        </h1>

        {showCompletionWarning && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mb-6 bg-[#fff3cd] border border-[#f0c040] rounded-[12px] px-6 py-4 flex items-start gap-4"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
              <path d="M12 2L1 21h22L12 2Z" stroke="#b8860b" strokeWidth="2" strokeLinejoin="round" fill="#fff3cd" />
              <path d="M12 9v5M12 17h.01" stroke="#b8860b" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div>
              <p className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[15px] text-[#7a5c00] leading-6">
                Lengkapi Data Profil Anda
              </p>
              <p className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[14px] text-[#7a5c00] leading-6 mt-0.5">
                Untuk mengakses Dashboard, Hasil Scoring, Anomali Arus Kas, dan Rekomendasi, harap lengkapi informasi pribadi dan informasi bisnis Anda terlebih dahulu.
              </p>
            </div>
          </motion.div>
        )}

        {/* Profile card */}
        <div className={`${cardClass} flex items-center gap-6 mb-6`}>
          <div className="relative">
            <div className="size-[125px] rounded-full bg-[#d9d9d9]/26 overflow-hidden flex items-center justify-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
              {photoUrl ? (
                <img src={photoUrl} alt="Profile" className="size-full object-cover" />
              ) : (
                <img src={imgPerson} alt="" className="size-[106px] object-contain opacity-51" />
              )}
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
              <button
                onClick={() => fileRef.current?.click()}
                className="bg-[#2f6ab7] text-white text-[12px] font-medium font-['Plus_Jakarta_Sans',sans-serif] px-2 py-1 rounded-l-[6px] whitespace-nowrap hover:bg-[#2559a0] transition-colors"
              >
                Ganti Foto
              </button>
              <button
                onClick={async () => {
                  onPhotoChange(null);
                  localStorage.removeItem("modelin_photo");
                  try {
                    const { apiHapusFoto } = await import("./services/api");
                    await apiHapusFoto();
                  } catch (err) { console.error(err); }
                }}
                className="bg-[#ba1a1a] text-white text-[12px] font-medium font-['Plus_Jakarta_Sans',sans-serif] px-2 py-1 rounded-r-[6px] whitespace-nowrap hover:bg-[#93000a] transition-colors"
              >
                Hapus Foto
              </button>
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
          </div>
          <div>
            {profile.nama && (
              <p className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[36px] tracking-[-0.4px] text-[#001038]">
                {profile.nama}
              </p>
            )}
            {profile.identitasUsaha && (
              <p className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[20px] tracking-[0.7px] text-[#44464f]">
                {profile.identitasUsaha}
              </p>
            )}
          </div>
        </div>

        {/* Tab bar */}
        <div className="mb-4">
          <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[14px] text-[#2f6ab7] border-b-2 border-[#2f6ab7] pb-1">
            Informasi Utama
          </span>
          <div className="border-b border-[#c5c6d0] mt-1" />
        </div>

        <div className="flex gap-6">
          {/* Left: info cards */}
          <div className="flex flex-col gap-6 flex-1 min-w-0">

            {/* Informasi Pribadi */}
            <div className={cardClass}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[20px] text-[#001038]">Informasi Pribadi</h2>
                <button
                  onClick={() => setEditingPersonal(true)}
                  className="flex items-center gap-1.5 font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[14px] text-[#006b55] hover:underline"
                >
                  <img src={imgEditIcon} alt="" className="size-[18px] object-contain" />
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div><p className={infoLabel}>NIK</p><p className={`${infoValue} min-h-[24px]`}>{profile.nik}</p></div>
                <div><p className={infoLabel}>Nama Lengkap</p><p className={`${infoValue} min-h-[24px]`}>{profile.nama}</p></div>
                <div><p className={infoLabel}>Email</p><p className={`${infoValue} min-h-[24px]`}>{profile.email}</p></div>
                <div><p className={infoLabel}>Nomor Telepon</p><p className={`${infoValue} min-h-[24px]`}>{profile.telepon ? `+62 ${profile.telepon}` : ""}</p></div>
                <div className="col-span-2"><p className={infoLabel}>Alamat</p><p className={`${infoValue} min-h-[24px]`}>{profile.alamat}</p></div>
              </div>
            </div>

            {/* Informasi Bisnis */}
            <div className={cardClass}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[20px] text-[#001038]">Informasi Bisnis</h2>
                <button
                  onClick={() => setEditingBusiness(true)}
                  className="flex items-center gap-1.5 font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[14px] text-[#006b55] hover:underline"
                >
                  <img src={imgEditIcon} alt="" className="size-[18px] object-contain" />
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-4">
                <div><p className={infoLabel}>Identitas Usaha</p><p className={`${infoValue} min-h-[24px]`}>{profile.identitasUsaha}</p></div>
                <div><p className={infoLabel}>Nama Pemilik</p><p className={`${infoValue} min-h-[24px]`}>{profile.namaPemilik}</p></div>
                <div><p className={infoLabel}>Jenis Usaha</p><p className={`${infoValue} min-h-[24px]`}>{profile.jenisUsaha}</p></div>
                <div><p className={infoLabel}>Lama Berdiri</p><p className={`${infoValue} min-h-[24px]`}>{profile.lamaBerdiri ? `${profile.lamaBerdiri} Bulan` : ""}</p></div>
                <div className="col-span-2"><p className={infoLabel}>Alamat Usaha</p><p className={`${infoValue} min-h-[24px]`}>{profile.alamatUsaha}</p></div>
              </div>

              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[20px] text-[#001038] mb-4">Data Usaha</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div><p className={infoLabel}>Rata-rata Omzet Bulanan (Rp)</p><p className={`${infoValue} min-h-[24px]`}>{profile.omzetBulanan ? parseInt(profile.omzetBulanan).toLocaleString("id-ID") : ""}</p></div>
                <div><p className={infoLabel}>Rata-rata Pengeluaran Bulanan (Rp)</p><p className={`${infoValue} min-h-[24px]`}>{profile.pengeluaranBulanan ? parseInt(profile.pengeluaranBulanan).toLocaleString("id-ID") : ""}</p></div>
                <div><p className={infoLabel}>Estimasi Total Aset Usaha (Rp)</p><p className={`${infoValue} min-h-[24px]`}>{profile.totalAset ? parseInt(profile.totalAset).toLocaleString("id-ID") : ""}</p></div>
                <div><p className={infoLabel}>Total Hutang (Rp)</p><p className={`${infoValue} min-h-[24px]`}>{profile.totalHutang ? parseInt(profile.totalHutang).toLocaleString("id-ID") : ""}</p></div>
                <div><p className={infoLabel}>Frekuensi Transaksi Digital per Bulan</p><p className={`${infoValue} min-h-[24px]`}>{profile.frekuensiTransaksi}</p></div>
              </div>
            </div>

            {/* Upload section */}
            <div className={cardClass}>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[20px] text-[#006b55] mb-2">
                Isi Data Keuangan Bulanan
              </h2>
              <p className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] text-[#44464f] mb-4">
                Ganti mutasi rekening atau laporan keuangan untuk memperbarui profil bisnis Anda secara real-time.
              </p>

              {/* Drop zone */}
              <div className="bg-[#f8f9ff] border border-dashed border-[#c5c6d0] rounded-[12px] h-[250px] flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-[#eff4ff] transition-colors mb-4" onClick={() => uploadRef.current?.click()}>
                <div className="relative size-[77px] flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-[#51f9cd]/30" />
                  <img src={imgUploadIcon} alt="" className="size-[51px] object-contain relative z-10" />
                </div>
                <p className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[16px] text-[#001038]">
                  Klik untuk upload atau drag &amp; drop
                </p>
                <p className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[12px] text-[#757680]">
                  PDF, CSV, XLS (Maks. 10MB)
                </p>
              </div>

              <input
                ref={uploadRef}
                type="file"
                accept=".pdf,.csv,.xls,.xlsx"
                multiple
                className="hidden"
                onChange={async (e) => {
                  const files = Array.from(e.target.files || []);
                  if (files.length === 0) return;
                  setUploadLoading(true);
                  setUploadMsg("");
                  try {
                    const formData = new FormData();
                    files.forEach((f) => formData.append("files", f));
                    const result = await apiUploadFiles(formData);
                    setUploadMsg(`✅ ${result.data.files.length} file berhasil diupload!`);
                    const extracted = result.data.dataTerekstrak;
                    if (extracted) {
                      onUpdateBusiness({
                        identitasUsaha: profile.identitasUsaha,
                        namaPemilik: profile.namaPemilik,
                        jenisUsaha: profile.jenisUsaha,
                        alamatUsaha: profile.alamatUsaha,
                        lamaBerdiri: profile.lamaBerdiri,
                        omzetBulanan: extracted.omzetBulanan ?? profile.omzetBulanan,
                        pengeluaranBulanan: extracted.pengeluaranBulanan ?? profile.pengeluaranBulanan,
                        totalHutang: extracted.totalHutang ?? profile.totalHutang,
                        totalAset: extracted.totalAset ?? profile.totalAset,
                        frekuensiTransaksi: extracted.frekuensiTransaksi ?? profile.frekuensiTransaksi,
                      });
                    }
                  } catch (err: unknown) {
                    setUploadMsg(`❌ ${err instanceof Error ? err.message : "Gagal upload."}`);
                  } finally {
                    setUploadLoading(false);
                    e.target.value = ""; // reset input
                  }
                }}
              />
              {uploadLoading && (
                <p className="text-[#006b55] text-[13px] mt-2 font-['Plus_Jakarta_Sans',sans-serif]">
                  Mengupload file...
                </p>
              )}
              {uploadMsg && (
                <p className="text-[13px] mt-2 font-['Plus_Jakarta_Sans',sans-serif]">
                  {uploadMsg}
                </p>
              )}

              {/* Security note */}
              <div className="bg-[#f8f9ff] border border-[#c5c6d0] rounded-[12px] px-4 py-4 flex items-center gap-3">
                <img src={imgBoxImportant} alt="" className="size-[25px] object-contain shrink-0" />
                <p className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[12px] text-[#44464f]">
                  Data Anda dienkripsi dan diproses secara aman sesuai dengan kebijakan privasi kami.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Pengaturan Akun */}
          <div className="w-[303px] shrink-0">
            <div className={cardClass}>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[20px] text-[#001038] mb-4">Pengaturan Akun</h2>
              <button
                onClick={() => setEditingPassword(true)}
                className="w-full flex items-center justify-between py-4 hover:bg-gray-50 transition-colors"
              >
                <span className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] text-[#0b1c30]">Ubah Kata Sandi</span>
                <img src={imgForward} alt="" className="size-[30px] object-contain" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {editingPersonal && (
        <EditPersonalInfoModal
          initial={{ nik: profile.nik, nama: profile.nama, email: profile.email, telepon: profile.telepon, alamat: profile.alamat }}
          onClose={() => setEditingPersonal(false)}
          onSave={(data) => { onUpdatePersonal(data); setEditingPersonal(false); setToastMsg("✅ Informasi pribadi berhasil disimpan!"); setTimeout(() => setToastMsg(""), 3000); }}
        />
      )}
      {editingBusiness && (
        <EditBusinessInfoModal
          initial={{ identitasUsaha: profile.identitasUsaha, namaPemilik: profile.namaPemilik, jenisUsaha: profile.jenisUsaha, alamatUsaha: profile.alamatUsaha, lamaBerdiri: profile.lamaBerdiri, omzetBulanan: profile.omzetBulanan, pengeluaranBulanan: profile.pengeluaranBulanan, totalHutang: profile.totalHutang, totalAset: profile.totalAset, frekuensiTransaksi: profile.frekuensiTransaksi }}
          onClose={() => setEditingBusiness(false)}
          onSave={(data) => { onUpdateBusiness(data); setEditingBusiness(false); setToastMsg("✅ Informasi bisnis berhasil disimpan!"); setTimeout(() => setToastMsg(""), 3000); }}
        />
      )}
      {editingPassword && (
        <ChangePasswordModal onClose={() => setEditingPassword(false)} />
      )}
    </div>
  );
}

function BackToLogin({ onLogin }: { onLogin: () => void }) {
  return (
    <button
      onClick={onLogin}
      className="flex items-center gap-2 font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[13px] text-[#006b55] hover:underline"
    >
      <svg width="14" height="15" viewBox="0 0 15 14.7279" fill="none" className="rotate-180">
        <path d={arrowLeftPath} fill="#006B55" />
      </svg>
      Kembali ke Halaman Login
    </button>
  );
}

function ForgotPasswordPage({ onLogin, onVerify }: { onLogin: () => void; onVerify: (email: string) => void }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <motion.div
      className="min-h-screen w-full bg-[#f8f9ff] flex items-center justify-center py-10 px-4"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="bg-white rounded-[9px] w-full max-w-[450px] px-[28px] py-10 flex flex-col items-center shadow-sm">
        <img src={imgLoginLogo} alt="ModalIn" className="h-[47px] w-[155px] object-cover mb-6" />
        <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[28px] leading-[36px] text-[#001038] text-center mb-1">
          Lupa Kata Sandi?
        </h1>
        <p className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] leading-[24px] text-[#44464f] text-center mb-6">
          Masukkan email yang terdaftar untuk<br />menerima instruksi pemulihan.
        </p>

        <div className="w-full mb-6">
          <label className="block font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[14px] leading-[20px] text-[#001038] tracking-[0.7px] mb-1.5">
            Email
          </label>
          <input
            type="email"
            placeholder="contoh@modalin.co.id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[49px] bg-[#eff4ff] border border-[#c5c6d0] rounded-[8px] px-4 font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] text-[#001038] placeholder:text-[#6b7280] outline-none focus:border-[#006b55] transition-colors"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={async () => {
            if (!email || loading) return;
            setLoading(true);
            setErrorMsg("");
            try {
              await apiForgotPassword(email);
              onVerify(email);
            } catch (err: unknown) {
              setErrorMsg(err instanceof Error ? err.message : "Gagal mengirim kode.");
            } finally {
              setLoading(false);
            }
          }}
          className="w-full h-[53px] rounded-[8px] bg-gradient-to-r from-[#00D4AA] to-[#00B08E] text-white font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[16px] mb-6 hover:opacity-95 transition-opacity disabled:opacity-50"
          disabled={!email}
        >
          Atur Ulang Kata Sandi
        </motion.button>

        <BackToLogin onLogin={onLogin} />
      </div>
    </motion.div>
  );
}

function VerifyCodePage({ email, onLogin, onSuccess }: { email: string; onLogin: () => void; onSuccess: (resetToken: string) => void }) {
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(59);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  const handleDigitChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);
    if (digit && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const maskedEmail = email.replace(/(.{1})(.*)(@.*)/, (_, a, _b, c) => `${a}***${c}`);

  return (
    <motion.div
      className="min-h-screen w-full bg-[#f8f9ff] flex items-center justify-center py-10 px-4"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="bg-white rounded-[9px] w-full max-w-[450px] px-[28px] py-10 flex flex-col items-center shadow-sm">
        <img src={imgLoginLogo} alt="ModalIn" className="h-[47px] w-[155px] object-cover mb-6" />
        <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[28px] leading-[36px] text-[#001038] text-center mb-1">
          Verifikasi Kode
        </h1>
        <p className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] leading-[24px] text-[#44464f] text-center mb-6">
          Kami telah mengirimkan kode 6-digit ke email<br />
          anda <span className="font-semibold">({maskedEmail})</span>
        </p>

        {/* OTP Inputs */}
        <div className="flex gap-[9px] mb-6">
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-[51px] h-[51px] bg-[#eff4ff] border border-[#c5c6d0] rounded-[8px] text-center font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[20px] text-[#001038] outline-none focus:border-[#006b55] transition-colors"
            />
          ))}
        </div>

        {errorMsg && (
          <p className="text-red-500 text-[13px] mb-3 font-['Plus_Jakarta_Sans',sans-serif]">
            {errorMsg}
          </p>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={async () => {
            const otp = digits.join("");
            if (otp.length < 6 || loading) return;
            setLoading(true);
            setErrorMsg("");
            try {
              const result = await apiVerifyOTP(email, otp);
              onSuccess(result.reset.data.resetToken);
            } catch (err: unknown) {
              setErrorMsg(err instanceof Error ? err.message : "Kode OTP salah.");
            } finally {
              setLoading(false);
            }
          }}
          className="w-full h-[53px] rounded-[8px] bg-gradient-to-r from-[#00D4AA] to-[#00B08E] text-white font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[16px] mb-4 hover:opacity-95 transition-opacity"
        >
          Verifikasi
        </motion.button>

        <p className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] leading-[24px] text-[#44464f] mb-4">
          Tidak menerima kode?{" "}
          <button
            onClick={() => seconds === 0 && setSeconds(59)}
            className={`font-bold text-[#006b55] ${seconds > 0 ? "opacity-60 cursor-not-allowed" : "hover:underline"}`}
          >
            Kirim ulang ({String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")})
          </button>
        </p>

        <div className="w-full border-t border-[#dfe4ff] mb-4" />
        <BackToLogin onLogin={onLogin} />
      </div>
    </motion.div>
  );
}

function NewPasswordPage({ onLogin, resetToken }: { onLogin: () => void; resetToken: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({ password: "", confirm: "" });


  const EyeIcon = () => (
    <svg width="22" height="15" viewBox="0 0 22 15" fill="none">
      <path d={eyePath} fill="#44464F" />
    </svg>
  );

  return (
    <motion.div
      className="min-h-screen w-full bg-[#f8f9ff] flex items-center justify-center py-10 px-4"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="bg-white rounded-[9px] w-full max-w-[450px] px-[28px] py-10 flex flex-col items-center shadow-sm">
        <img src={imgLoginLogo} alt="ModalIn" className="h-[47px] w-[155px] object-cover mb-6" />
        <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[28px] leading-[36px] text-[#001038] text-center mb-1">
          Atur Kata Sandi Baru
        </h1>
        <p className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] leading-[24px] text-[#44464f] text-center mb-6">
          Buat kata sandi baru yang kuat untuk keamanan akun Anda.
        </p>

        <div className="w-full mb-4">
          <label className="block font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[14px] leading-[20px] text-[#001038] tracking-[0.7px] mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan kata sandi baru"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full h-[49px] bg-[#eff4ff] border border-[#c5c6d0] rounded-[8px] px-4 pr-12 font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] text-[#001038] placeholder:text-[#6b7280] outline-none focus:border-[#006b55] transition-colors"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2">
              <EyeIcon />
            </button>
          </div>
        </div>

        <div className="w-full mb-6">
          <label className="block font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[14px] leading-[20px] text-[#001038] tracking-[0.7px] mb-1.5">
            Konfirmasi Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Ulangin Password"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              className="w-full h-[49px] bg-[#eff4ff] border border-[#c5c6d0] rounded-[8px] px-4 pr-12 font-['Plus_Jakarta_Sans',sans-serif] font-normal text-[16px] text-[#001038] placeholder:text-[#6b7280] outline-none focus:border-[#006b55] transition-colors"
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2">
              <EyeIcon />
            </button>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={async () => {
            if (form.password.length < 8 || form.password !== form.confirm || loading) return;
            setLoading(true);
            setErrorMsg("");
            try {
              await apiResetPassword(resetToken, form.password);
              onLogin();
            } catch (err: unknown) {
              setErrorMsg(err instanceof Error ? err.message : "Gagal mereset password.");
            } finally {
              setLoading(false);
            }
          }}
          className="w-full h-[53px] rounded-[8px] bg-gradient-to-r from-[#00D4AA] to-[#00B08E] text-white font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[16px] mb-6 hover:opacity-95 transition-opacity"
        >
          Simpan Kata Sandi
        </motion.button>

        <BackToLogin onLogin={onLogin} />
      </div>
    </motion.div>
  );
}

// ── Shared dashboard header ───────────────────────────────────────────────────
function DashboardHeader({ profile, onNavigate, photoUrl }: { profile: UserProfile; onNavigate: (p: Page) => void; photoUrl?: string | null }) {
  const font = "font-['Plus_Jakarta_Sans',sans-serif]";
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className={`${font} font-semibold text-[28px] text-[#001038]`}>
          Selamat datang, {profile.identitasUsaha || profile.nama || "Pengguna"}
        </h1>
        <p className={`${font} text-[14px] text-[#44464f] tracking-[0.7px] mt-1`}>Analisis terakhir: {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
      </div>
      <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => onNavigate("profile")}>
        {photoUrl ? (
          <img src={photoUrl} alt="" className="size-[44px] rounded-full object-cover" />
        ) : (
          <img src={imgPerson} alt="" className="size-[44px] rounded-full object-cover" />
        )}
        <span className={`${font} font-semibold text-[16px] text-[#001038]`}>
          {(profile.nama || "Pengguna").split(" ")[0]}
        </span>
      </div>
    </div>
  );
}

// ── Hasil Scoring page ────────────────────────────────────────────────────────
function FiveCCard({ label, score, color, barColor, desc }: { label: string; score: number; color: string; barColor: string; desc: string }) {
  const font = "font-['Plus_Jakarta_Sans',sans-serif]";
  const displayed = useCountUp(score, 1000);
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-6">
      <div className="flex items-center justify-between mb-3">
        <span className={`${font} font-semibold text-[14px] text-[#44464f] tracking-[0.7px]`}>{label}</span>
        <span className={`${font} font-bold text-[16px]`} style={{ color }}>{displayed}</span>
      </div>
      <div className="relative h-[8px] bg-[#e5eeff] rounded-full mb-4">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{ backgroundColor: barColor }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <p className={`${font} font-normal text-[12px] text-[#44464f] leading-[15px]`}>{desc}</p>
    </motion.div>
  );
}

function HasilScoringPage({ profile, onNavigate, onLogout, photoUrl }: { profile: UserProfile; onNavigate: (p: Page) => void; onLogout: () => void; photoUrl?: string | null }) {
  const font = "font-['Plus_Jakarta_Sans',sans-serif]";
  const circumference = 2 * Math.PI * 83;

  // ── Fetch data scoring dari AI API via backend ───────────────────────────
  const [scoringData, setScoringData] = useState<any>(null);
  const [loadingScoring, setLoadingScoring] = useState(true);

  useEffect(() => {
    import("./services/api").then(({ apiGetScoring }) => {
      apiGetScoring()
        .then((data) => setScoringData(data))
        .catch((err) => console.error("Scoring error:", err))
        .finally(() => setLoadingScoring(false));
    });
  }, []);

  // Ambil nilai dari API, fallback ke default kalau belum ada
  const totalSkor = scoringData?.skor_kredit ?? 0;
  const statusKredit = scoringData?.status ?? (totalSkor >= 600 ? "Layak" : totalSkor >= 500 ? "Layak Bersyarat" : "Tidak Layak");
  const pesanAI = scoringData?.pesan ?? (
    totalSkor >= 600
      ? "Skor Anda berada di atas rata-rata industri UMKM. Profil risiko rendah dengan manajemen arus kas yang sehat."
      : totalSkor >= 500
        ? "Skor Anda cukup memenuhi syarat. Perlu peningkatan pada beberapa aspek keuangan."
        : "Skor Anda di bawah standar minimum. Diperlukan perbaikan signifikan pada arus kas dan manajemen hutang."
  );

  const scoreVal = useCountUp(totalSkor, 1500);
  const getColor = (score: number) => score >= 70 ? "#006b55" : score >= 50 ? "#fbbf24" : "#ef4444";

  const fiveCItems = (scoringData?.detail && scoringData.detail.length > 0) ? scoringData.detail : [
    { label: "Character", score: 0, color: "#e0e0e0", barColor: "#e0e0e0", desc: "Belum ada data scoring." },
    { label: "Capacity", score: 0, color: "#e0e0e0", barColor: "#e0e0e0", desc: "Belum ada data scoring." },
    { label: "Capital", score: 0, color: "#e0e0e0", barColor: "#e0e0e0", desc: "Belum ada data scoring." },
    { label: "Condition", score: 0, color: "#e0e0e0", barColor: "#e0e0e0", desc: "Belum ada data scoring." },
  ];
  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9ff] relative">
      <DashboardSidebar activePage="hasil-scoring" onNavigate={onNavigate} onLogout={onLogout} />
      <main className="flex-1 px-4 md:px-10 py-6 md:py-8 overflow-y-auto min-w-0">
        <DashboardHeader profile={profile} onNavigate={onNavigate} photoUrl={photoUrl} />
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className={`${font} font-bold text-[40px] text-[#001038] tracking-[-0.4px] mb-6`}>
          Hasil Analisis Kredit
        </motion.h2>

        {/* Main scoring row */}
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }} className="flex gap-4 mb-6">
          {/* Score card */}
          <motion.div variants={fadeUp} className="flex-1 bg-white rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-8 flex items-center gap-8">
            {/* Circle */}
            <div className="relative size-[180px] shrink-0 flex items-center justify-center">
              <svg className="absolute inset-0 size-full" viewBox="0 0 180 180" fill="none">
                <circle cx="90" cy="90" r="83" stroke="#e5eeff" strokeWidth="14" />
                <motion.circle
                  cx="90" cy="90" r="83"
                  stroke="#28DFB5" strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: circumference * (1 - totalSkor / 1000) }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  transform="rotate(-90 90 90)"
                />
              </svg>
              <div className="flex flex-col items-center">
                <span className={`${font} font-extrabold text-[64px] text-[#001038] leading-none tracking-[-1.28px]`}>{scoreVal}</span>
                <span className={`${font} font-semibold text-[14px] text-[#44464f] tracking-[0.7px]`}>DARI 1000</span>
              </div>
            </div>
            {/* Info */}
            <div>
              <p className={`${font} font-semibold text-[28px] text-[#001038] mb-3`}>
                Kualitas Kredit: {loadingScoring ? "..." :
                  totalSkor >= 700 ? "Sangat Baik" :
                    totalSkor >= 600 ? "Baik" :
                      totalSkor >= 500 ? "Cukup" :
                        totalSkor >= 400 ? "Kurang" : "Tidak Layak"
                }
              </p>
              <p className={`${font} font-normal text-[16px] text-[#44464f] leading-[24px] mb-4`}>
                {loadingScoring ? "Memuat data scoring..." : pesanAI}
              </p>
              <span className={`${font} font-semibold text-[14px] text-[#001038] tracking-[0.7px] bg-[#eff4ff] rounded-[8px] px-4 py-1.5`}>{loadingScoring ? "..." : (totalSkor >= 600 ? "Resiko Rendah" : totalSkor >= 400 ? "Resiko Sedang" : "Resiko Tinggi")}</span>
            </div>
          </motion.div>
          {/* AI Advisor */}
          <motion.div variants={fadeUp} className="w-[309px] shrink-0 bg-[rgba(81,249,205,0.2)] border-2 border-[#28dfb5] rounded-[12px] p-7 flex flex-col gap-4">
            <p className={`${font} font-semibold text-[20px] text-[#007059]`}>AI Advisor</p>
            <p className={`${font} font-normal text-[16px] text-[#44464f] leading-[26px] flex-1`}>
              {loadingScoring ? "Memuat analisis AI..." : `"${pesanAI}"`}
            </p>
            <button
              onClick={() => onNavigate("rekomendasi")}
              className={`${font} font-semibold text-[14px] text-[#006b55] tracking-[0.7px] flex items-center gap-2 hover:underline`}
            >
              Lihat analisis mendalam
              <svg width="17" height="15" viewBox="0 0 17 14.73" fill="none">
                <path d="M12.7071 8.07107C13.0976 7.68054 13.0976 7.04738 12.7071 6.65685L6.34315 0.292893C5.95262 -0.097631 5.31946 -0.097631 4.92893 0.292893C4.53841 0.683418 4.53841 1.31658 4.92893 1.70711L10.5858 7.36396L4.92893 13.0208C4.53841 13.4113 4.53841 14.0445 4.92893 14.435C5.31946 14.8256 5.95262 14.8256 6.34315 14.435L12.7071 8.07107ZM0 7.36396V8.36396H12V7.36396V6.36396H0V7.36396Z" fill="#006B55" />
              </svg>
            </button>
          </motion.div>
        </motion.div>

        {/* 5C cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {fiveCItems.map((item) => <FiveCCard key={item.label} {...item} />)}
        </div>

        {/* Footer */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="border-t border-[#e9eaf1] pt-6 flex items-center justify-end gap-4">

          <button
            onClick={() => onNavigate("rekomendasi")}
            className={`${font} font-semibold text-[14px] text-[#001038] tracking-[0.7px] bg-[#51f9cd] rounded-[8px] px-6 py-2.5 hover:bg-[#28dfb5] transition-colors`}
          >
            Lihat Rekomendasi
          </button>
        </motion.div>
      </main>
    </div>
  );
}

// ── Anomali Arus Kas page ─────────────────────────────────────────────────────
function AnomaliArusKasPage({ profile, onNavigate, onLogout, photoUrl }: { profile: UserProfile; onNavigate: (p: Page) => void; onLogout: () => void; photoUrl?: string | null }) {
  const font = "font-['Plus_Jakarta_Sans',sans-serif]";
  const [activeFilter, setActiveFilter] = useState<"Semua" | "Risiko Tinggi" | "Risiko Sedang">("Semua");
  const [selectedAnomali, setSelectedAnomali] = useState<any>(null);

  // ── Ambil data anomali real dari backend ──────────────────────────────────
  const [anomaliData, setAnomaliData] = useState<any>(null);
  const [loadingAnomali, setLoadingAnomali] = useState(true);

  useEffect(() => {
    import("./services/api").then(({ apiGetAnomali }) => {
      apiGetAnomali()
        .then((data) => setAnomaliData(data))
        .catch(() => { })
        .finally(() => setLoadingAnomali(false));
    });
  }, []);

  // Pakai data dari profil user (sudah diisi saat edit profil bisnis)
  const toNum = (str: string) => parseInt((str || "0").replace(/\D/g, "")) || 0;
  const omzetReal = toNum(profile.omzetBulanan);
  const pengeluaranReal = toNum(profile.pengeluaranBulanan);
  const bersihReal = omzetReal - pengeluaranReal;
  const anomaliList = anomaliData?.anomali ?? [];
  const totalAnomali = anomaliList.length;

  const pemasukan = useCountUp(omzetReal, 1400);
  const pengeluaran = useCountUp(pengeluaranReal, 1400);
  const bersih = useCountUp(Math.abs(bersihReal), 1400);
  const anomaliCount = useCountUp(totalAnomali, 800);

  const allAnomalies = anomaliList.map((a: any, i: number) => {
    const nilaiRaw = a.nilai != null ? Math.abs(Number(a.nilai)) : Math.abs(omzetReal - pengeluaranReal);
    return {
      id: i,
      tanggal: a.tanggal
        ? new Date(a.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
        : new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      tipe: a.tipe ?? "Anomali Arus Kas",
      nilai: `Rp ${nilaiRaw.toLocaleString("id-ID")}`,
      nilaiNum: nilaiRaw,
      risiko: (a.tingkatRisiko === "Tinggi" || a.tipe === "Kritis" ? "Tinggi" : "Sedang") as "Tinggi" | "Sedang",
      keterangan: a.pesan ?? a.keterangan ?? "",
    };
  });
  const filtered = activeFilter === "Semua" ? allAnomalies : allAnomalies.filter(a => a.risiko === (activeFilter === "Risiko Tinggi" ? "Tinggi" : "Sedang"));

  const risikoColor = (r: "Tinggi" | "Sedang") => r === "Tinggi" ? { bg: "bg-[#ba1a1a]", text: "text-white" } : { bg: "bg-[#ff9800]", text: "text-white" };
  const nilaiColor = (r: "Tinggi" | "Sedang") => r === "Tinggi" ? "text-[#ba1a1a]" : "text-[#001038]";

  const barData = [3, 4, 3, 5, 4, 6, 8];
  const barDataOut = [2, 3, 4, 3, 5, 4, 7];

  const anomaliTertinggi = allAnomalies.length > 0
    ? allAnomalies.reduce((max, a) => a.nilaiNum > max.nilaiNum ? a : max, allAnomalies[0])
    : null;

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9ff] relative">
      <DashboardSidebar activePage="anomali-arus-kas" onNavigate={onNavigate} onLogout={onLogout} />
      <main className="flex-1 px-4 md:px-10 py-6 md:py-8 overflow-y-auto min-w-0">
        <DashboardHeader profile={profile} onNavigate={onNavigate} photoUrl={photoUrl} />
        <h2 className={`${font} font-bold text-[40px] text-[#001038] tracking-[-0.4px] mb-1`}>Deteksi Anomali Arus Kas</h2>
        <p className={`${font} font-semibold text-[14px] text-[#44464f] mb-0.5`}>Analisis Anomali Finansial</p>
        <p className={`${font} font-normal text-[14px] text-[#44464f] mb-5`}>Pantau aktivitas yang mencurigakan secara real-time untuk kesehatan finansial UMKM.</p>



        {/* 4 stat cards */}
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }} className="grid grid-cols-4 gap-4 mb-5">
          {/* Total Pemasukan */}
          <motion.div variants={fadeUp} className="bg-white rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-5">
            <p className={`${font} font-normal text-[14px] text-[#44464f] mb-2`}>Total Pemasukan</p>
            <p className={`${font} font-bold text-[22px] text-[#001038] mb-3`}>Rp {pemasukan.toLocaleString("id-ID")}</p>
            <div className="flex items-end gap-1 h-[40px] mb-2">
              {barData.map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{ height: `${h * 5}px`, backgroundColor: i === 6 ? "#006b55" : "#b0e8d8" }} />
              ))}
            </div>
            <p className={`${font} font-normal text-[12px] text-[#006b55]`}>+12.5% dari bln lalu</p>
          </motion.div>
          {/* Total Pengeluaran */}
          <motion.div variants={fadeUp} className="bg-white rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-5">
            <p className={`${font} font-normal text-[14px] text-[#44464f] mb-2`}>Total Pengeluaran</p>
            <p className={`${font} font-bold text-[22px] text-[#001038] mb-3`}>Rp {pengeluaran.toLocaleString("id-ID")}</p>
            <div className="flex items-end gap-1 h-[40px] mb-2">
              {barDataOut.map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{ height: `${h * 5}px`, backgroundColor: i === 6 ? "#ba1a1a" : "#ffc4bc" }} />
              ))}
            </div>
            <p className={`${font} font-normal text-[12px] text-[#ba1a1a]`}>-8.5% dari bln lalu</p>
          </motion.div>
          {/* Arus Kas Bersih */}
          <motion.div variants={fadeUp} className="bg-white rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-5">
            <p className={`${font} font-normal text-[14px] text-[#44464f] mb-2`}>Arus Kas Bersih</p>
            <p className={`${font} font-bold text-[22px] text-[#001038] mb-3`}>Rp {bersih.toLocaleString("id-ID")}</p>
            <span className={`${font} font-semibold text-[12px] rounded-full px-3 py-1 flex items-center gap-1 w-fit mb-2 ${bersihReal >= 0 ? "text-[#006b55] bg-[#e0faf4]" : "text-[#ba1a1a] bg-[#ffe4e1]"}`}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /></svg>
              {bersihReal >= 0 ? "SURPLUS" : "DEFISIT"}
            </span>
            <p className={`${font} font-normal text-[12px] text-[#44464f]`}>{bersihReal >= 0 ? "Kondisi keuangan stabil" : "Perlu perhatian segera"}</p>
          </motion.div>
          {/* Total Anomali */}
          <motion.div variants={fadeUp} className="bg-white rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-5">
            <p className={`${font} font-normal text-[14px] text-[#44464f] mb-2`}>Total Anomali</p>
            <div className="flex items-center gap-3 mb-2">
              <div className={`size-[40px] rounded-full flex items-center justify-center ${totalAnomali > 0 ? "bg-[rgba(186,26,26,0.12)]" : "bg-[rgba(100,100,100,0.1)]"}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill={totalAnomali > 0 ? "#ba1a1a" : "#757575"}><path d="M1 21L12 2l11 19H1zm11-3v-2h-2v2h2zm0-4v-4h-2v4h2z" /></svg>
              </div>
            </div>
            <p className={`${font} font-extrabold text-[40px] text-[#001038] leading-none mb-1`}>{anomaliCount}</p>
          </motion.div>
        </motion.div>

        {/* Middle row */}
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }} className="grid grid-cols-1 gap-4 mb-6">
          <motion.div variants={fadeUp} className="bg-white rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-6">
            <p className={`${font} font-normal text-[14px] text-[#44464f] mb-2`}>Anomali Tertinggi</p>
            {anomaliTertinggi ? (
              <>
                <p className={`${font} font-bold text-[28px] text-[#001038] mb-1`}>
                  <CountUp to={anomaliTertinggi.nilaiNum} />
                </p>
                <p className={`${font} font-normal text-[14px] text-[#44464f]`}>
                  {anomaliTertinggi.tanggal}
                </p>
              </>
            ) : (
              <p className={`${font} font-normal text-[14px] text-[#44464f]`}>Tidak ada anomali</p>
            )}
          </motion.div>

        </motion.div>

        {/* Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }} className="bg-white rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-6">
          <div className="flex items-center justify-between mb-5">
            <p className={`${font} font-semibold text-[18px] text-[#001038]`}>Daftar Detail Anomali</p>
            <div className="flex gap-2">
              {(["Semua", "Risiko Tinggi", "Risiko Sedang"] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`${font} font-semibold text-[13px] px-4 py-1.5 rounded-full border transition-colors ${activeFilter === f ? "bg-[#001038] text-white border-[#001038]" : "bg-white text-[#44464f] border-[#c5c6d0] hover:bg-[#f0f0f0]"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-[100px_1fr_140px_110px_1fr_60px] gap-x-4 border-b border-[#e9eaf1] pb-2 mb-1">
            {["Tanggal", "Tipe Anomali", "Nilai (Rp)", "Tingkat Risiko", "Keterangan", "Aksi"].map(h => (
              <span key={h} className={`${font} font-bold text-[14px] text-[#44464f]`}>{h}</span>
            ))}
          </div>
          {filtered.map((row) => {
            const rc = risikoColor(row.risiko);
            return (
              <div key={row.id} className="grid grid-cols-[100px_1fr_140px_110px_1fr_60px] gap-x-4 items-center py-4 border-b border-[#e9eaf1] last:border-0">
                <span className={`${font} font-normal text-[14px] text-[#001038]`}>{row.tanggal}</span>
                <span className={`${font} font-normal text-[14px] text-[#001038]`}>{row.tipe}</span>
                <span className={`${font} font-normal text-[14px] ${nilaiColor(row.risiko)}`}>{row.nilai}</span>
                <span className={`${font} font-semibold text-[12px] ${rc.text} ${rc.bg} rounded-full px-3 py-1 w-fit`}>{row.risiko}</span>
                <span className={`${font} font-normal text-[13px] text-[#44464f]`}>{row.keterangan}</span>
                <button
                  onClick={() => setSelectedAnomali(row)}
                  className={`${font} font-semibold text-[13px] text-[#006b55] hover:underline`}
                >
                  Detail
                </button>
              </div>
            );
          })}
          <div className="flex items-center justify-between mt-4">
            <p className={`${font} font-normal text-[13px] text-[#44464f]`}>Menampilkan {filtered.length} dari {allAnomalies.length} data anomali</p>
            <div className="flex gap-2">
              <button className="border border-[#c5c6d0] rounded-[4px] px-3 py-1 text-[#44464f] hover:bg-[#f0f0f0]">{"<"}</button>
              <button className="border border-[#c5c6d0] rounded-[4px] px-3 py-1 text-[#44464f] hover:bg-[#f0f0f0]">{">"}</button>
            </div>
          </div>
        </motion.div>
        {/* Modal Detail Anomali */}
        {selectedAnomali && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setSelectedAnomali(null)}>
            <div className="bg-white rounded-[16px] shadow-xl p-8 w-[480px]" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <p className={`${font} font-bold text-[20px] text-[#001038]`}>Detail Anomali</p>
                <button onClick={() => setSelectedAnomali(null)} className="text-[#44464f] hover:text-[#001038] text-[20px]">✕</button>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between"><span className={`${font} text-[14px] text-[#44464f]`}>Tanggal</span><span className={`${font} font-semibold text-[14px] text-[#001038]`}>{selectedAnomali.tanggal}</span></div>
                <div className="flex justify-between"><span className={`${font} text-[14px] text-[#44464f]`}>Tipe Anomali</span><span className={`${font} font-semibold text-[14px] text-[#001038]`}>{selectedAnomali.tipe}</span></div>
                <div className="flex justify-between"><span className={`${font} text-[14px] text-[#44464f]`}>Nilai</span><span className={`${font} font-semibold text-[14px] text-[#ba1a1a]`}>{selectedAnomali.nilai}</span></div>
                <div className="flex justify-between items-center"><span className={`${font} text-[14px] text-[#44464f]`}>Tingkat Risiko</span>
                  <span className={`${font} font-semibold text-[12px] text-white px-3 py-1 rounded-full ${selectedAnomali.risiko === "Tinggi" ? "bg-[#ba1a1a]" : "bg-[#ff9800]"}`}>{selectedAnomali.risiko}</span>
                </div>
                <div className="border-t border-[#e9eaf1] pt-3 mt-1"><p className={`${font} text-[14px] text-[#44464f] leading-6`}>{selectedAnomali.keterangan}</p></div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ── Rekomendasi page ──────────────────────────────────────────────────────────
function RekomendasiPage({ profile, onNavigate, onLogout, photoUrl }: { profile: UserProfile; onNavigate: (p: Page) => void; onLogout: () => void; photoUrl?: string | null }) {
  const font = "font-['Plus_Jakarta_Sans',sans-serif]";
  const [connected, setConnected] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("modalin_rekomendasi_connected_v2");
      if (saved) return JSON.parse(saved);
    } catch { }
    return { tokopedia: false, shopee: false, gojek: false, rating: false, visual: false };
  });

  useEffect(() => {
    localStorage.setItem("modalin_rekomendasi_connected_v2", JSON.stringify(connected));
  }, [connected]);

  const [toast, setToast] = useState<{ msg: string; visible: boolean }>({ msg: "", visible: false });
  const [bonusTotal, setBonusTotal] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("modalin_bonus_total");
      return saved ? parseInt(saved) : 0;
    } catch { return 0; }
  });

  const showToast = (msg: string) => {
    setToast({ msg, visible: true });
    setTimeout(() => setToast({ msg: "", visible: false }), 2500);
  };

  const [rekomendasiData, setRekomendasiData] = useState<any>(null);

  useEffect(() => {
    import("./services/api").then(({ apiGetRekomendasi }) => {
      apiGetRekomendasi()
        .then((data) => setRekomendasiData(data))
        .catch(() => { });
    });
  }, []);

  const actions = [
    {
      id: "tokopedia",
      icon: (
        <div className="size-[50px] bg-[#45b527] rounded-full flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-[11px] font-['Plus_Jakarta_Sans',sans-serif]">Toko</span>
        </div>
      ),
      title: "Hubungkan Tokopedia",
      credit: "+5 Credit",
      desc: "Sinkronisasi data penjualan Tokopedia Anda untuk memvalidasi performa bisnis secara otomatis dan meningkatkan akurasi profil risiko.",
    },
    {
      id: "shopee",
      icon: (
        <div className="size-[50px] bg-[#f05025] rounded-full flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-[10px] font-['Plus_Jakarta_Sans',sans-serif]">Shopee</span>
        </div>
      ),
      title: "Hubungkan Shopee",
      credit: "+5 Credit",
      desc: "Sinkronisasi data penjualan Shopee Anda untuk memperkuat bukti 'Capacity' atau kemampuan bayar usaha Anda di ekosistem e-commerce.",
    },
    {
      id: "gojek",
      icon: (
        <div className="size-[50px] bg-[#00aa13] rounded-full flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-[10px] font-['Plus_Jakarta_Sans',sans-serif]">Gojek</span>
        </div>
      ),
      title: "Hubungkan Gojek",
      credit: "+5 Credit",
      desc: "Integrasikan data transaksi GoFood atau GoBiz Anda untuk memberikan verifikasi tambahan pada arus kas harian operasional usaha.",
    },
    {
      id: "rating",
      icon: (
        <div className="size-[50px] flex items-center justify-center shrink-0">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="#fbbf24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
        </div>
      ),
      title: "Verifikasi Rating Toko",
      credit: "+10 Credit",
      desc: "Upload screenshot atau sinkronisasi 'star rating' toko Anda untuk membuktikan kepuasan pelanggan dan kredibilitas di ekosistem digital.",
    },
    {
      id: "visual",
      icon: (
        <div className="size-[50px] flex items-center justify-center shrink-0">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#44464f"><path d="M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3z" /></svg>
        </div>
      ),
      title: "Verifikasi Visual Usaha",
      credit: "+15 Credit",
      desc: "Unggah foto fisik toko atau produk unggulan Anda (format JPG) untuk memverifikasi keberadaan operasional nyata bisnis Anda.",
    },
  ];

  const doneCount = Object.values(connected).filter(Boolean).length;
  const progressPct = Math.round((doneCount / actions.length) * 100);

  const toNum = (str: string) => parseInt((str || "0").replace(/\D/g, "")) || 0;
  const omzet = toNum(profile.omzetBulanan);
  const pengeluaran = toNum(profile.pengeluaranBulanan);
  const hutang = toNum(profile.totalHutang);
  const aset = toNum(profile.totalAset);
  const rasioKas = omzet > 0 ? (omzet - pengeluaran) / omzet : 0;
  const rasioHutang = omzet > 0 ? hutang / (omzet * 12) : 0;

  const categoryCards = [
    {
      badge: rasioKas >= 0.3 ? "Kekuatan Utama" : "Perlu Perbaikan",
      badgeColor: rasioKas >= 0.3
        ? "bg-[rgba(81,249,205,0.3)] text-[#006b55]"
        : "bg-[rgba(254,249,195,0.5)] text-[#a16207]",
      title: "Stabilitas Arus",
      desc: rasioKas >= 0.3
        ? `Margin kas ${(rasioKas * 100).toFixed(0)}% menunjukkan arus kas yang sehat dan fundamental bisnis yang kuat.`
        : `Margin kas ${(rasioKas * 100).toFixed(0)}% perlu ditingkatkan. Kurangi pengeluaran atau tingkatkan omzet.`,
    },
    {
      badge: rasioHutang <= 0.5 ? "Kekuatan Utama" : "Perlu Perbaikan",
      badgeColor: rasioHutang <= 0.5
        ? "bg-[rgba(81,249,205,0.3)] text-[#006b55]"
        : "bg-[rgba(254,249,195,0.5)] text-[#a16207]",
      title: "Rasio Hutang",
      desc: rasioHutang <= 0.5
        ? `Rasio hutang ${(rasioHutang * 100).toFixed(0)}% dari pendapatan tahunan masih dalam batas aman.`
        : `Rasio hutang ${(rasioHutang * 100).toFixed(0)}% dari pendapatan tahunan. Pertimbangkan untuk mengurangi beban hutang.`,
    },
    {
      badge: aset > hutang ? "Kekuatan Utama" : "Prioritas Tindakan",
      badgeColor: aset > hutang
        ? "bg-[rgba(81,249,205,0.3)] text-[#006b55]"
        : "bg-[rgba(255,218,214,0.5)] text-[#ba1a1a]",
      title: "Kondisi Aset",
      desc: aset > hutang
        ? `Total aset Rp ${aset.toLocaleString("id-ID")} melebihi hutang. Posisi keuangan positif.`
        : `Total aset lebih kecil dari hutang. Prioritaskan peningkatan aset atau pelunasan hutang.`,
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9ff] relative">
      <DashboardSidebar activePage="rekomendasi" onNavigate={onNavigate} onLogout={onLogout} />
      <main className="flex-1 px-4 md:px-10 py-6 md:py-8 overflow-y-auto min-w-0">
        <DashboardHeader profile={profile} onNavigate={onNavigate} photoUrl={photoUrl} />
        <h2 className={`${font} font-bold text-[40px] text-[#001038] tracking-[-0.4px] mb-1`}>Rencana Aksi Finansial Anda</h2>
        <p className={`${font} font-normal text-[16px] text-[#44464f] mb-6`}>Dipersonalisasi oleh AI Advisor</p>

        {/* Category cards */}
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }} className="grid grid-cols-3 gap-4 mb-5">
          {categoryCards.map(({ badge, badgeColor, title, desc }) => (
            <motion.div key={title} variants={fadeUp} className="bg-white rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-6">
              <span className={`${font} font-semibold text-[13px] tracking-[0.7px] ${badgeColor} rounded-full px-3 py-1 mb-4 inline-block`}>{badge}</span>
              <p className={`${font} font-semibold text-[28px] text-[#001038] mb-3 leading-[36px]`}>{title}</p>
              <p className={`${font} font-normal text-[15px] text-[#44464f] leading-[24px]`}>{desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="bg-[#2f6ab7] rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] px-8 py-6 mb-5">
          <div className="flex items-start justify-between">
            <div>
              <p className={`${font} font-semibold text-[28px] text-white mb-1`}>Progress Rencana Aksi</p>
              <p className={`${font} font-normal text-[18px] text-[rgba(219,225,255,0.8)]`}>Anda telah menindaklanjuti {doneCount} dari {actions.length} rekomendasi</p>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <div className="flex items-center gap-6">
                <span className={`${font} font-semibold text-[14px] text-white tracking-[0.7px]`}>Pencapaian: {progressPct}%</span>
                <span className={`${font} font-semibold text-[14px] text-white tracking-[0.7px]`}>Target: 100%</span>
              </div>
              <div className="relative w-[448px] h-[15px] bg-[rgba(255,255,255,0.17)] rounded-full overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-[#51f9cd] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action items */}
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }} className="flex flex-col gap-4">
          {actions.map(({ id, icon, title, credit, desc }) => {
            const isDone = !!connected[id];
            return (
              <motion.div key={id} variants={fadeUp} className="bg-white rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] px-6 py-5 flex items-center gap-5">
                {icon}
                <div className="flex-1">
                  <p className={`${font} font-semibold text-[#001038] text-[0px] whitespace-nowrap`}>
                    <span className="text-[24px] leading-[36px]">{title} </span>
                    <span className="text-[14px] leading-[36px] text-[#006b55]">{credit}</span>
                  </p>
                  <p className={`${font} font-normal text-[15px] text-[#44464f] leading-[24px] mt-1 max-w-[600px]`}>{desc}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`${font} font-semibold text-[13px] text-[#a16207] bg-[rgba(254,249,195,0.8)] border border-[#fbbf24] rounded-[6px] px-4 py-2 tracking-[0.3px]`}>
                    Fitur Mendatang
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bonus total badge */}
        {bonusTotal > 0 && (
          <div className={`${font} mt-4 inline-flex items-center gap-2 bg-[#e6faf5] border border-[#51f9cd] rounded-full px-5 py-2`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#006b55"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            <span className="text-[#006b55] font-semibold text-[14px]">Total Bonus Aktif: +{bonusTotal} Poin Skor</span>
          </div>
        )}
      </main>

      {/* Toast notification */}
      {toast.visible && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#006b55] text-white px-6 py-3 rounded-[12px] shadow-lg flex items-center gap-3 animate-fade-in">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>
          <span className={`${font} font-semibold text-[15px]`}>{toast.msg}</span>
        </div>
      )}
    </div>
  );
}

// ── AI Advisor page ───────────────────────────────────────────────────────────
interface AiMetric { label: string; value: string; isPositive: boolean; }
interface ShapFeature { name: string; value: number; }

function AiAdvisorPage({ profile, onNavigate, onLogout }: { profile: UserProfile; onNavigate: (p: Page) => void; onLogout: () => void }) {
  const font = "font-['Plus_Jakarta_Sans',sans-serif]";

  // ── real data from backend ──────────────────────────────────────────────────
  const [advisorData, setAdvisorData] = useState<unknown>(null);
  const [shapData, setShapData]       = useState<unknown>(null);
  const [scoringData, setScoringData] = useState<unknown>(null);
  const [aiLoading, setAiLoading]     = useState(true);

  useEffect(() => {
    const BASE = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/api$/, "");
    const token = localStorage.getItem("modelin_token");
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    Promise.allSettled([
      fetch(`${BASE}/api/scoring`, { headers }).then(r => r.json()),
      fetch(`${BASE}/api/scoring/shap`, { method: "POST", headers, body: "{}" }).then(r => r.json()),
      fetch(`${BASE}/api/scoring/advisor`, { method: "POST", headers, body: "{}" }).then(r => r.json()),
    ]).then(([sc, sh, ad]) => {
      if (sc.status === "fulfilled") setScoringData((sc.value as {data?: unknown})?.data ?? sc.value);
      if (sh.status === "fulfilled") setShapData((sh.value as {data?: unknown})?.data ?? sh.value);
      if (ad.status === "fulfilled") setAdvisorData((ad.value as {data?: unknown})?.data ?? ad.value);
      setAiLoading(false);
    });
  }, []);

  // Derived values — fall back to safe defaults while loading
  const sd = scoringData as {skor_kredit?: number; status?: string; fitur_hitung?: Record<string, number>} | null;
  const ad = advisorData as {rekomendasi_ai?: string; analisis?: string; langkah?: string[]; tanggal?: string; fitur_dominan?: Record<string, number>} | null;
  const sh = shapData  as {fitur?: {name: string; value: number}[]; baseline?: number; final?: number} | null;

  const creditScore    = sd?.skor_kredit ?? 0;
  const scoreCategory  = sd?.status ?? "—";
  const lastAnalysis   = ad?.tanggal ?? new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  const fitur          = sd?.fitur_hitung ?? {};
  const marginLaba     = fitur.margin_laba ?? 0;
  const darRatio       = fitur.dar_ratio ?? 0;
  const oerRatio       = fitur.oer_ratio ?? 0;
  const freqTrx        = fitur.freq_trx ?? 0;
  const metrics: AiMetric[] = [
    { label: "Margin Laba",      value: `${marginLaba.toFixed(1)}%`,         isPositive: marginLaba >= 20 },
    { label: "DAR Ratio",        value: darRatio.toFixed(2),                  isPositive: darRatio <= 0.5 },
    { label: "OER Ratio",        value: oerRatio.toFixed(2),                  isPositive: oerRatio <= 0.75 },
    { label: "Freq. Transaksi",  value: `${Math.round(freqTrx)}/bln`,         isPositive: freqTrx >= 50 },
  ];
  const aiAnalysis  = ad?.rekomendasi_ai ?? ad?.analisis ?? (aiLoading ? "Memuat analisis AI..." : "Data belum tersedia. Lengkapi profil bisnis Anda.");
  const fieldLabels: Record<string, string> = {
    margin_laba: "Pertahankan margin laba di atas 20% dari omzet",
    dar_ratio: "Jaga rasio hutang terhadap aset (DAR) di bawah 0.5",
    oer_ratio: "Kurangi rasio pengeluaran operasional untuk meningkatkan efisiensi",
    freq_trx: "Tingkatkan frekuensi transaksi digital setiap bulan",
    laba_bersih: "Tingkatkan laba bersih dengan menekan biaya operasional",
    lama_bln: "Konsistensi usaha yang lebih lama meningkatkan kepercayaan kredit",
    avg_trx_value: "Tingkatkan nilai rata-rata transaksi per bulan",
    hutang: "Kurangi total hutang untuk memperbaiki profil risiko",
    jenis_usaha_enc: "Diversifikasi jenis usaha untuk memperluas peluang",
  };
  const aiSteps = ad?.langkah ?? (ad?.fitur_dominan
    ? Object.keys(ad.fitur_dominan).slice(0, 3).map(k => fieldLabels[k] ?? `Optimalkan: ${k.replace(/_/g, " ")}`)
    : []);
  const shapFeatures: ShapFeature[] = (sh?.fitur ?? [
    { name: "Margin Laba (%)",        value: marginLaba > 0 ? marginLaba * 0.5 : 0 },
    { name: "Frekuensi Transaksi",    value: freqTrx > 0 ? freqTrx * 0.2 : 0 },
    { name: "Rasio Hutang/Aset (DAR)",value: darRatio > 0 ? -(darRatio * 30) : 0 },
    { name: "Rasio Pengeluaran (OER)",value: oerRatio > 0 ? -(oerRatio * 20) : 0 },
  ]).filter((f: {value: number}) => f.value !== 0);
  const baselineScore = sh?.baseline ?? 500;
  const finalScore    = sh?.final    ?? creditScore;
  // ─────────────────────────────────────────────────────────────────────────

  const scoreVal = useCountUp(creditScore, 1500);
  const maxShap = Math.max(...shapFeatures.map((f) => Math.abs(f.value)));

  const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" } }),
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9ff] relative">
      <DashboardSidebar activePage="ai-advisor" onNavigate={onNavigate} onLogout={onLogout} />
      <main className="flex-1 px-4 md:px-10 py-6 md:py-8 overflow-y-auto min-w-0">
        {/* Header */}
        <DashboardHeader profile={profile} onNavigate={onNavigate} />

        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className={`${font} font-bold text-[40px] text-[#001038] tracking-[-0.4px] leading-[48px] mt-6 mb-1`}
        >
          AI Advisor &amp; Explainable AI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
          className={`${font} font-normal text-[16px] text-[#44464f] mb-6`}
        >
          Penjelasan transparan mengapa skor kredit Anda seperti ini
        </motion.p>

        {/* Top section: score card + AI recommendation */}
        <div className="flex gap-5 mb-6">
          {/* Score + metrics card */}
          <motion.div
            custom={0} initial="hidden" animate="visible" variants={cardVariants}
            className="bg-white rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-6 flex flex-col gap-5"
            style={{ flex: "0 0 520px" }}
          >
            <div>
              <p className={`${font} font-extrabold text-[20px] text-black tracking-[0.7px] mb-2`}>Skor Kredit Anda</p>
              <div className="flex items-center gap-3">
                <span className={`${font} font-extrabold text-[40px] text-[#001038] leading-none`}>{scoreVal}</span>
                <span className={`${font} font-bold text-[10px] text-[#007059] bg-[#51f9cd] rounded-[36px] px-3 py-1`}>
                  {scoreCategory === "Layak" ? "Layak Kredit" : scoreCategory === "Review" ? "Perlu Review" : "Tidak Layak"}
                </span>
              </div>
              <p className={`${font} font-normal text-[16px] text-[#44464f] mt-1`}>Dari skala 1–1000</p>
            </div>

            {/* Metric 2x2 grid */}
            <div className="grid grid-cols-2 gap-3">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  custom={i + 1} initial="hidden" animate="visible" variants={cardVariants}
                  className="bg-white rounded-[7px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-4"
                >
                  <p className={`${font} font-normal text-[14px] text-[#44464f] mb-1`}>{m.label}</p>
                  <p className={`${font} font-extrabold text-[22px] text-[#001038] leading-9`}>{m.value}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {m.isPositive ? (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                        <path d="M7 2L13 11H1L7 2Z" fill="#16a34a" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                        <path d="M7 12L1 3H13L7 12Z" fill="#dc2626" />
                      </svg>
                    )}
                    <span className={`${font} font-normal text-[12px] ${m.isPositive ? "text-[#007059]" : "text-[#ad000a]"}`}>
                      {m.isPositive ? "Positif" : "Perlu dijaga"}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI recommendation card */}
          <motion.div
            custom={1} initial="hidden" animate="visible" variants={cardVariants}
            className="flex-1 bg-[rgba(40,223,181,0.2)] border-2 border-[#28dfb5] rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-6 flex flex-col gap-4"
          >
            <p className={`${font} font-extrabold text-[20px] text-[#007059] tracking-[0.7px]`}>Rekomendasi dari AI</p>
            <div>
              <p className={`${font} font-semibold text-[16px] text-[#15876f] mb-2`}>Analisis Personal</p>
              <p className={`${font} font-normal text-[16px] text-[#44464f] leading-6`}>{aiAnalysis}</p>
            </div>
            <div>
              <p className={`${font} font-extrabold text-[18px] text-[#15876f] mb-3`}>Langkah yang disarankan:</p>
              <ul className="flex flex-col gap-2">
                {aiSteps.map((step, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.12, ease: "easeOut" }}
                    className="flex items-center gap-3"
                  >
                    <svg width="5" height="5" viewBox="0 0 5 5" fill="none" className="shrink-0">
                      <circle cx="2.5" cy="2.5" r="2.5" fill="#15876F" />
                    </svg>
                    <span className={`${font} font-semibold text-[16px] text-[#15876f]`}>{step}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* SHAP section */}
        <motion.div
          custom={2} initial="hidden" animate="visible" variants={cardVariants}
          className="bg-white rounded-[12px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-6"
        >
          <p className={`${font} font-extrabold text-[20px] text-black tracking-[0.7px] mb-1`}>
            SHAP – Kontribusi Fitur terhadap Skor Kredit
          </p>
          <p className={`${font} font-normal text-[16px] text-[#44464f] mb-6`}>
            Seberapa besar setiap faktor mempengaruhi skor kredit Anda. Positif = menaikkan skor, Negatif = menurunkan skor.
          </p>

          <div className="flex flex-col gap-4">
            {shapFeatures.map((f, i) => {
              const isPos = f.value >= 0;
              const pct = (Math.abs(f.value) / maxShap) * 100;
              return (
                <div key={f.name} className="flex items-center gap-4">
                  <span className={`${font} font-normal text-[15px] text-[#44464f] w-[220px] shrink-0`}>{f.name}</span>
                  <div className="flex-1 bg-[#e5eeff] rounded-[26px] h-[15px] overflow-hidden">
                    <motion.div
                      className={`h-full rounded-[26px] ${isPos ? "bg-[#2f6ab7]" : "bg-[#ef4444]"}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.9, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                    />
                  </div>
                  <span className={`${font} font-semibold text-[15px] w-[60px] text-right shrink-0 ${isPos ? "text-[#0f6e56]" : "text-[#93000a]"}`}>
                    {isPos ? `+${Number(f.value).toFixed(1)}` : Number(f.value).toFixed(1)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="border-t border-[#e5eeff] mt-6 pt-4">
            <p className={`${font} font-normal text-[16px] text-[#44464f]`}>
              Skor baseline model {baselineScore} → Skor akhir Anda: {Number(finalScore).toFixed(1)} (selisih +{Number(finalScore - baselineScore).toFixed(1)} dari kontribusi fitur positif)
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function isPersonalInfoComplete(p: UserProfile) {
  return !!(p.nik && p.nama && p.telepon && p.alamat);
}
function isBusinessInfoComplete(p: UserProfile) {
  return !!(p.identitasUsaha && p.namaPemilik && p.jenisUsaha && p.alamatUsaha);
}
function isProfileComplete(p: UserProfile) {
  return isPersonalInfoComplete(p) && isBusinessInfoComplete(p);
}

export default function App() {
  const [page, setPage] = useState<Page>(() => {
    const token = localStorage.getItem("modelin_token");
    const saved = localStorage.getItem("modelin_page") as Page;
    if (token && saved) return saved;
    return "home";
  });
  const [resetEmail, setResetEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [loanData, setLoanData] = useState<{ amount: number; duration: number } | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(() => {
    return localStorage.getItem("modelin_photo") || null;
  });
  const [userProfile, setUserProfile] = useState<UserProfile>({
    nik: "", nama: "", email: "", telepon: "", alamat: "",
    identitasUsaha: "", namaPemilik: "", jenisUsaha: "", alamatUsaha: "",
    lamaBerdiri: "", omzetBulanan: "", pengeluaranBulanan: "", totalHutang: "", totalAset: "", frekuensiTransaksi: "",
  });
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [showProfileWarning, setShowProfileWarning] = useState(false);
  const featuresRef = useRef<HTMLElement>(null);
  const howItWorksRef = useRef<HTMLElement>(null);

  const protectedPages: Page[] = ["dashboard", "cairkan-dana", "bayar-tagihan", "hasil-scoring", "anomali-arus-kas", "rekomendasi", "ai-advisor"];

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const token = localStorage.getItem("modelin_token");
      if (event.state?.page) {
        setPage(event.state.page as Page);
        localStorage.setItem("modelin_page", event.state.page);
      } else {
        setPage(token ? "dashboard" : "home");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Auto-login & load profil jika token masih ada
  useEffect(() => {
    const token = localStorage.getItem("modelin_token");
    if (token) {
      import("./services/api").then(({ apiGetProfile }) => {
        apiGetProfile()
          .then((res: unknown) => {
            const user = (res as {data?: {user?: unknown}})?.data?.user ?? res;
            setUserProfile((p) => ({ ...p, ...(user as object) }));
            const u = user as Record<string, unknown>;
            // fotoProfil di MongoDB sudah base64, langsung pakai
            if (u.fotoProfil && typeof u.fotoProfil === "string" && u.fotoProfil.startsWith("data:")) {
              setPhotoUrl(u.fotoProfil as string);
              localStorage.setItem("modelin_photo", u.fotoProfil as string);
            } else {
              const savedPhoto = localStorage.getItem("modelin_photo");
              if (savedPhoto) setPhotoUrl(savedPhoto);
            }
            const savedPage = localStorage.getItem("modelin_page") as Page;
            const targetPage = savedPage || "dashboard";
            setPage(targetPage);
          })
          .catch(() => {
            localStorage.removeItem("modelin_token");
            localStorage.removeItem("modelin_page");
            setPage("home");
          });
      });
    }
  }, []);

  const navigateTo = (p: Page) => {
    if (protectedPages.includes(p) && !isProfileComplete(userProfile)) {
      setShowProfileWarning(true);
      setPage("profile");
      localStorage.setItem("modelin_page", "profile");
      window.history.pushState({ page: "profile" }, "", `#profile`);
    } else {
      setShowProfileWarning(false);
      setPage(p);
      localStorage.setItem("modelin_page", p);
      window.history.pushState({ page: p }, "", `#${p}`);
    }
  };

  const handleNavClick = (id: string) => {
    setActiveNav(id);
    const target = id === "produk" ? featuresRef.current : howItWorksRef.current;
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("modelin_token");
    localStorage.removeItem("modelin_page");
    localStorage.removeItem("modelin_photo");
    setUserProfile({
      nik: "", nama: "", email: "", telepon: "", alamat: "",
      identitasUsaha: "", namaPemilik: "", jenisUsaha: "", alamatUsaha: "",
      lamaBerdiri: "", omzetBulanan: "", pengeluaranBulanan: "", totalHutang: "", totalAset: "", frekuensiTransaksi: "",
    });
    setPhotoUrl(null);
    setLoanData(null);
    setPage("home");
    window.history.pushState({}, "", "/");
  };

  if (page === "dashboard") {
    return (
      <DashboardPage
        profile={userProfile}
        photoUrl={photoUrl}
        onCairanDana={() => navigateTo("cairkan-dana")}
        onBayarTagihan={() => navigateTo("bayar-tagihan")}
        onNavigate={(p) => navigateTo(p)}
        loanData={loanData}
        onLogout={handleLogout}
      />
    );
  }

  if (page === "cairkan-dana") {
    return (
      <CairanDanaPage
        onBack={() => setPage("dashboard")}
        onNavigate={(p) => navigateTo(p)}
        onConfirmLoan={(amount, duration) => setLoanData({ amount, duration })}
        profile={userProfile}
        onLogout={handleLogout}
      />
    );
  }

  if (page === "bayar-tagihan" && loanData) {
    return (
      <BayarTagihanPage
        loanData={loanData}
        onBack={() => setPage("dashboard")}
        onNavigate={(p) => navigateTo(p)}
        onClearLoan={() => setLoanData(null)}
        onPayInstallment={(remaining) => setLoanData(prev => prev ? { ...prev, duration: remaining } : null)}
        onLogout={handleLogout}
      />
    );
  }

  if (page === "hasil-scoring") {
    return <HasilScoringPage profile={userProfile} photoUrl={photoUrl} onNavigate={(p) => navigateTo(p)} onLogout={handleLogout} />;
  }

  if (page === "anomali-arus-kas") {
    return <AnomaliArusKasPage profile={userProfile} photoUrl={photoUrl} onNavigate={(p) => navigateTo(p)} onLogout={handleLogout} />;
  }

  if (page === "rekomendasi") {
    return <RekomendasiPage profile={userProfile} photoUrl={photoUrl} onNavigate={(p) => navigateTo(p)} onLogout={handleLogout} />;
  }

  if (page === "ai-advisor") {
    return <AiAdvisorPage profile={userProfile} onNavigate={(p) => navigateTo(p)} onLogout={handleLogout} />;
  }

  if (page === "profile") {
    return (
      <ProfilePage
        profile={userProfile}
        photoUrl={photoUrl}
        onPhotoChange={(url) => setPhotoUrl(url)}
        onUpdatePersonal={(data) => setUserProfile((p) => ({ ...p, ...data }))}
        onUpdateBusiness={(data) => setUserProfile((p) => ({ ...p, ...data }))}
        onNavigate={(p) => navigateTo(p)}
        showCompletionWarning={showProfileWarning}
        onLogout={handleLogout}
      />
    );
  }

  if (page === "register") {
    return (
      <RegisterPage
        onBack={() => setPage("home")}
        onLogin={() => setPage("login")}
        onComplete={(nik, nama, email) => {
          setUserProfile((p) => ({ ...p, nik, nama, email }));
          setPage("profile");
          localStorage.setItem("modelin_page", "profile");
          setShowProfileWarning(false);
        }}
      />
    );
  }

  if (page === "login") {
    return (
      <LoginPage
        onRegister={() => setPage("register")}
        onForgotPassword={() => setPage("forgot-password")}
        onSuccess={(user) => {
          setUserProfile((p) => ({ ...p, ...user }));
          if (user.fotoProfil && typeof user.fotoProfil === "string" && user.fotoProfil.startsWith("data:")) {
            // fotoProfil sudah base64 di MongoDB
            localStorage.setItem("modelin_photo", user.fotoProfil);
            setPhotoUrl(user.fotoProfil);
          }
          navigateTo("dashboard");
        }}
      />
    );
  }

  if (page === "forgot-password") {
    return (
      <ForgotPasswordPage
        onLogin={() => setPage("login")}
        onVerify={(email) => { setResetEmail(email); setPage("verify-code"); }}
      />
    );
  }

  if (page === "verify-code") {
    return (
      <VerifyCodePage
        email={resetEmail}
        onLogin={() => setPage("login")}
        onSuccess={(resetToken) => {
          setResetToken(resetToken);
          setPage("new-password");
        }}
      />
    );
  }

  if (page === "new-password") {
    return <NewPasswordPage onLogin={() => setPage("login")} resetToken={resetToken} />;
  }

  return (
    <div className="bg-[#f8f9ff] flex flex-col min-h-screen w-full">
      <Navbar
        activeNav={activeNav}
        onNavClick={handleNavClick}
        onDaftar={() => setPage("register")}
        onMasuk={() => setPage("login")}
      />
      <div className="pt-[106px]">
        <Hero onRegister={() => setPage("register")} />
        <Features sectionRef={featuresRef} />
        <HowItWorks sectionRef={howItWorksRef} onRegister={() => setPage("register")} />
      </div>
    </div>
  );
}
