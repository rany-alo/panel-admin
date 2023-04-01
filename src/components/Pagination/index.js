import { useState, useEffect } from 'react';
import { CaretLeftOutlined, CaretRightOutlined , ForwardOutlined, BackwardOutlined} from '@ant-design/icons';
import './styles.css';  

export default function Pagination({ fetchData, page, setPage, totalItems, maxItems }) {
  const [next, setNext] = useState(false);
  const [previous, setPrevious] = useState(true);
  const pagesNom = Math.ceil(totalItems / maxItems);

  useEffect(() => {
    fetchData();
    setNext(false);
    setPrevious(false);
    pageCheck(page);
  }, [totalItems, page]);

  const pageCheck = (page) => {
    if (page === pagesNom) {
      setPage(pagesNom);
      setNext(true);
    }
    if (page === 1) {
      setPrevious(true);
    }
  };

  return (
    <div className='paginationContainer' >
      <button
        className='btnPagination'
        onClick={() => {
          setPage(1);
        }}
        disabled={previous}
      >
        <BackwardOutlined />
      </button>

      <button
        className='btnPagination' 
        onClick={() => {
          setPage(page - 1);
        }}
        disabled={previous}
      >
        <CaretLeftOutlined />
      </button>
     
      <button
        className='btnPagination'
      > 
        {page}
      </button>

      <button
        className='btnPagination'
        onClick={() => {
          setPage(page + 1);
        }}
        disabled={next}
      >

        <CaretRightOutlined />
      </button>
      <button
        className='btnPagination'
        onClick={() => {
          setPage(pagesNom);
        }}
        disabled={next}
      >
        <ForwardOutlined />
      </button>
    </div>
  );
}
