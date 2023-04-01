import React, {useState, useEffect } from 'react';
import axios from "axios";
import { getJwtToken } from '../../api/axios';
import './styles.css';
import SettingsIcon from '../../assets/icons/settings.svg';

function DashboardHeader ({ btnText, onClick }) {
    const [user, setUser] = useState('');

    getJwtToken();
    const fetchData = async () => {
        try {
            const {data} = await axios.get(`/profileMe`);
            setUser(data);
        } catch (error) {
            window.alert(error.response.data['hydra:description']);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    return(
        <div className='dashbord-header-container'>
            {btnText && 
                <button className='dashbord-header-btn' onClick={onClick}>{btnText}</button>
            }
            <h4>Welcome {user.firstname} {user.lastname}</h4>

            <div className='dashbord-header-right'>
                  <h4 className='dashbord-header-right-h1'
                  onClick= {() => window.location.href = `users/${user.id}`}>Edit My Profile</h4>
                <img 
                    src={SettingsIcon}
                    alt='settings-icon'
                    className='dashbord-header-icon'
                    onClick= {() => window.location.href = `users/${user.id}`} />
            </div>
        </div>
    )
}

export default DashboardHeader;