import React, { useState, useRef, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './search-side.css'

function SearchSide() {
  const [isOpen, setIsOpen] = useState(false)
  const input = useRef(null)

  function handleFocus() {
    setIsOpen(true)
    input.current.focus()
    document.querySelector('.side-input-container').style.width = '95%'
  }

  function handleClick() {
    handleFocus()
  }

  function handleBlur() {
    const windowWidth = window.innerWidth
    if (windowWidth < 767) {
      if (input.current.value.trim() === '') {
        setIsOpen(true)
      }
    }
  }

  useEffect(() => {
    function handleResize() {
      const windowWidth = window.innerWidth
      setIsOpen(true)

      if (windowWidth < 767) {
        document.querySelector('.side-search-container').style.display =
          'initial'
      } else {
        document.querySelector('.side-search-container').style.display = 'none'
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className='side-search-container'>
      <Form className='d-flex'>
        <div
          className={`side-search-box ${isOpen ? 'expanded' : ''}`}
          onClick={handleClick}>
          <div className='side-input-container'>
            <input
              type='search'
              placeholder='Cerca qualcosa...'
              aria-label='Cerca qualcosa...'
              onFocus={() => setIsOpen(true)}
              onBlur={handleBlur}
              className='side-search-input'
              ref={input}
            />
          </div>
        </div>
        <Button variant='primary' className='btn-submit' type='submit'>
          Cerca
        </Button>
      </Form>
    </div>
  )
}

export default SearchSide
