import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import matplotlib.ticker as ticker

# Set Konfigurasi Halaman Streamlit
st.set_page_config(
    page_title="Dashboard EDA ModalIn",
    page_icon="📊",
    layout="wide"
)

# Load Data
@st.cache_data
def load_data():
    df = pd.read_csv("dataset_modalin_clean.csv")
    
    # Feature Engineering
    df['laba_bersih'] = df['omzet'] - df['pengeluaran']
    df['margin_laba'] = (df['laba_bersih'] / df['omzet']) * 100
    df['status_approval'] = np.where(df['limit_pinjaman'] == 0, 'Ditolak', 'Disetujui')
    
    def get_risk_tier(skor):
        if skor < 500: return 'High Risk'
        elif 500 <= skor <= 649: return 'Bronze'
        elif 650 <= skor <= 799: return 'Silver'
        else: return 'Gold'
        
    df['risk_tier'] = df['total_skor'].apply(get_risk_tier)
    return df

modalin_df = load_data()

# ==========================================
# SIDEBAR UNTUK FILTER INTERAKTIF
# ==========================================
st.sidebar.image("https://cdn-icons-png.flaticon.com/512/3135/3135679.png", width=100)
st.sidebar.title("Filter Data UMKM")

kategori_usaha = st.sidebar.multiselect(
    "Pilih Jenis Usaha:",
    options=modalin_df['jenis_usaha'].unique(),
    default=modalin_df['jenis_usaha'].unique()
)

df_filtered = modalin_df[modalin_df['jenis_usaha'].isin(kategori_usaha)]

# ==========================================
# HALAMAN UTAMA (MAIN DASHBOARD)
# ==========================================
st.title("📊 Dashboard Analisis Credit Scoring UMKM (ModalIn)")
st.markdown("Dashboard interaktif ini memvisualisasikan data UMKM berdasarkan parameter 4C (*Character, Capacity, Capital, Condition*) untuk mengevaluasi performa sistem *Credit Scoring*.")

# Menampilkan Metric Utama
col1, col2, col3 = st.columns(3)
with col1:
    st.metric("Total UMKM Terdaftar", f"{df_filtered.shape[0]} UMKM")
with col2:
    jml_disetujui = df_filtered[df_filtered['status_approval'] == 'Disetujui'].shape[0]
    st.metric("Total UMKM Disetujui", f"{jml_disetujui} UMKM")
with col3:
    total_penyaluran = df_filtered['limit_pinjaman'].sum()
    st.metric("Total Penyaluran Dana", f"Rp {total_penyaluran / 1000000000:.2f} Miliar")

st.markdown("---")

# ==========================================
# VISUALISASI 1 & 2 (Berdampingan)
# ==========================================
col_grafik1, col_grafik2 = st.columns(2)

with col_grafik1:
    st.subheader("1. Approval Rate per Jenis Usaha")
    fig1, ax1 = plt.subplots(figsize=(8, 5))
    
    approval_rates = df_filtered.groupby('jenis_usaha')['status_approval'].value_counts(normalize=True).unstack().fillna(0) * 100
    if 'Ditolak' in approval_rates.columns and 'Disetujui' in approval_rates.columns:
        approval_rates = approval_rates[['Ditolak', 'Disetujui']]
        warna = ['#e74c3c', '#2ecc71']
    else:
        warna = ['#2ecc71']
        
    approval_rates.plot(kind='bar', stacked=True, color=warna, ax=ax1, edgecolor='white')
    
    for c in ax1.containers:
        labels = [f'{w:.1f}%' if w > 0 else '' for w in c.datavalues]
        ax1.bar_label(c, labels=labels, label_type='center', color='white', fontweight='bold', fontsize=10)
        
    ax1.set_ylabel('Persentase (%)', fontweight='bold')
    ax1.set_xlabel('Jenis Usaha', fontweight='bold')
    plt.xticks(rotation=45, ha='right')
    ax1.legend(title='Status', bbox_to_anchor=(1.05, 1), loc='upper left') 
    st.pyplot(fig1)
    
    # PENJELASAN GRAFIK 1 (EXPLANATORY ANALYSIS) - SUDAH DIUPDATE!
    st.info("**💡 Insight Analisis:**\n\nBerdasarkan data di atas, sektor **Jasa & Freelancer** justru mencatat *Approval Rate* tertinggi (55.5%) karena struktur biaya operasional yang lebih rendah dan margin sehat. Sebaliknya, **Bisnis Kuliner** mencatat tingkat penolakan tertinggi (55.8%) akibat risiko fluktuasi arus kas harian yang agresif sehingga sering tertahan oleh *Gatekeeper* sistem.")

