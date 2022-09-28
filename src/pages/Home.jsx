import {React, useContext, useRef, useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import  axios  from 'axios'
import qs from 'qs'
import { fetchPizzas } from '../redux/slices/pizzaSlice'
import { setCategoryId, setCurrentPage, setQuery } from '../redux/slices/filterSlice'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/skeleton'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'

import { useNavigate } from 'react-router-dom'
import { list as sortList } from '../components/Sort'



const Home = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {categoryId, sort, currentPage} = useSelector(state => state.filter)
  const items = useSelector(state => state.pizza.items)
  console.log(items)
  const isSearch = useRef(false)
  const isMounted = useRef(false)
  const {searchValue} = useContext(SearchContext)

  const [isLoading, setIsLoading] = useState(true)

  const getPizzas = async () => {
    setIsLoading(true)
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sort.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    
    try {
      dispatch(fetchPizzas({
        order,
        sortBy,
        category,
        currentPage
      }))
    }
    catch(error) {
      console.log(error);
      alert('Сталася помилка при отриманні піц!')
    }
    finally {
      setIsLoading(false)
    }
    
  }

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }


  useEffect(() => {
    if(!isSearch.current) {
      getPizzas()
    }
    isSearch.current = false

  }, [categoryId, sort.sortProperty, searchValue, currentPage]);



  useEffect(() => {
    if(isMounted.current) {
      const queryString = qs.stringify({
      categoryId: categoryId,
      sortProperty: sort.sortProperty,
      currentPage: currentPage,
      }, {addQueryPrefix: true})
      navigate(queryString)
    }
    
    isMounted.current = true
  }, [categoryId, sort, currentPage, navigate])



  useEffect(() => {
    if(!window.location.search === '' && window.location.search && !isSearch) {
      const params = qs.parse(window.location.search.substring(1))
      console.log(params)
      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)
      dispatch(
        setQuery({
          categoryId,
          currentPage,
          sort,
        })
      )
      fetchPizzas()
       isSearch.current = true

    }
  }, [])

  console.log(items)
  const pizzas = items.filter(obj => { 
    if(obj.name.toLowerCase().includes(searchValue.toLowerCase()))
      return true
    else
      return false
  }).map(obj =>  <PizzaBlock  key={obj.id} {...obj} />);
  
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

  return(
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Всі піци</h2>
      <div className="content__items">
          {isLoading 
            ? skeletons
            : pizzas
          }
      </div>
      <Pagination value={currentPage} onChangePage={onChangePage}/>
    </>
  )
}

export default Home