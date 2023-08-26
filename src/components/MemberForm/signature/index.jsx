import React, { useRef, useEffect, useState } from 'react';
import SignaturePad from 'signature_pad';

function SignatureComponent() {
    const canvasRef = useRef(null);
    const [signaturePad, setSignaturePad] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas) {
            const newSignaturePad = new SignaturePad(canvas);
            setSignaturePad(newSignaturePad);

            // Nettoyer SignaturePad lorsque le composant est démonté
            return () => {
                newSignaturePad.off();
                newSignaturePad.clear();
            };
        }
    }, []);

    const handleSaveSignature = () => {
        if (signaturePad && !signaturePad.isEmpty()) {
            const signatureImage = signaturePad.toDataURL();

            // Convertir la base64 en blob
            const blob = dataURLtoBlob(signatureImage);

            // Créer un objet de fichier à partir du blob
            const file = new File([blob], 'signature.png', { type: 'image/png' });

            // Mettre à jour le champ de fichier avec le fichier créé
            const fileInput = document.getElementById('signatureFileInput');
            fileInput.files = [file];
        }
    };

    // Convertir une base64 en blob
    const dataURLtoBlob = (dataURL) => {
        const byteString = atob(dataURL.split(',')[1]);
        const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i);
        }

        return new Blob([arrayBuffer], { type: mimeString });
    };

    return (
        <div>
            <div>
                <canvas ref={canvasRef} width={500} height={500}/>
            </div>
            <button onClick={handleSaveSignature}>Sauvegarder la signature</button>
            <input type="file" accept="image/png" id="signatureFileInput" />
        </div>
    );
}

export default SignatureComponent;
