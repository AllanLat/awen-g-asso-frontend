import React, { useEffect } from 'react';
import { Page, Document, Image, StyleSheet, View, Text } from '@react-pdf/renderer';

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
  // Générez le contenu du PDF à partir des données fournies

  console.log(nomPRenom);
  const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.content}>
          <Text>Je m'inscrit pour l'année 2023-2024</Text>
          <Text>Je certifie que mes informations renseignées sont exactes</Text>
          <Text style={{ marginBottom: 40 }}>{droitImage ? "J'accepte le droit à l'image" : "Je n'accepte pas le droit à l'image"}</Text>
          <Text style={{ marginBottom: 10 }}>{nomPRenom}</Text>
          <Text style={{ marginBottom: 10 }}>{formattedDate}</Text>
          <Image style={styles.image} src={image} />
        </View>
      </Page>
    </Document>
  );
};

const MyPDF = ({ image, droitImage, nomPRenom, onPDFReady }) => {
  useEffect(() => {
    // Générez le contenu du PDF
    const pdfContent = generatePDFContent(image, droitImage, nomPRenom);

    // Appelez la fonction de rappel avec le contenu du PDF
    onPDFReady(pdfContent);
  }, [image, droitImage, nomPRenom, onPDFReady]);

  console.log(droitImage);
  console.log(nomPRenom);

  return generatePDFContent(image, droitImage, nomPRenom);
};

export default MyPDF;
