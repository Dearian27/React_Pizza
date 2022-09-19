import React, { Fragment } from 'react'

import styles from './NotFoundText.module.scss'

const NotFoundText = () => {
  return(
    <Fragment>
      <h1 className={styles.root}>
        <span className={styles.root}>😕</span>
        <br/>
        Нічого не знайдено
      </h1>
      <p className={styles.description}>На жаль, ця сторінка відсутня на цьому сайті</p>
    </Fragment>
  )
}

export default NotFoundText