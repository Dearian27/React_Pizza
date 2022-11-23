import React from 'react';

interface CategoriesProps {
  value: number;
  onChangeCategory: (id: number) => void;
}

const categories: Array<string> = [
  'Всі',
  'М\'ясні',
  'Вегетеріанські',
  'Гриль',
  'Гострі',
  'Закриті',
]

const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {


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