with col_grafik2:
    st.subheader("2. Margin Laba vs Skor Kredit")
    fig2, ax2 = plt.subplots(figsize=(8, 5))
    
    sns.scatterplot(data=df_filtered, x='margin_laba', y='total_skor', 
                    hue='status_approval', palette={'Disetujui': '#2ecc71', 'Ditolak': '#e74c3c'}, 
                    alpha=0.8, edgecolor='black', ax=ax2)
    
    ax2.axvline(x=0, color='red', linestyle='--', linewidth=2)
    ax2.text(2, 400, "Batas Rugi\n(Margin 0%)", color='red', fontweight='bold', fontsize=10)
    
    ax2.set_xlabel('Margin Laba Bersih (%)', fontweight='bold')
    ax2.set_ylabel('Total Skor Kredit', fontweight='bold')
    ax2.legend(title='Status', bbox_to_anchor=(1.05, 1), loc='upper left')
    st.pyplot(fig2)

    # PENJELASAN GRAFIK 2 (EXPLANATORY ANALYSIS)
    st.info("**💡 Insight Analisis:**\n\nGrafik ini membuktikan bahwa algoritma *Gatekeeper* sistem berjalan sempurna. Titik di sebelah kiri garis batas (Margin $\le$ 0%) otomatis berstatus **Ditolak (merah)** meskipun memiliki skor di elemen lain. Ini menjaga ModalIn dari penyaluran dana ke UMKM yang merugi.")

st.markdown("---")

# ==========================================
# VISUALISASI 3 (Lebar Penuh)
# ==========================================
st.subheader("3. Distribusi Limit Pinjaman berdasarkan Risk Tier")
fig3, ax3 = plt.subplots(figsize=(12, 4))
df_approved = df_filtered[df_filtered['limit_pinjaman'] > 0]

if not df_approved.empty:
    tier_order = ['Bronze', 'Silver', 'Gold']
    
    sns.boxplot(data=df_approved, x='risk_tier', y='limit_pinjaman', order=tier_order, palette='Set2', ax=ax3)
    sns.stripplot(data=df_approved, x='risk_tier', y='limit_pinjaman', order=tier_order, color='black', alpha=0.4, jitter=True, ax=ax3)
    
    ax3.set_xlabel('Tingkat Risiko (Risk Tier)', fontweight='bold', fontsize=12)
    ax3.set_ylabel('Nominal Pinjaman', fontweight='bold', fontsize=12)
    
    formatter = ticker.FuncFormatter(lambda x, pos: f'Rp {int(x/1000000)} Juta')
    ax3.yaxis.set_major_formatter(formatter)
    
    st.pyplot(fig3)
    
    # PENJELASAN GRAFIK 3 (EXPLANATORY ANALYSIS)
    st.success("**💡 Kesimpulan Distribusi Plafon:**\n\nSistem berhasil mendistribusikan limit pinjaman secara proporsional sesuai tingkat kesehatan UMKM. Tier **Bronze (Fair)** tertahan di limit aman (< Rp 15 Juta), tier **Silver (Good)** di area menengah (Rp 15-40 Juta), dan tier **Gold (Excellent)** berhak mendapatkan pencairan maksimal hingga **Rp 80 Juta** tanpa ada indikasi salah sasaran.")
else:
    st.warning("Tidak ada data pinjaman yang disetujui pada filter ini.")