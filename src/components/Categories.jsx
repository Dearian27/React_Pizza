import { useState } from "react"

const Categories = () => {

  const categories = [
    'Всі',  
    'М\'ясні',
    'Вегетеріанські',
    'Гриль',
    'Гострі',
    'Закриті',
  ]
  const [activeIndex, setActiveIndex] = useState(0)

  return(
   <div className="categories">
    <ul>
      {categories.map((el, index) => {
        return <li onClick={() => setActiveIndex(index)} key={index} className={activeIndex === index ? 'active' : ''}>{el}</li>
      })}
    </ul>
  </div>
)}

export default Categories