


const Categories = ({ value, onChangeCategory }) => {

  const categories = [
    'Всі',
    'М\'ясні',
    'Вегетеріанські',
    'Гриль',
    'Гострі',
    'Закриті',
  ]


  return (
    <div className="categories">
      <ul>
        {categories.map((el, index) => {
          return <li onClick={() => onChangeCategory(index)} key={index} className={value === index ? 'active' : ''}>{el}</li>
        })}
      </ul>
    </div>
  )
}

export default Categories