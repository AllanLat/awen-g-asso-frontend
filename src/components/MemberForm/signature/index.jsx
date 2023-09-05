import React, { useEffect, useState } from 'react';
import { Page, Document, Image, StyleSheet, View, Text, pdf } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: 200,
    height: 150,
  },
  content: {
    marginLeft: 10,
    marginTop: 10,
  },
});

const generatePDFContent = (image, droitImage, nomPRenom) => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.content}>
          <Text>Je m'inscris pour l'année 2023-2024</Text>
          <Text>Je certifie que mes informations renseignées sont exactes</Text>
          <Text style={{ marginBottom: 40 }}>
            {droitImage ? "J'accepte le droit à l'image" : "Je n'accepte pas le droit à l'image"}
          </Text>
          <Text style={{ marginBottom: 10 }}>{nomPRenom}</Text>
          <Text style={{ marginBottom: 10 }}>{formattedDate}</Text>
          <Image style={styles.image} src={image} />
        </View>
      </Page>
    </Document>
  );
};

const MyPDF = ({ image, droitImage, nomPRenom, onPDFReady }) => {
  //const [pdfBlob, setPdfBlob] = useState(null);
  const [fichierLisible, setFichierLisible] = useState(null);
  

  useEffect(() => {
    const generatePDF = async () => {
      const pdfContent = await generatePDFContent(image, droitImage, nomPRenom);
      const blob = await pdf(pdfContent).toBlob();
      
      setFichierLisible(pdfContent);
      
      onPDFReady(blob);
    };

    generatePDF();
  }, [image, droitImage, nomPRenom, onPDFReady]);

  return fichierLisible ; // You don't need to render anything here
};

export default MyPDF;
