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
# TAB NAVIGATION
# ==========================================
tab1, tab2, tab3, tab4 = st.tabs(["📈 Core Analysis", "🔍 Advanced Insights", "📊 Statistical Summary", "🎯 Risk Distribution"])

# ==========================================
# TAB 1: CORE ANALYSIS (3 Visualisasi Utama)
# ==========================================
with tab1:
    st.subheader("Analisis Utama Credit Scoring ModalIn")
    
    col_grafik1, col_grafik2 = st.columns(2)

    with col_grafik1:
        st.subheader("1. Approval Rate per Jenis Usaha")
        fig1, ax1 = plt.subplots(figsize=(8, 5))
        
        approval_rates = df_filtered.groupby('jenis_usaha')['status_approval'].value_counts(normalize=True).unstack().fillna(0) * 100
        if 'Ditolak' in approval_rates.columns and 'Disetujui' in approval_rates.columns:
            approval_rates = approval_rates[['Disetujui', 'Ditolak']]
            warna = ['#2ecc71', '#e74c3c']
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
        
        # PENJELASAN GRAFIK 1 (FIXED INSIGHT)
        st.info("**💡 Insight Analisis (CORRECTED):**\n\nBerdasarkan visualisasi di atas, sektor **Jasa & Freelancer** mencatatkan *Approval Rate* tertinggi sebesar **55.5%**. Hal ini menunjukkan bahwa algoritma 4C ModalIn menilai sektor ini memiliki struktur biaya operasional yang efisien dan margin yang sehat. Sebaliknya, sektor **Bisnis Kuliner** memiliki tingkat penolakan (*reject*) paling besar yaitu **55.8%**, karena model bisnis ini dinilai sistem memiliki risiko stabilitas yang lebih tinggi akibat fluktuasi arus kas harian yang agresif.")

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

        # PENJELASAN GRAFIK 2
        st.info("**💡 Insight Analisis:**\n\nGrafik ini membuktikan bahwa algoritma *Gatekeeper* sistem berjalan sempurna. Titik di sebelah kiri garis batas (Margin $\le$ 0%) otomatis berstatus **Ditolak (merah)** meskipun memiliki skor di elemen lain. Ini menjaga ModalIn dari penyaluran dana ke UMKM yang merugi.")

    st.markdown("---")

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
        
        # PENJELASAN GRAFIK 3
        st.success("**💡 Kesimpulan Distribusi Plafon:**\n\nSistem berhasil mendistribusikan limit pinjaman secara proporsional sesuai tingkat kesehatan UMKM. Tier **Bronze (Fair)** tertahan di limit aman (< Rp 15 Juta), tier **Silver (Good)** di area menengah (Rp 15-40 Juta), dan tier **Gold (Excellent)** berhak mendapatkan pencairan maksimal hingga **Rp 80 Juta** tanpa ada indikasi salah sasaran.")
    else:
        st.warning("Tidak ada data pinjaman yang disetujui pada filter ini.")

# ==========================================
# TAB 2: ADVANCED INSIGHTS (Visualisasi Tambahan)
# ==========================================
with tab2:
    st.subheader("Analisis Lanjutan & Pattern Recognition")
    
    col_adv1, col_adv2 = st.columns(2)
    
    with col_adv1:
        st.subheader("4. Distribusi Total Skor per Jenis Usaha")
        fig4, ax4 = plt.subplots(figsize=(8, 5))
        
        sns.violinplot(data=df_filtered, x='jenis_usaha', y='total_skor', palette='muted', ax=ax4)
        
        ax4.set_xlabel('Jenis Usaha', fontweight='bold')
        ax4.set_ylabel('Total Skor Kredit', fontweight='bold')
        ax4.axhline(y=500, color='red', linestyle='--', alpha=0.5, label='Threshold: High Risk')
        ax4.axhline(y=650, color='orange', linestyle='--', alpha=0.5, label='Threshold: Silver')
        ax4.legend()
        plt.xticks(rotation=45, ha='right')
        st.pyplot(fig4)
        
        st.info("**💡 Pattern:** Violin plot menunjukkan distribusi skor untuk setiap sektor. Semakin lebar pada skor tinggi, semakin banyak UMKM berkualitas di sektor tersebut.")
    
    with col_adv2:
        st.subheader("5. Heatmap Korelasi Fitur Numerik")
        fig5, ax5 = plt.subplots(figsize=(8, 6))
        
        numeric_cols = df_filtered[['omzet', 'pengeluaran', 'lama_bln', 'total_skor', 'limit_pinjaman']].corr()
        sns.heatmap(numeric_cols, annot=True, fmt='.2f', cmap='coolwarm', center=0, ax=ax5, cbar_kws={'label': 'Korelasi'})
        
        ax5.set_title('Korelasi antar Fitur Numerik', fontweight='bold', fontsize=12)
        st.pyplot(fig5)
        
        st.info("**💡 Insight:** Heatmap menunjukkan hubungan linear antar variabel. Korelasi positif menunjukkan relasi searah, negatif menunjukkan relasi berlawanan.")
    
    st.markdown("---")
    
    st.subheader("6. Distribusi Risk Tier (Pie Chart)")
    fig6, ax6 = plt.subplots(figsize=(8, 6))
    
    tier_counts = df_filtered['risk_tier'].value_counts()
    colors_pie = {'High Risk': '#e74c3c', 'Bronze': '#e8a76e', 'Silver': '#95a5a6', 'Gold': '#f1c40f'}
    pie_colors = [colors_pie.get(tier, '#95a5a6') for tier in tier_counts.index]
    
    wedges, texts, autotexts = ax6.pie(tier_counts, labels=tier_counts.index, autopct='%1.1f%%',
                                         colors=pie_colors, startangle=90, textprops={'fontsize': 11, 'weight': 'bold'})
    
    ax6.set_title('Distribusi UMKM berdasarkan Risk Tier', fontweight='bold', fontsize=12)
    st.pyplot(fig6)
    
    st.success("**💡 Summary:** Pie chart ini memberikan overview porsi masing-masing tier dalam dataset, membantu identifikasi portfolio risk secara keseluruhan.")

