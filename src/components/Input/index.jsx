// import './index.css'

// const Input = ({ value, type, text, register, required, onChange, placeholder, step, checkeds }) => {

//     return (
//         <div className={type==='checkbox' ? 'input-group-checkbox' : 'input-group'}>
//             <label className={type==='file' ? 'custom-file-upload' : ''} htmlFor={value}>{type==='file' ? text : text + ' :'}</label>
//            {onChange ? <input placeholder={placeholder} type={type} step={step} required={required} id={value} checked={checkeds} name={value} {...register(value)} onChange={onChange} /> : <input  placeholder={placeholder} type={type} step={step} required={required} id={value} checked={checkeds} name={value} {...register(value)} />}
//         </div>
//     )
// }

// export default Input

import './index.css';

const Input = ({ value, type, text, register, required, onChange, placeholder, step, checkeds }) => {
  const acceptTypes = ['image/jpeg', 'image/png']; // Ajoutez ici les types de fichiers acceptés

  const handleDrop = (event) => {
    event.preventDefault();

    // Récupérez les fichiers déposés
    const files = event.dataTransfer.files;

    // Parcourez les fichiers et vérifiez leur type
    for (const file of files) {
      if (acceptTypes.includes(file.type)) {
        // Le fichier est un JPEG ou un PNG, appel à la fonction onChange
        if (onChange) {
          onChange(event);
        }
      } else {
        // Le fichier n'est pas un JPEG ou un PNG, affichez un message d'erreur
        console.log('Invalid file type:', file.name);
        // Vous pouvez afficher un message d'erreur à l'utilisateur ici
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className={type === 'checkbox' ? 'input-group-checkbox' : 'input-group'}
      onDrop={type === 'file' ? handleDrop : undefined}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
    >
      <label className={type === 'file' ? 'custom-file-upload' : ''} htmlFor={value}>
        {type === 'file' ? text : text + ' :'}
      </label>
      {onChange ? (
        <input
          placeholder={placeholder}
          type={type}
          step={step}
          required={required}
          id={value}
          checked={checkeds}
          name={value}
          {...register(value)}
          onChange={onChange}
          accept={type === 'file' ? acceptTypes.join(',') : undefined}
        />
      ) : (
        <input
          placeholder={placeholder}
          type={type}
          step={step}
          required={required}
          id={value}
          checked={checkeds}
          name={value}
          {...register(value)}
        />
      )}
    </div>
  );
};

export default Input;