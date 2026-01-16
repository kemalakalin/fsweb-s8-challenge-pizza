import React from 'react';
import styles from './success.module.css';

function Sonuc({ veri }) {
  // Veri gelene kadar boş ekran veya yükleniyor gösterimi
  if (!veri) return <div className={styles.banner1}>Yükleniyor...</div>;

  return (
    <div className={styles.banner1}>
      <header className={styles.header}>
        <h1 className={styles.mainLogo}>Teknolojik Yemekler</h1>
      </header>

      <div className={styles.content}>
        <p className={styles.yellowItalic}>lezzetin yolda</p>
        <h2 className={styles.orderTitle}>SİPARİŞ ALINDI</h2>
        
        <hr className={styles.divider} />

        <div className={styles.pizzaName}>Position Absolute Acı Pizza</div>

        <div className={styles.orderDetails}>
          <p>İsim:  <strong>{veri.isim}</strong></p>
          <p>Boyut: <strong>{veri.boyut}</strong></p>
          <p>Hamur: <strong>{veri.hamur}</strong></p>
          <p>Ek Malzemeler: <strong>{veri.malzemeler?.join(", ")}</strong></p>
        </div>

        <div className={styles.summaryCard}>
          <h3 className={styles.summaryTitle}>Sipariş Toplamı</h3>
          <div className={styles.summaryRow}>
            <span>Seçimler</span>
            <span>{(veri.malzemeler?.length * 5).toFixed(2)}₺</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Toplam</span>
            <span>{((85.50 + (veri.malzemeler?.length * 5)) * (veri.adet || 1)).toFixed(2)}₺</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sonuc;