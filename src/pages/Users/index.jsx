import React, {useState} from 'react';
import axios from "axios";
import DashboardHeader from '../../components/DashboardHeader';
import '../styles.css';
import Pagination from '../../components/Pagination/index';
import DeleteIcon from '../../assets/icons/delete.png';
import EditIcon from '../../assets/icons/edit.png';
import { getJwtToken } from '../../api/axios';


function Users () {
    const [users, setUsers] = useState('');
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const maxItems = 5;

    getJwtToken();
    const fetchData = async () => {
        try {
            const {data} = await axios.get(`/users?_page=${page}`);
            setUsers(data);
            setTotalItems(data['hydra:totalItems']);
        } catch (error) {
            window.alert(error.response.data['hydra:description']);
        }
    }
    const deleteUser = (id) => async () => {
        try {
            await axios.delete(`/userDelete/${id}`);
            fetchData();
        } catch (error) {
            window.alert(error.response.data['hydra:description']);
        }
    }

    return(
        <div className='dashboard-content'>
            <DashboardHeader
                btnText="New User" 
                onClick={() => window.location.href = `users/add`}/>
            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Users List</h2>
                </div>

                <table>
                    <thead>
                        <td>NOM</td>
                        <td>PRÉNOM</td>
                        <td>EMAIL</td>
                        <td>ROLES</td>
                    </thead>
                    {users ?
                        <tbody>
                            {users['hydra:member'].map((user, index) => (
                                <tr key={index}>
                                    <td><span>{user.lastname}</span></td>
                                    <td><span>{user.firstname}</span></td>
                                    <td><span>{user.email}</span></td>
                                    <td><span>{user.roles}</span></td>
                                    <td>
                                    <img
                                        style={{cursor: 'pointer'}}
                                        src={EditIcon}
                                        alt='edit-icon'
                                        onClick= {() => window.location.href = `users/${user.id}`}
                                        className='dashboard-content-icon' />  
                                    </td>
                                    <td>
                                    <img
                                        style={{cursor: 'pointer'}}
                                        src={DeleteIcon}
                                        alt='delete-icon'
                                        onClick={deleteUser(user.id)}
                                        className='dashboard-content-icon' />  
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    : null}
                </table>
            </div>
            <Pagination
                    fetchData={fetchData}
                    page={page}
                    setPage={setPage}
                    totalItems={totalItems}
                    maxItems={maxItems}
                />
        </div>
        
    )
}

export default Users;