# ==========================================
# TAB 3: STATISTICAL SUMMARY
# ==========================================
with tab3:
    st.subheader("Ringkasan Statistik Deskriptif")
    
    # Statistik keseluruhan
    col_stat1, col_stat2, col_stat3 = st.columns(3)
    
    with col_stat1:
        st.metric("Rata-rata Omzet", f"Rp {df_filtered['omzet'].mean() / 1000000:.2f} Juta")
    with col_stat2:
        st.metric("Rata-rata Margin Laba", f"{df_filtered['margin_laba'].mean():.2f}%")
    with col_stat3:
        st.metric("Rata-rata Skor Kredit", f"{df_filtered['total_skor'].mean():.0f}")
    
    st.markdown("---")
    
    # Tabel statistik detail
    st.subheader("Tabel Statistik Deskriptif per Jenis Usaha")
    
    stat_table = df_filtered.groupby('jenis_usaha').agg({
        'omzet': ['mean', 'std'],
        'margin_laba': ['mean', 'std'],
        'total_skor': ['mean', 'std'],
        'limit_pinjaman': ['sum', 'mean']
    }).round(2)
    
    st.dataframe(stat_table, use_container_width=True)
    
    st.markdown("---")
    
    # Approval statistics
    st.subheader("Statistik Approval Rate")
    
    approval_stat = df_filtered.groupby('jenis_usaha').agg({
        'status_approval': lambda x: (x == 'Disetujui').sum(),
        'nik_id': 'count'
    }).rename(columns={'status_approval': 'Disetujui', 'nik_id': 'Total'})
    
    approval_stat['Ditolak'] = approval_stat['Total'] - approval_stat['Disetujui']
    approval_stat['Approval Rate (%)'] = (approval_stat['Disetujui'] / approval_stat['Total'] * 100).round(2)
    
    st.dataframe(approval_stat, use_container_width=True)

# ==========================================
# TAB 4: RISK DISTRIBUTION ANALYSIS
# ==========================================
with tab4:
    st.subheader("Analisis Distribusi Risiko Mendalam")
    
    col_risk1, col_risk2 = st.columns(2)
    
    with col_risk1:
        st.subheader("7. Risk Tier vs Approval Status (Stacked Bar)")
        fig7, ax7 = plt.subplots(figsize=(8, 5))
        
        risk_approval = pd.crosstab(df_filtered['risk_tier'], df_filtered['status_approval'], normalize='index') * 100
        risk_approval = risk_approval.reindex(['High Risk', 'Bronze', 'Silver', 'Gold'])
        
        risk_approval.plot(kind='bar', stacked=True, color=['#e74c3c', '#2ecc71'], ax=ax7, edgecolor='white')
        
        ax7.set_ylabel('Persentase (%)', fontweight='bold')
        ax7.set_xlabel('Risk Tier', fontweight='bold')
        ax7.set_xticklabels(ax7.get_xticklabels(), rotation=45, ha='right')
        ax7.legend(title='Status', bbox_to_anchor=(1.05, 1), loc='upper left')
        
        st.pyplot(fig7)
        
        st.info("**💡 Insight:** Menunjukkan hubungan antara risk tier dan keputusan approval. Semakin tinggi tier, semakin tinggi approval rate.")
    
    with col_risk2:
        st.subheader("8. Omzet Distribution by Risk Tier")
        fig8, ax8 = plt.subplots(figsize=(8, 5))
        
        tier_order = ['High Risk', 'Bronze', 'Silver', 'Gold']
        sns.boxplot(data=df_filtered, x='risk_tier', y='omzet', order=tier_order, palette='husl', ax=ax8)
        
        ax8.set_xlabel('Risk Tier', fontweight='bold')
        ax8.set_ylabel('Omzet', fontweight='bold')
        formatter = ticker.FuncFormatter(lambda x, pos: f'Rp {int(x/1000000)} Juta')
        ax8.yaxis.set_major_formatter(formatter)
        
        st.pyplot(fig8)
        
        st.info("**💡 Insight:** Omzet cenderung meningkat seiring dengan peningkatan risk tier, menunjukkan UMKM dengan revenue lebih tinggi memiliki score lebih baik.")

st.markdown("---")
st.markdown("<p style='text-align: center; color: #7f8c8d; font-size: 12px;'>Dashboard ModalIn v1.0 | Data Science Project 2026</p>", unsafe_allow_html=True)