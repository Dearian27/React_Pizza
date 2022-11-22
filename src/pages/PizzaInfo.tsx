import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface PizzaInfoI {
  imageUrl: string;
  name: string;
  price: number;
}

const PizzaInfo: React.FC = () => {

  const navigate = useNavigate()
  const [pizza, setPizza] = useState<PizzaInfoI>();
  const { id } = useParams();

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get(`https://631e26c4cc652771a4926184.mockapi.io/mock/pizzas/${id}`);
        setPizza(data);
        console.log("data", data)
      } catch (error) {
        alert('щось пішло не так при отриманні піц')
        console.log(error)
        navigate('/')
      }
    }
    fetchPizza();

  }, []);

  if (!pizza) return <>загрузка...</>;

  return (
    <section className="container">
      <div>PizzaInfo</div>
      <img src={pizza.imageUrl} alt="selected pizza" />
      <div>{pizza.name}</div>
      <div>{pizza.price}₴</div>
    </section>
  )
}

export default PizzaInfo;