import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, cartByIdSelector } from '../../redux/slices/cartSlice'

const typeNames = ['тонке', 'традиційне']

interface PizzaBlockProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  rating: number;
}

const PizzaBlock: React.FC<PizzaBlockProps> = (props) => {

  const dispatch = useDispatch()
  const cartItem = useSelector(cartByIdSelector(props.id))
  const addedCount = cartItem ? cartItem.count : 0;


  const [activeType, setActiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)


  const onClickAdd = () => {
    const items = {
      id: props.id,
      name: props.name,
      price: props.price,
      imageUrl: props.imageUrl,
      type: typeNames[activeType],
      size: props.sizes[activeSize],
    }
    dispatch(addProduct(items))
  }

  return (
    <Fragment>
      <div className="pizza-block__wrapper">
        <div className="pizza-block">
          <img
            className="pizza-block__image"
            src={props.imageUrl}
            alt="Pizza"
          />
          <h4 className="pizza-block__title">{props.name}</h4>
          <div className="pizza-block__selector">
            <ul>
              {
                props.types.map(id => {
                  return (
                    <li
                      key={id}
                      onClick={() => setActiveType(id)}
                      className={activeType === id ? 'active' : ''}>
                      {typeNames[id]}</li>
                  )
                })
              }
            </ul>
            <ul>
              {
                props.sizes.map((size, i) => {
                  return (
                    <li
                      key={size}
                      onClick={() => setActiveSize(i)}
                      className={activeSize === i ? 'active' : ''}>
                      {size} см</li>
                  )
                })
              }
            </ul>
          </div>
          <div className="pizza-block__bottom">
            <div className="pizza-block__price">від {props.price} грн</div>
            <button onClick={() => onClickAdd()} className="button button--outline button--add">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                  fill="white"
                />
              </svg>
              <span>Добавити</span>
              {addedCount > 0 && <i>{addedCount}</i>}
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default PizzaBlock