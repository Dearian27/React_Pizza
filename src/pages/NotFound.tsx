import React, { Fragment } from 'react'
import NotFoundText from '../components/NotFoundText'

const NotFound: React.FC = () => {
  return (
    <Fragment>
      <NotFoundText />
      <button>Повернутись</button>
    </Fragment>
  )
}

export default NotFound