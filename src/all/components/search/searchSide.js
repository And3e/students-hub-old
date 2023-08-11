import React, { useState, useRef, useEffect } from 'react'
import Form from 'react-bootstrap/Form'

import { Search } from 'react-bootstrap-icons'

import './search-side.css'

function SearchSide({ tema }) {
  const input = useRef(null)
  const [isClicked, setIsClicked] = useState(false)
  const [displaySearchSide, setDisplaySearchSide] = useState('')

  function handleClick() {
    setIsClicked(true)
  }

  useEffect(() => {
    function handleResize() {
      const windowWidth = window.innerWidth

      if (windowWidth < 767) {
        setDisplaySearchSide('')
      } else {
        setDisplaySearchSide('none')
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div
      className='side-search-container'
      style={{ display: displaySearchSide }}>
      <div className='side-search-sub-container'>
        <Form className='d-flex'>
          <div>
            <button
              onClick={handleClick}
              className={`${isClicked ? 'clicked' : ''}`}
              id='btn-submit'
              type='submit'>
              <Search />
            </button>
          </div>
          <div
            className='side-input-container'
            style={{
              backgroundColor: tema === 'dark' ? '#28292e' : '#f5f5f5',
            }}>
            <input
              type='search'
              placeholder='Cerca qualcosa...'
              aria-label='Cerca qualcosa...'
              className='side-search-input'
              ref={input}
            />
          </div>
        </Form>
      </div>
    </div>
  )
}

export default SearchSide
