import React from 'react';
import { useWhyDidYouUpdate } from 'ahooks'

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


const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => {

  // useWhyDidYouUpdate('Categories', { value, onChangeCategory });

  return (
    <div className="categories">
      <ul>
        {categories.map((el, index) => {
          return <li onClick={() => onChangeCategory(index)} key={index} className={value === index ? 'active' : ''}>{el}</li>
        })}
      </ul>
    </div>
  )
})

export default Categories