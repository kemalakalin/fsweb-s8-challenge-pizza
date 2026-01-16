describe('Pizza Sipariş Sayfası Testleri', () => {
  
  beforeEach(() => {
    // Projenin çalıştığı Vite portu
    cy.visit('http://localhost:5173');
  });

  it('Sipariş akışını başarıyla tamamlar', () => {
    // 1. Ana sayfadan sipariş formuna git
    cy.contains(/SİPARİŞ VER|ACIKTIM/i).click();

    // --- TEST 1: INPUTA METİN GİREN TEST ---
    cy.get('#isim-input')
      .type('Ahmet Yılmaz')
      .should('have.value', 'Ahmet Yılmaz');

    // --- TEST 2: BİRDEN FAZLA MALZEME SEÇİLEBİLEN TEST ---
    const secilecekMalzemeler = ['Pepperoni', 'Mısır', 'Sarımsak', 'Zeytin'];
    
    secilecekMalzemeler.forEach((malzeme) => {
      cy.contains(malzeme)
        .parent()
        .find('input[type="checkbox"]')
        .check({ force: true });
    });+-

    // Formun aktifleşmesi için diğer zorunlu alanları doldur
    cy.get('input[name="boyut"][value="Medium"]').check({ force: true });
    cy.get('select[name="hamur"]').select('normal');

    // --- TEST 3: FORMU GÖNDEREN TEST ---
    // Butonun artık disabled olmadığını doğrula
    cy.get('.order-button').should('not.be.disabled');

    // Formu submit et veya butona tıkla
    cy.get('form').submit();

    // Başarılı gönderim sonrası alert doğrulaması
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Siparişiniz alındı');
    });
  });
});