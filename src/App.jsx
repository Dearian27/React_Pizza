import { useState, useEffect } from 'react';
import Header from './components/Header'
import Categories from './components/Categories'
import Sort from './components/Sort'
import PizzaBlock from './components/PizzaBlock/PizzaBlock';
import './scss/app.scss';
import { Fragment } from 'react';



function App() {

  const [items, setItems] = useState([])
  
  useEffect(() => {
    fetch('https://631e26c4cc652771a4926184.mockapi.io/mock/pizzas')
    .then(res => res.json())
    .then(array => {
      setItems(array)
    })
  }, []);

  return (  
    <Fragment>
      <div className="wrapper">
        <Header/>
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories/>
              <Sort/>
            </div>
            <h2 className="content__title">Всі піци</h2>
            <div className="content__items">
              {items.map(obj => {
                return <PizzaBlock key={obj.id} types={obj.types} sizes={obj.sizes} img={obj.imageUrl} rating={4} category={0} name={obj.name} price={obj.price} />
              })}
            
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default App;
