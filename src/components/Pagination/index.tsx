import React from 'react'
import ReactPaginate from 'react-paginate'
import { useSelector } from 'react-redux'
import styles from './Pagination.module.scss'

interface PaginationProps {
  value: number;
  onChangePage: any;
}

const Pagination: React.FC<PaginationProps> = ({ onChangePage }) => {

  const { currentPage } = useSelector((state: any) => state.filter)
  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={e => onChangePage(e.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={3}
        // renderOnZeroPageCount={null}
        forcePage={currentPage - 1}
      />
    </>
  )
}

export default Pagination
