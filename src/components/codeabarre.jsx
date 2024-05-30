import React, { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

function App() {
  const [scannedCode, setScannedCode] = useState(null);

  const handleUpdate = (err, result) => {
    if (result) {
      setScannedCode(result.text);
    }
  };

  return (
    <>
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={handleUpdate}
      />
      <p>Code scanné : {scannedCode}</p>
    </>
  );
}

export default App;
