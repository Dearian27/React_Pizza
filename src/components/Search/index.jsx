import { useRef, useState } from 'react'
import { setSeacrhValue } from '../../redux/slices/filterSlice'
import styles from './Search.module.scss'
import debounce from 'lodash.debounce'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
const Search = () => {
  const dispatch = useDispatch()
  const [saveValue, setSaveValue] = useState('')
  const inputRef = useRef()

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSeacrhValue(str))
    }, 1000)
    , []
  )

  const onChangeInput = (e) => {
    setSaveValue(e.target.value)
    updateSearchValue(e.target.value)
  }

  const onClickClear = () => {
    setSaveValue('')
    dispatch(setSeacrhValue(saveValue))
    inputRef.current.focus();
    console.log(inputRef)
  }

  return (
    <div className={styles.root}>
      <svg className={styles.icon} enableBackground="new 0 0 32 32" id="EditableLine" version="1.1" viewBox="0 0 32 32"><circle cx="14" cy="14" fill="none" id="XMLID_42_" r="9" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" /><line fill="none" id="XMLID_44_" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" x1="27" x2="20.366" y1="27" y2="20.366" /></svg>
      <input ref={inputRef} value={saveValue} onChange={onChangeInput} className={styles.input} placeholder='Пошук піц...' type="text" />
      {saveValue &&
        <svg onClick={onClickClear}
          className={styles.clearIcon}
          xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" width="94.926px" height="94.926px" viewBox="0 0 94.926 94.926"><g><path d="M55.931,47.463L94.306,9.09c0.826-0.827,0.826-2.167,0-2.994L88.833,0.62C88.436,0.224,87.896,0,87.335,0   c-0.562,0-1.101,0.224-1.498,0.62L47.463,38.994L9.089,0.62c-0.795-0.795-2.202-0.794-2.995,0L0.622,6.096   c-0.827,0.827-0.827,2.167,0,2.994l38.374,38.373L0.622,85.836c-0.827,0.827-0.827,2.167,0,2.994l5.473,5.476   c0.397,0.396,0.936,0.62,1.498,0.62s1.1-0.224,1.497-0.62l38.374-38.374l38.374,38.374c0.397,0.396,0.937,0.62,1.498,0.62   s1.101-0.224,1.498-0.62l5.473-5.476c0.826-0.827,0.826-2.167,0-2.994L55.931,47.463z" /></g>
        </svg>
      }
    </div>
  )
}

export default Search