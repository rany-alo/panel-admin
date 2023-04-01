import React, {useState} from 'react';
import axios from "axios";
import DashboardHeader from '../../components/DashboardHeader';
import '../styles.css';
import Pagination from '../../components/Pagination/index';
import DeleteIcon from '../../assets/icons/delete.png';
import EditIcon from '../../assets/icons/edit.png';
import { getJwtToken } from '../../api/axios';
import moment from 'moment';


function Articles () {
    const [articles, setArticles] = useState('');
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const maxItems = 5;

    getJwtToken();
    const fetchData = async () => {
        try {
            const {data} = await axios.get(`/articles?_page=${page}`);
            setArticles(data);
            setTotalItems(data['hydra:totalItems']);
        } catch (error) {
            window.alert(error.response.data['hydra:description']);
        }
    }
    const deleteArticle = (id) => async () => {
        try {
            await axios.delete(`/articleDelete/${id}`);
            fetchData();
        } catch (error) {
            window.alert(error.response.data['hydra:description']);
        }
    }


    return(
        <div className='dashboard-content'>
            <DashboardHeader
                btnText="New Article" 
                onClick={() => window.location.href = `articles/add`}/>

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Articles List</h2>
                </div>

                <table>
                    <thead>
                        <td>Title</td>
                        <td>Content</td>
                        <td>Created At</td>
                        <td>Updated At</td>
                    </thead>
                    {articles ?
                        <tbody>
                            {articles['hydra:member'].map((article, index) => (
                                <tr key={index}>
                                    <td><span>{article.title}</span></td>
                                    <td><span>{article.content}</span></td>
                                    <td><span>{moment(article.createdAt).format("DD/MM/YYYY HH:mm:ss")}</span></td>
                                    <td><span>{moment(article.updatedAt).format("DD/MM/YYYY HH:mm:ss")}</span></td>
                                    <td>
                                    <img
                                        style={{cursor: 'pointer'}}
                                        src={EditIcon}
                                        alt='edit-icon'
                                        onClick={() => window.location.href = `articles/${article.id}`}
                                        className='dashboard-content-icon' />  
                                    </td>
                                    <td>
                                    <img
                                        style={{cursor: 'pointer'}}
                                        src={DeleteIcon}
                                        alt='delete-icon'
                                        onClick={deleteArticle(article.id)}
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

export default Articles;