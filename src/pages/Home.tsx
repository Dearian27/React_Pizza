import { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import qs from 'qs'
import { fetchPizzas, pizzaDataSelector } from '../redux/slices/pizzaSlice'
import { filterSelector, setCategoryId, setCurrentPage, setQuery } from '../redux/slices/filterSlice'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/skeleton'
import Pagination from '../components/Pagination'

import { useNavigate } from 'react-router-dom'
import { sortList } from '../components/Sort'
import { useAppDispatch } from '../redux/store'
// import { sort } from '../redux/slices/filterSlice'
//? type fixMe = any;



const Home: React.FC = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()


  const [isSearch, setIsSearch] = useState(false)
  const [isMounted, setIsMounted] = useState(false)


  const { categoryId, sort, currentPage, searchValue } = useSelector(filterSelector)
  const { items, status } = useSelector(pizzaDataSelector)



  const getPizzas = async () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sort.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''


    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        currentPage: String(currentPage),
        search
      })
    );
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
    getPizzas()
  }

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id))
    getPizzas()
  }, [categoryId])


  useEffect(() => {
    if (!isMounted) {
      getPizzas()
      setIsMounted(true)
    }
  }, []);




  //! danger
  //? question
  //
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      console.log("params", params);
      console.log("sortList", sortList);
      const newSort = sortList.find(obj => obj.sortProperty === params.sortBy)
      console.log({
        categoryId,
        currentPage,
        newSort,
      })
      dispatch(
        setQuery({
          categoryId,
          currentPage,
          newSort,
        })
      )

      getPizzas();
    }
  }, [searchValue])

  const pizzas = items.filter((obj: any) => {
    if (obj.name.toLowerCase().includes(searchValue.toLowerCase()))
      return true
    else
      return false
  }).map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Всі піци</h2>
      <div className="content__items">
        {
          status === 'error' ?
            <div className="content__error">
              <h2>Виникла помилка 😕</h2>
              <p>На жаль не вдалось отримати піци. Спробуйте перезапустити сайт або завітайте трошки пізніше</p>
            </div>
            : status === 'loading' ?
              skeletons
              : pizzas
        }
      </div>
      <Pagination value={currentPage} onChangePage={onChangePage} />
    </>
  )
}

export default Home