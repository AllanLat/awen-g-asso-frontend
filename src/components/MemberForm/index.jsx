import './index.css';

import { useForm } from 'react-hook-form';
import { useState, useEffect, useRef } from 'react';
import { createMember, getMemberById, updateMember } from '../../api/members';

import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../utils/css/customConfirm.css'
import './signature/index.css'

import SignaturePad from 'react-signature-canvas';

import Input from '../Input';



const MemberForm = ({ method, memberId }) => {
    const token = sessionStorage.getItem('token');
    const { register, handleSubmit, setValue } = useForm();

    const cotisations = [
        {name: "Babydo", price: "161"}, 
        {name: "Judo / Cross training", price: "181"},
        {name: "Taïso", price: "141"}
    ]

    const navigate = useNavigate();

    const [photoName, setPhotoName] = useState('');
    const [certificate_medicalName, setCertificate_medicalName] = useState('');
    const [image_rights_signatureName, setImage_rights_signatureName] = useState('');


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    const [trimmedDataURL, setTrimmedDataURL] = useState('');
    const sigPadRef = useRef('');

    const clear = () => {
        sigPadRef.current.clear();
    };


    const trim = () => {
        setTrimmedDataURL(sigPadRef.current.getTrimmedCanvas().toDataURL('image/png'));
  };


    useEffect(() => {
        if (method === 'post') {
            return
        }
        const fetchMemberData = async () => {
            try {
                const memberData = await getMemberById(token, memberId);

                setValue('lastname', memberData.lastname);
                setValue('firstname', memberData.firstname);
                setValue('birthday', formatDate(memberData.member_detail.birthday));
                setValue('birthplace', memberData.member_detail.birthplace);

                setValue('living_with', memberData.member_detail.living_with);
                setValue('street', memberData.address.street);
                setValue('postal_code', memberData.address.postal_code);
                setValue('city', memberData.address.city);

                setValue('mail', memberData.member_detail.mail);
                setValue('phone_number', memberData.member_detail.phone_number);
                setValue('emergency_number', memberData.member_detail.emergency_number);
                setValue('subscription', memberData.subscription);

                setValue('contraindication', memberData.member_detail.contraindication);

                
            } catch (error) {
                console.log(error);
            }
        };
        fetchMemberData();
    }, [method, memberId, token, setValue]);


    const onSubmit = (data) => {
        confirmAlert({
            message: 'Voulez-vous vraiment soumettre ce formulaire ?',
            closeOnClickOutside: false,
            buttons: [
                {
                    label: 'Oui', onClick: () => {
                        // on construit ici la data simple pour créer un nouveau membre

               
                        // Reduction si checkbox coché
                        if (data.reduction === true) {
                            data.subscription -= 10;
                        }

                        const newData = {
                            "street": data.street,
                            "postal_code": data.postal_code,
                            "city": data.city,
                            "mail": data.mail,
                            "birthday": data.birthday,
                            "contraindication": data.contraindication,
                            "phone_number": data.phone_number,
                            "emergency_number": data.emergency_number,
                            "birthplace": data.birthplace,
                            "living_with": data.living_with,
                            "firstname": data.firstname,
                            "lastname": data.lastname,
                            "file_status": 0,
                            "payment_status": 0,
                            "subscription": data.subscription,
                            "paid": 0
                        }


                        // on construit ici les formData pour les fichiers s'ils existent
                        const formData = new FormData();

                        if (data.photo.name) {
                            formData.append('photo', data.photo);
                        }

                        if (data.image_rights_signature) {
                            console.log('Récupéré signature');
                            formData.append('image_rights_signature', data.image_rights_signature);
                        }
                        

                        if (data.certificate.name) {
                            console.log('Récupéré certificat');
                            formData.append('certificate', data.certificate);
                        }


                        // on transforme la data en JSON
                        const jsonData = JSON.stringify(newData);

                        // on crée un nouveau formData avec le tout
                        const newMember = new FormData();

                        // on ajoute les données JSON au formData
                        newMember.append('data', jsonData);

                        // on ajoute les fichiers au formData
                        formData.forEach((file, index) => {
                            newMember.append(index, file);
                        })
                        if (method === 'post') {

                            console.log(newMember.has('photo'));
                            console.log(newMember.get('photo'));
                            console.log(newMember.has('image_rights_signature'));
                            console.log(newMember.get('image_rights_signature'));
                            console.log(newMember.has('certificate'));
                            console.log(newMember.get('certificate'));

                            createMember(token, newMember)
                                .then((insertId) => {
                                    console.log(newMember);
                                    navigate('/member/' + insertId);
                                })
                                .catch((error) => {
                                    console.log(newMember);
                                    console.log(error);
                                });
                        }
                        if (method === 'put') {
                            updateMember(token, memberId, newMember)
                                .then(() => {
                                    navigate('/member/' + memberId);
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        }
                    }
                },
                { label: 'Non', onClick: () => { 
                    return; } }
            ]
        })


    }

    const handlePhotoName = (e) => {
        e.target.files[0].name && setPhotoName(e.target.files[0].name);
       // console.log(e.target.files[0]);
        setValue('photo', e.target.files[0]);
    }

    const handleCertificate_medicalName = (e) => {
        e.target.files[0].name && setCertificate_medicalName(e.target.files[0].name);
        setValue('certificate', e.target.files[0]);
    }


const [trimmedDataUrl, setTrimmedDataUrl] = useState(null);

  const handleFileAddition = () => {

  if (trimmedDataUrl) {
    console.log(trimmedDataUrl);

     const filee = dataURLtoFile(trimmedDataUrl, 'nouveau_fichier.png');
    filee.name && setImage_rights_signatureName(filee.name);
     setValue('image_rights_signature', filee);
     console.log(filee);

    // const dataTransfer = new DataTransfer();
    // dataTransfer.items.add(file);
    // fileInput.files = dataTransfer.files;

    // // Afficher les informations du fichier dans la console
    // console.log('Nom du fichier:', file.name);
    // console.log('Type du fichier:', file.type);
    // console.log('Taille du fichier:', file.size);
   }
  };

  const handleImageLoad = (e) => {
    console.log('bite')
    const imageElement = e.target;
    const source = imageElement.src;
    console.log(source)
    setTrimmedDataUrl(source);
  };

  const dataURLtoFile = (dataUrl, filename) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };


    return (
        <form id='member-form' className='member-form' action="" onSubmit={handleSubmit(onSubmit)} >
            <h2>{method === 'post' ? 'Ajouter un membre' : 'Modifier un membre'}</h2>
            <Input value='lastname' text='Nom' type='text' required register={register} />
            <Input value='firstname' text='Prénom' type='text' required register={register} />
            <Input value='birthday' text='Né(e) le' type='date' required register={register} />
            <Input value='birthplace' text='Lieu de naissance' type='text' required register={register} />
            <Input value='photo' text={photoName === '' ? method === 'post' ? 'Ajouter une photo' : 'Modifier la photo' : photoName} onChange={handlePhotoName} type='file' register={register} />
            
            <h2>Adresse :</h2>
            <Input value='street' text='Numéro et nom de la rue' type='text' required register={register} />
            <Input value='postal_code' text='Code postal' type='text' required register={register} />
            <Input value='city' text='Ville' type='text' required register={register} />
            <hr />
            <Input value='living_with' text='Adresse secondaire' type='text' placeholder='Adresse secondaire' register={register} />
            
            <h2>Contacts :</h2>
            <Input value='mail' text='Adresse mail' type='email' required register={register} />
            <Input value='phone_number' text='N° de téléphone' type='tel' required register={register} />
            <Input value='emergency_number' text="Numéro en cas d'urgence" type='tel' required register={register} />
            
            <h2>Informations :</h2>
          
            <Input value='certificate' text={certificate_medicalName === '' ? method === 'post' ? "Ajouter un certificat medicale" : "Modifier certificat medicale" : certificate_medicalName} onChange={handleCertificate_medicalName} type='file' register={register} />
            <Input value='contraindication' text='Contraintes médicales (laisser vide si aucune)' type='text' register={register} />

            <div className='subscription'>
                <label htmlFor="subscription"><h2>Choix de la cotisation :</h2></label>
                <select {...register('subscription')} required>
                    {cotisations.map((cotisation) => (
                        <option key={cotisation.name} value={cotisation.price}>{cotisation.name + ' - ' + cotisation.price + '€'}</option>
                    ))}
                </select>
            </div>
            <Input value='reduction' text='Réduction 10€' type='checkbox' register={register} />
            <br />

            <h2>Signature </h2>


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
                    <button className="buttons" onClick={() => {
                        trim();
                        }}>Cliquez ici
                    </button>
                </div>

                {trimmedDataURL && (
                    <img className="sigImage" src={trimmedDataURL} alt={image_rights_signatureName} onClick={handleImageLoad}/>
               )}

               {
                   trimmedDataURL &&
                   (
                    <button className="buttons" onClick={handleFileAddition}>Ajouter la signature au document</button>

                   )
               }

            </div>
                  

                
           
            <h2>Choix du Groupe</h2>
            {/** Ajouter un fetch et un select */}

            {/* rajouter un eneieme commentaire ici  */}


        </form>
    )
}

export default MemberForm