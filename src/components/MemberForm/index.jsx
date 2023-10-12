import './index.css';

import { useForm } from 'react-hook-form';
import { useState, useEffect, useRef } from 'react';
import { createMember, getMemberById, updateMember } from '../../api/members';
import { getGroups, addMembersToGroup } from '../../api/groups';

import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../utils/css/customConfirm.css'
import './signature/index.css'

import SignaturePad from 'react-signature-canvas';

import Input from '../Input';
import { PDFViewer} from '@react-pdf/renderer';
import MyPDF from './signature';



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
    const [ribName, setRibName] = useState('');
    const [allGroups, setAllGroups] = useState([]);
    const [groupId, setGroupId] = useState();
    
    
    const memId = {
        "members_list" : []
    }
    memId.members_list.push(memberId)
    

    const [trimmedDataURL, setTrimmedDataURL] = useState('');
    const sigPadRef = useRef('');



    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const clear = () => {
        sigPadRef.current.clear();
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
                setValue('information', memberData.member_detail.information);

                
            } catch (error) {
                console.log(error);
            }
        };
        
        fetchMemberData();
    }, [method, memberId, token, setValue]);

    useEffect(() => {
        const fetchGroups = async () => {
            try{
                const groupsFetch = await getGroups(token);
                setAllGroups(groupsFetch);
            } catch (err){
                console.log(err)
            }
        }
        fetchGroups();
    }, [token])
    
    const getGroupInfo = (e) => {
        if(e.target.value !== "none"){
            setGroupId(e.target.value)
        }else{
            setGroupId(null)
        }
    }
    // on utilise la fonction getMemberById pour récupérer le membre si on est en update pour afficher les données
    
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
                        
                        console.log("ci-dessous");
                        console.log(data.information);

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
                            "paid": 0,
                            "information": data.information,
                        }

                        // on construit ici les formData pour les fichiers s'ils existent
                        const formData = new FormData();


                        if (data.photo.name) {
                            formData.append('photo', data.photo);
                        }

                        if (data.image_rights_signature) {
                            formData.append('image_rights_signature', data.image_rights_signature);
                        }
                        

                        if (data.certificate.name) { 
                            formData.append('certificate', data.certificate);
                        }


                        if(data.rib.name){
                            formData.append('rib', data.rib)
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
                        
                        console.log(newMember)
                    
                        if (method === 'post') {
                            
                            createMember(token, newMember)
                                .then((insertId) => {

                                    if(groupId !== null){
                                        getMemberById(token, insertId)
                                        .then((res) => {
                                            const member_liste = {
                                                "members_list" : []
                                            }
                                            member_liste.members_list.push(res.member_details_id)
                                            addMembersToGroup(token, groupId, member_liste)
                                        })
                                    }

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
                                    console.log(newMember.get('certificate'));
                                    // if(groupId !== null){
                                    //     addMembersToGroup(token, groupId, memId);
                                    // }
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

       
    const handleRibSelect = (e) => {
        e.target.files[0].name && setRibName(e.target.files[0].name);
        setValue('rib', e.target.files[0])
     }
 

    /** Gestion du  PDF */
  const handleFileAddition = () => {

    if (trimmedDataURL) {

        const filee = dataURLtoFile(trimmedDataURL, 'nouveau_fichier.png');
        filee.name && setImage_rights_signatureName(filee.name);
        setValue('image_rights_signature', filee);

    }
  };

  const handleImageLoad = (e) => {
    
    const imageElement = e.target;
    const source = imageElement.src;
   // console.log('Image de la signature chargée' + source);
    setTrimmedDataURL(source);

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


// Parametre par defaultP
const [nomPrenom, setnomPrenom] = useState('jean dupont');
const [isChecked, setIsChecked] = useState(false);

// Gestion d'état de la coche
const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

const handleAddDroitPDF = async () => {

    const nom = document.getElementById('lastname').value
    const prenom = document.getElementById('firstname').value

    const nomETPrenom = nom + ' ' + prenom;

    // Utilisez la fonction setValue pour définir la valeur de l'input
   
    await setnomPrenom(nomETPrenom);

  }
  

//   Je créé l'image png de la signture
  const trim =  () => {
        setTrimmedDataURL(sigPadRef.current.getTrimmedCanvas().toDataURL('image/png'));
  };





  const handlePDFReady = (pdfContent) => {

    const file = new File([pdfContent], 'fichier.pdf', { type: 'application/pdf' });
  
    setValue('image_rights_signature', file);

    trim();
  };

//   End PDF


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
            <Input value='contraindication' text='Contraintes médicales (laisser vide si aucune)' type='text' register={register} />

            <Input value='certificate' text={certificate_medicalName === '' ? method === 'post' ? "Ajouter un certificat medicale" : "Modifier certificat medicale" : certificate_medicalName} onChange={handleCertificate_medicalName} type='file' register={register} />
             
             <Input value='information' text='Informations paiement ou autres' type='text' register={register} />
             <Input value = 'rib'  text={ribName === '' ?  "RIB" : ribName} type={'file'} register={register} onChange={handleRibSelect} multiple={true}/>
           
            <div className='subscription'>
                <label htmlFor="subscription"><h2>Choix de la cotisation :</h2></label>
                <select id='subscription'  name='subscription' {...register('subscription')} required>
                    {cotisations.map((cotisation) => (
                        <option key={cotisation.name} value={cotisation.price}>{cotisation.name + ' - ' + cotisation.price + '€'}</option>
                    ))}
                </select>
            </div>
            <Input value='reduction' text='Réduction 10€' type='checkbox' register={register} />
            <br />


            <label htmlFor='groupTo' className='input-group'>Choix du groupe</label>
            <select id='groupTo'className='input-group' {...register('group')} onChange={getGroupInfo}>
                <option value="none">---</option>
                {allGroups.map((group) => (
                    <option key={group.name} value={group.id}>{group.name}</option>
                ))}
            </select>


            <h2>Signature </h2>
            

            <Input value='droits' text='J autorise le droit à l image' type='checkbox' register={register} checkeds={isChecked} onChange={() => {
                handleCheckboxChange();
                
                }} />
             

            <div className="input-group">
                <div className='container_button'>
                        <div className="buttons" onClick={clear}>
                        <p style={{ color: 'white', fontSize: '20px', textAlign: 'center', paddingTop: '10px' }}> Supprimer </p>
                        </div>
                        <div className="buttons" onClick={() => {
                            trim();
                            handleAddDroitPDF();
                }}><p style={{ color: 'white', fontSize: '20px', textAlign: 'center', paddingTop: '10px' }}>Valider la signature</p>
                        </div>
                        
                    </div>
                <div className="container">
                    <div className="sigContainer">

                        <SignaturePad
                        canvasProps={{ className: "sigPad" }}
                        ref={sigPadRef}
                        />
                    </div>
                    

                   

                </div>
                
            </div>
            {trimmedDataURL && (
                        <>
                        <img className="sigImage" src={trimmedDataURL} alt={image_rights_signatureName} onClick={handleImageLoad} 
                        onLoad={() => {
                                handleFileAddition();
                                handleAddDroitPDF();
                            }} 
                        />
                        <div className="container">
                            <div className="container_pdf">
                            <PDFViewer width="90%" height={400}>
                                    <MyPDF image={trimmedDataURL} 
                                      droitImage={isChecked}
                                      nomPRenom={nomPrenom}

                                      onPDFReady={handlePDFReady} 
                                      onLoad={handleAddDroitPDF}/>
                            </PDFViewer>
                        </div>
                        </div>
                        
                        
                    </>
                )}
      
                  

                
           
           
            {/** Ajouter un fetch et un select */}


            {/* rajouter un eneieme commentaire ici  */}


        </form  >
    )
}

export default MemberForm