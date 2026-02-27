import React, { useState, useEffect } from 'react';
import './OrderPizza.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const MALZEMELER = [
  "Pepperoni", "Tavuk Izgara", "Mısır", "Sarımsak", "Ananas", 
  "Jalapeno", "Biber", "Sucuk", "Sosis", "Soğan", "Zeytin", "Patlıcan"
];

const OrderPizza = ({ setSiparisData }) => { 
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState(null);

const options = [
  { id: 'ince', label: 'İnce' },
  { id: 'normal', label: 'Normal' },
  { id: 'kalin', label: 'Kalın' }
];
 
  // --- 1. TEKİL STATE YÖNETİMİ ---
  const [formData, setFormData] = useState({
    isim: '',
    boyut: '',
    hamur: '',
    malzemeler: [],
    not: '',
    adet: 1
  });

  const [isFormDisabled, setIsFormDisabled] = useState(true);

  // Sabitler
  const PIZZA_BIRIM_FIYAT = 85.50;
  const MALZEME_BIRIM_FIYAT = 5;

  // --- 2. HESAPLAMALAR (Her render'da otomatik güncellenir) ---
  const secimlerToplami = formData.malzemeler.length * MALZEME_BIRIM_FIYAT * formData.adet;
  const genelToplam = (PIZZA_BIRIM_FIYAT * formData.adet) + secimlerToplami;

  // --- 3. FORM VALIDATION ---
  useEffect(() => {
    const { isim, boyut, hamur, malzemeler, not } = formData;
    const isIsimValid = isim.trim().length >= 3;
    const isBoyutValid = boyut !== '';
    const isHamurValid = hamur !== '';
    const isMalzemelerValid = malzemeler.length >= 4 && malzemeler.length <= 10;

    setIsFormDisabled(!(isIsimValid && isBoyutValid && isHamurValid && isMalzemelerValid));
  }, [formData]);

  // --- 4. HANDLERS ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (malzeme) => {
    setFormData(prev => {
      let yeniList = [...prev.malzemeler];
      if (yeniList.includes(malzeme)) {
        yeniList = yeniList.filter(item => item !== malzeme);
      } else if (yeniList.length < 10) {
        yeniList.push(malzeme);
      }
      return { ...prev, malzemeler: yeniList };
    });
  };

  const handleAdet = (islem) => {
    setFormData(prev => ({
      ...prev,
      adet: islem === 'artir' ? prev.adet + 1 : Math.max(1, prev.adet - 1)
    }));
  };

  // --- 5. SUBMIT ---
const handleSubmit = (e) => {
  e.preventDefault();
  
  // Hem HTML düzeyinde hem de fonksiyon düzeyinde engelleme
  if (isFormDisabled) return;

  axios.post('https://reqres.in/api/pizza', formData, {
    headers: {
      'x-api-key': 'reqres-free-v1' // İstenen API key header'ı
    }
  })
  .then(response => {
    console.log("Sipariş Özeti (API Yanıtı):", response.data);
    // State Lifting
    setSiparisData(response.data);
    // Başarı sayfasına yönlendir
    history.push('/success');
  })
  .catch(err => {
    console.warn("API Hatası alındı, yerel verilerle devam ediliyor...");
    
    if (!err.response) {
      alert("Sunucuya bağlanırken bir hata oluştu. Siparişiniz yerel olarak kaydedildi.");
    }

    setSiparisData(formData); 
    history.push('/success');
  });
};

  return (
    <>
      <div className="order-container">
        <header className="order-header">
          {/* Klasör taşındığı için yol başına / ekledik */}
          <img src="/images/iteration-1-images/logo.svg" alt="Pizza Logo" className="logo1" />
          {/* public/ kelimesini sildik */}
          <img src="/assets/iteration-2/pictures/form-banner.png" alt="Pizza Top" className="pizza-top-image" />
          <nav>Anasayfa - Seçenekler - <span className="required">Sipariş Oluştur</span></nav>
        </header>

        {/* ... (Form içeriği aynı) ... */}

      </div>

      <footer>
        <div className="footer-ana-icerik container">
          <div className="footer-sol">
            {/* public/ silindi */}
            <img src="/assets/iteration-2/footer/logo-footer.svg" className="footer-logo" />

            <ul className="iletisim-listesi">
              <li>
                <a href="#adres">
                  <img src="/assets/iteration-2/footer/icons/icon-1.png" className="footer-icon" />
                  341 Londonderry Road, <br />Istanbul Türkiye
                </a>
              </li>
              <li>
                <a href="mailto:aciktim@teknolojikyemekler.com">
                  <img src="/assets/iteration-2/footer/icons/icon-2.png" className="footer-icon" />
                  aciktim@teknolojikyemekler.com
                </a>
              </li>
              <li>
                <a href="tel:+90216123456">
                  <img src="/assets/iteration-2/footer/icons/icon-3.png" className="footer-icon" />
                  +90 216 123 45 67
                </a>
              </li>
            </ul>
          </div>

          <nav className="footer-nav">
             {/* ... (Nav linkleri) ... */}
          </nav>

          <div className="insta-galeri">
            <h3>Instagram</h3>
            <div className="insta-resimler">
              {/* Instagram resim yolları düzeltildi */}
              <img src="/assets/iteration-2/footer/insta/li-0.png" alt="Insta 1" />
              <img src="/assets/iteration-2/footer/insta/li-1.png" alt="Insta 2" />
              <img src="/assets/iteration-2/footer/insta/li-2.png" alt="Insta 3" />
              <img src="/assets/iteration-2/footer/insta/li-3.png" alt="Insta 4" />
              <img src="/assets/iteration-2/footer/insta/li-4.png" alt="Insta 5" />
              <img src="/assets/iteration-2/footer/insta/li-5.png" alt="Insta 6" />
            </div>
          </div>
        </div>

        <div className="copyright-bolumu">
          <p>© 2023 Teknolojik Yemekler</p>
        </div>
      </footer>
    </>
  );
}

export default OrderPizza;