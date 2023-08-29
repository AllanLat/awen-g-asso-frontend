


const resizeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const img = new Image();
  
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
  
          const maxWidth = 300;
          const maxHeight = 300;
          let newWidth = img.width;
          let newHeight = img.height;
  
          if (img.width > maxWidth) {
            newWidth = maxWidth;
            newHeight = (img.height * maxWidth) / img.width;
          }
  
          if (newHeight > maxHeight) {
            newHeight = maxHeight;
            newWidth = (img.width * maxHeight) / img.height;
          }
  
          canvas.width = newWidth;
          canvas.height = newHeight;
  
          ctx.drawImage(img, 0, 0, newWidth, newHeight);
  
          let resizedFile;
          if (file.type === 'image/gif') {
            canvas.toBlob((blob) => {
              resizedFile = new File([blob], file.name, {
                type: 'image/gif',
                lastModified: Date.now(),
              });
              resolve(resizedFile);
            }, 'image/gif');
          } else if (file.type === 'image/png') {
            canvas.toBlob((blob) => {
              resizedFile = new File([blob], file.name, {
                type: 'image/png',
                lastModified: Date.now(),
              });
              resolve(resizedFile);
            }, 'image/png');
          } else {
            canvas.toBlob((blob) => {
              resizedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(resizedFile);
            }, 'image/jpeg');
          }
        };
  
        img.src = event.target.result;
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsDataURL(file);
    });
  };
  
  export default resizeImage;
  