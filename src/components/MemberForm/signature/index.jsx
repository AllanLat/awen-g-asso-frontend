import React, { useRef, useState } from 'react';
import SignaturePad from 'react-signature-canvas';
import './index.css';

const SignatureComponent = () => {
  const [trimmedDataURL, setTrimmedDataURL] = useState(null);
  const sigPadRef = useRef(null);

  const clear = () => {
    sigPadRef.current.clear();
  };

  const trim = () => {
    setTrimmedDataURL(sigPadRef.current.getTrimmedCanvas().toDataURL('image/png'));
    console.log(sigPadRef.current.getTrimmedCanvas().toDataURL('image/png'));
  };

  return (
    <div className="container">
      <div className="sigContainer">
        <SignaturePad
          canvasProps={{ className: "sigPad" }}
          ref={sigPadRef}
        />
      </div>
      <div>
        <button className="buttons" onClick={clear}>
          Supprimer
        </button>
        <button className="buttons" onClick={trim}>
         Enregistrer
        </button>
      </div>

      {trimmedDataURL && (
        <img className="sigImage" src={trimmedDataURL} alt="Trimmed Signature" />
      )}

      {trimmedDataURL && (
              <input type="files" accept="image/*" value={trimmedDataURL} hidden id='image_rights_signature' name='image_rights_signature'/>
            )}
     
    </div>
  );
};

export default SignatureComponent;
