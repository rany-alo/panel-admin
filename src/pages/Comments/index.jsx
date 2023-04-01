import React, {useState} from 'react';
import axios from "axios";
import DashboardHeader from '../../components/DashboardHeader';
import '../styles.css';
import Pagination from '../../components/Pagination/index';
import DeleteIcon from '../../assets/icons/delete.png';
import EditIcon from '../../assets/icons/edit.png';
import { getJwtToken } from '../../api/axios';
import moment from 'moment';


function Comments () {
    const [comments, setComments] = useState('');
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const maxItems = 5;

    getJwtToken();
    const fetchData = async () => {
        try {
            const {data} = await axios.get(`/comments?_page=${page}`);
            setComments(data);
            setTotalItems(data['hydra:totalItems']);
        } catch (error) {
            window.alert(error.response.data['hydra:description']);
        }
    }

    const deleteComment = (id) => async () => {
        try {
            await axios.delete(`/commentDelete/${id}`);
            fetchData();
        } catch (error) {
            window.alert(error.response.data['hydra:description']);
        }
    }


    return(
        <div className='dashboard-content'>
            <DashboardHeader
                btnText="New Comment" 
                onClick={() => window.location.href = `comments/add`}/>

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Comments List</h2>
                </div>

                <table>
                    <thead>
                        <td>CONTENT</td>
                        <td>Created At</td>
                        <td>Updated At</td>
                    </thead>
                    {comments ?
                        <tbody>
                            {comments['hydra:member'].map((comment, index) => (
                                <tr key={index}>
                                    <td><span>{comment.content}</span></td>
                                    <td><span>{moment(comment.createdAt).format("DD/MM/YYYY HH:mm:ss")}</span></td>
                                    <td><span>{moment(comment.updatedAt).format("DD/MM/YYYY HH:mm:ss")}</span></td>
                                    <td>
                                    <img
                                        style={{cursor: 'pointer'}}
                                        src={EditIcon}
                                        alt='edit-icon'
                                        onClick={() => window.location.href = `comments/${comment.id}`}
                                        className='dashboard-content-icon' />  
                                    </td>
                                    <td>
                                    <img
                                        style={{cursor: 'pointer'}}
                                        src={DeleteIcon}
                                        alt='delete-icon'
                                        onClick={deleteComment(comment.id)}
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

export default Comments;