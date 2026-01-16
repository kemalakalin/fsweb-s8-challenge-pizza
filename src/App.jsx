import React, { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Siparis from "./components/Siparis";
import Sonuc from "./components/Sonuc";
import Index from "./components/Index";

function AnaSayfa() {
  const history = useHistory();
  const handleStartOrder = () => {
    history.push("/order");
  };

return <Index onAciktimClick={handleStartOrder} />; 
}

function App() {
  // State Lifting: Sipariş verisini burada tutuyoruz
  const [siparisData, setSiparisData] = useState(null);

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <AnaSayfa />
        </Route>

        <Route path="/order">
          {/* Sipariş formuna state değiştirme fonksiyonunu gönderiyoruz */}
          <Siparis setSiparisData={setSiparisData} />
        </Route>

        <Route path="/success">
          {/* Onay sayfasına veriyi gönderiyoruz */}
          <Sonuc veri={siparisData} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;