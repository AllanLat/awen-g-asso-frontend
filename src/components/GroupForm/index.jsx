import './index.css';

import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { createGroup, getGroupById, updateGroup } from '../../api/groups';

import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../utils/css/customConfirm.css'

import Input from '../Input';


const GroupForm = ({ method, groupId }) => {
    const token = sessionStorage.getItem('token');
    const { register, handleSubmit, setValue } = useForm();

    const navigate = useNavigate();

    useEffect(() => {
        if (method === 'post') {
            return
        }
        const fetchGroupData = async () => {
            try {
                const groupData = await getGroupById(token, groupId);

                setValue('name', groupData.name);
                setValue('group_day', groupData.group_day);
                setValue('start_time', groupData.start_time);
                setValue('end_time', groupData.end_time);
                setValue('members_max', groupData.members_max);
            } catch (error) {
                console.log(error);
            }
        }
        fetchGroupData();
    }, [method, groupId, token, setValue])

    const onSubmit = (data) => {
        confirmAlert({
            message: 'Voulez-vous vraiment soumettre ce formulaire ?',
            closeOnClickOutside: false,
            buttons: [
                {
                    label: 'Oui', onClick: () => {
                        const newData = {
                            "name": data.name,
                            "group_day": data.group_day,
                            "start_time": data.start_time,
                            "end_time": data.end_time,
                            "members_max": data.members_max
                        }

                        if (method === 'post') {
                            createGroup(token, newData)
                                .then((insertId) => {
                                    navigate(`/group/${insertId}`);
                                })
                                .catch((error) => {
                                    console.log(error);
                                })
                        }
                        if (method === 'put') {
                            updateGroup(token, groupId, newData)
                                .then(() => {
                                    navigate(`/group/${groupId}`);
                                })
                                .catch((error) => {
                                    console.log(error);
                                })
                        }
                    }
                },
                { label: 'Non', onClick: () => { return; } }
            ]
        })
    }

    return (
        <form id='group-form' className='group-form' action="" onSubmit={handleSubmit(onSubmit)}>
            <h2>{method === 'put' ? 'Modifier' : 'Créer'} un groupe</h2>

            <Input value='name' text='Nom du groupe' type='text' required register={register} />
            <select name="group_day" id="pet-select" required {...register('group_day')}>
                <option value={0}>--Choisir un jour--</option>
                <option value={1}>Lundi</option>
                <option value={2}>Mardi</option>
                <option value={3}>Mercredi</option>
                <option value={4}>Jeudi</option>
                <option value={5}>Vendredi</option>
                <option value={6}>Samedi</option>
                <option value={7}>Dimanche</option>
            </select>
            <Input value='start_time' text='Heure de début' type='time' step="300" required register={register} />
            <Input value='end_time' text='Heure de fin' type='time' step="300" required register={register} />
            <Input value='members_max' text="Nombre max d'adhérents" type='number' required register={register} />
        </form>
    )
}

export default GroupForm