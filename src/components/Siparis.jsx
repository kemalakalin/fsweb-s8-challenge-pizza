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
          <img src="/images/iteration-1-images/logo.svg" alt="Pizza Logo" className="logo1" />
          <img src="/assets/iteration-2/pictures/form-banner.png" alt="Pizza Top" className="pizza-top-image" />
          <nav>Anasayfa - Seçenekler - <span className="required">Sipariş Oluştur</span></nav>
        </header>

        <div className="section">
        <h3>Position Absolute Acı Pizza</h3>
        <div className="price-rating">
          <span className="price">{PIZZA_BIRIM_FIYAT.toFixed(2)}₺</span>
          <div className="stats"><span>⭐4.9</span> (200)</div>
        </div>
        <p className="description">
          Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. . Küçük bir pizzaya bazen pizzetta denir.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="selection-row">
<div className="selection-group">
  <h3>Boyut Seç <span className="required">*</span></h3>
  <div className="radio-group">
    {['Small', 'Medium', 'Large'].map((b) => (
      <label 
        key={b} 
        className={`radio-label ${formData.boyut === b ? 'selected' : ''}`}
      >
        <input 
          type="radio" 
          name="boyut" 
          value={b} 
          checked={formData.boyut === b} // Seçili durumu kontrol et
          onChange={handleChange} 
        />
        {/* Metnin sadece ilk harfini (S, M, L gibi) veya tamamını yazdırabilirsiniz */}
        <span>{b.charAt(0)}</span> 
      </label>
    ))}
  </div>
</div>

            <div className="selection-group">
              <h3>Hamur Seç <span className="required">*</span></h3>
              <select name="hamur" className="dropdown" onChange={handleChange} value={formData.hamur}>
                <option value="" disabled>—Hamur Kalınlığı—</option>
                <option value="ince">İnce</option>
                <option value="normal">Normal</option>
                <option value="kalin">Kalın</option>
              </select>
            </div>
          </div>

          <div className="extras-section">
            <h3>Ek Malzemeler</h3>
            <p className="description">En fazla 10 malzeme seçebilirsiniz. (+5₺)</p>
      <div className="checkbox-grid">
  {MALZEMELER.map((item) => (
    <label key={item} className="checkbox-container">
      <input
        type="checkbox"
        checked={formData.malzemeler.includes(item)}
        onChange={() => handleCheckboxChange(item)}
        disabled={formData.malzemeler.length >= 10 && !formData.malzemeler.includes(item)}
      />
      <span className="custom-checkbox"></span> {/* Özel kutucuk */}
      <span className="checkbox-text">{item}</span>
    </label>
  ))}
</div>
            {formData.malzemeler.length > 0 && formData.malzemeler.length < 4 && (
              <p style={{ color: 'red' }}>En az 4 malzeme seçmelisiniz.</p>
            )}
          </div>

 <div className="note-section">
              <h3>İsim</h3>
            <textarea
              id="isim-input"
              name="isim"
              type="text"
              placeholder="En az 3 karakter..."
              value={formData.isim}
              onChange={handleChange}
              
            />
            {formData.isim.length > 0 && formData.isim.length < 3 && (
              <p style={{ color: 'red' }}>İsim en az 3 karakter olmalıdır.</p>
            )}
            <h3>Sipariş Notu</h3>
            <textarea name="not" placeholder="Notunuz..." onChange={handleChange} className="note-input" />
          </div>

          <hr className="divider" />

  <div className="footer-section">
  {/* Sol taraf: Adet Seçici */}
  <div className="counter-left">
    <div className="counter-box">
      <button type="button" onClick={() => handleAdet('azalt')}>-</button>
      <div className="count">{formData.adet}</div>
      <button type="button" onClick={() => handleAdet('artir')}>+</button>
    </div>
  </div>

  {/* Sağ taraf: Sipariş Özeti ve Buton */}
  <div className="summary-right">
    <div className="summary-card">
      <div className="summary-content">
        <h3>Sipariş Toplamı</h3>
        <div className="summary-line">
          <span>Seçimler</span>
          <span>{secimlerToplami.toFixed(2)}₺</span>
        </div>
        <div className="summary-line total">
          <span>Toplam</span>
          <span>{genelToplam.toFixed(2)}₺</span>
        </div>
      </div>
      <button type="submit" className="order-button" disabled={isFormDisabled}>
        SİPARİŞ VER
      </button>
            </div>
          </div>
        </div>
        </form>
      </div>
    </div>
      <footer>
        <div className="footer-ana-icerik container">
          <div className="footer-sol">
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
            <h3>Hot Menu</h3>
            <a href="#terminal">Terminal Pizza</a>
            <a href="#hackathlon">5 Kişilik Hackathlon Pizza</a>
            <a href="#useeffect">useEffect Tavuklu Pizza</a>
            <a href="#frosty">Beyaz Console Frosty</a>
            <a href="#burger">Testler Geçti Mutlu Burger</a>
            <a href="#absolute">Position Absolute Acı Burger</a>
          </nav>

          <div className="insta-galeri">
            <h3>Instagram</h3>
            <div className="insta-resimler">
              <img src="/assets/iteration-2/footer/insta/li-0.png" alt="Instagram görseli 1" />
              <img src="/assets/iteration-2/footer/insta/li-1.png" alt="Instagram görseli 2" />
              <img src="/assets/iteration-2/footer/insta/li-2.png" alt="Instagram görseli 3" />
              <img src="/assets/iteration-2/footer/insta/li-3.png" alt="Instagram görseli 4" />
              <img src="/assets/iteration-2/footer/insta/li-4.png" alt="Instagram görseli 5" />
              <img src="/assets/iteration-2/footer/insta/li-5.png" alt="Instagram görseli 6" />
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