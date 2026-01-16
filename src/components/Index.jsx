import React from 'react';
import './index.css';

// onAciktimClick prop'unu içeri alıyoruz
export default function Index({ onAciktimClick }) {
  return (
    <>
    <div className="banner1">
      <img 
        src="/images/iteration-1-images/home-banner.png"
        className="banner" 
        alt="Home Banner" 
      />
      <img 
        src="/images/iteration-1-images/logo.svg"
        className="logo" 
        alt="Logo" 
      />
      
      <p id="app">fırsatı kaçırma</p>
      
      <h1>KOD ACIKTIRIR</h1>
      <h1>PIZZA, DOYURUR</h1>
      
      {/* Prop olarak gelen fonksiyonu onClick'e bağlıyoruz */}
      <button className="btn" onClick={onAciktimClick}>
        ACIKTIM
      </button>
    </div>
    <div className="menu">
        <nav>
          <a href="#kore">
            <img src="public/assets/iteration-2/icons/1.svg" className="menu-icon" /> Yeni! Kore
          </a>
          <a href="#pizza">
            <img src="public/assets/iteration-2/icons/2.svg" className="menu-icon" /> Pizza
          </a>
          <a href="#burger">
            <img src="public/assets/iteration-2/icons/3.svg" className="menu-icon" /> Burger
          </a>
          <a href="#kizartmalar">
            <img src="public/assets/iteration-2/icons/4.svg" className="menu-icon" /> Kızartmalar
          </a>
          <a href="#fastfood">
            <img src="public/assets/iteration-2/icons/5.svg" className="menu-icon" /> Fast Food
          </a>
          <a href="#icecek">
            <img src="public/assets/iteration-2/icons/6.svg" className="menu-icon" /> Gazlı İçeçek
          </a>
        </nav>
      </div>

      <section className="lezzetus-container">
        <div className="card-wrapper buyuk-kart">
          <img src="public/assets/iteration-2/cta/kart-1.png" className="pz" />
          <div className="card-metin sol-buyuk">
            <h2>Özel</h2>
            <h2>Lezzetus</h2>
            <p>Position:Absolute Acı Burger</p>
          </div>
          <button className="lzt sol-buyuk-btn">SİPARİŞ VER</button>
        </div>

        <div className="sag-kart-grup">
          <div className="card-wrapper kucuk-kart">
            <img src="public/assets/iteration-2/cta/kart-2.png" className="brgr" />
            <div className="card-metin sag-kucuk">
              <h3>Hackathlon</h3>
              <h3>Burger Menü</h3>
            </div>
            <button className="lzt">SİPARİŞ VER</button>
          </div>

          <div className="card-wrapper kucuk-kart">
            <img src="public/assets/iteration-2/cta/kart-3.png" className="kry" />
            <div className="card-metin sag-kucuk">
              <h4>Çoooook hızlı</h4>
              <h4>npm gibi kurye</h4>
            </div>
            <button className="lzt">SİPARİŞ VER</button>
          </div>
        </div>
      </section>

      <div className="banner2">
        <p id="app2">en çok paketlenen menüler</p>
        <h5>Acıktıran Kodlara Doyuran Lezzetler</h5>
      </div>

      <div className="mn">
        <nav>
          <a href="#ramen">
            <img src="public/assets/iteration-2/icons/1.svg" className="menu-icon" />Ramen
          </a>
          <a href="#pizza">
            <img src="public/assets/iteration-2/icons/2.svg" className="menu-icon" />Pizza
          </a>
          <a href="#burger">
            <img src="public/assets/iteration-2/icons/3.svg" className="menu-icon" />Burger
          </a>
          <a href="#fries">
            <img src="public/assets/iteration-2/icons/4.svg" className="menu-icon" />French fries
          </a>
          <a href="#fastfood">
            <img src="public/assets/iteration-2/icons/5.svg" className="menu-icon" />Fast Food
          </a>
          <a href="#drinks">
            <img src="public/assets/iteration-2/icons/6.svg" className="menu-icon" />Soft Drinks
          </a>
        </nav>
      </div>

      <div className="a">
        <a href="#terminal-pizza">
          <img src="public/assets/iteration-2/pictures/food-1.png" alt="Terminal Pizza Resmi" className="menu-icon" />
          <p>Terminal Pizza</p>
          <div className="rating-info">
            <p className="rating">4.9</p>
            <p className="comments">(200)</p>
            <p className="fiyat">60₺</p>
          </div>
        </a>

        <a href="#absolute-pizza">
          <img src="public/assets/iteration-2/pictures/food-2.png" alt="Position Absolute Acı Pizza Resmi" className="menu-icon" />
          <p>Position Absolute Acı Pizza</p>
          <div className="rating-info">
            <p className="rating">4.9</p>
            <p className="comments">(200)</p>
            <p className="fiyat">60₺</p>
          </div>
        </a>

        <a href="#useeffect-burger">
          <img src="public/assets/iteration-2/pictures/food-3.png" alt="useEffect Tavuklu Burger Resmi" className="menu-icon" />
          <p>useEffect Tavuklu Burger</p>
          <div className="rating-info">
            <p className="rating">4.9</p>
            <p className="comments">(200)</p>
            <p className="fiyat">60₺</p>
          </div>
        </a>
      </div>

      <footer>
        <div className="footer-ana-icerik container">
          <div className="footer-sol">
            <img src="public/assets/iteration-2/footer/logo-footer.svg" className="footer-logo" />

            <ul className="iletisim-listesi">
              <li>
                <a href="#adres">
                  <img src="public/assets/iteration-2/footer/icons/icon-1.png" className="footer-icon" />
                  341 Londonderry Road, <br />Istanbul Türkiye
                </a>
              </li>
              <li>
                <a href="mailto:aciktim@teknolojikyemekler.com">
                  <img src="public/assets/iteration-2/footer/icons/icon-2.png" className="footer-icon" />
                  aciktim@teknolojikyemekler.com
                </a>
              </li>
              <li>
                <a href="tel:+90216123456">
                  <img src="public/assets/iteration-2/footer/icons/icon-3.png" className="footer-icon" />
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
              <img src="public/assets/iteration-2/footer/insta/li-0.png" alt="Instagram görseli 1" />
              <img src="public/assets/iteration-2/footer/insta/li-1.png" alt="Instagram görseli 2" />
              <img src="public/assets/iteration-2/footer/insta/li-2.png" alt="Instagram görseli 3" />
              <img src="public/assets/iteration-2/footer/insta/li-3.png" alt="Instagram görseli 4" />
              <img src="public/assets/iteration-2/footer/insta/li-4.png" alt="Instagram görseli 5" />
              <img src="public/assets/iteration-2/footer/insta/li-5.png" alt="Instagram görseli 6" />
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
