import cartEmptyImg from '../assets/img/empty-cart.png'
import { Link } from 'react-router-dom'

const CartEmpty = () => {

return (
  <div className="cart cart--empty">
    <h2>Кошик порожній 😕</h2>
    <p>
      Скоріше за вск, ви не замовили ще піцу.<br />
      Для того, щоб замовити піцу, перейдіть на головну сторінку.
    </p>
    <img src={cartEmptyImg} alt="Empty cart" />
    <Link to="/" className="button button--black">
      <span>Повернутись</span>
    </Link>
  </div>
)
}

export default CartEmpty