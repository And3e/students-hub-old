import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useEffect } from 'react'

7

/* imgs */
import logo_scritta from './../img/logos/logo-scritta-tr.png'
import logo from './../img/logos/logo-tr.png'

/* logos */
import { BellFill } from 'react-bootstrap-icons'

function MainNav() {
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 991) {
        document.querySelector('.logo-scritta').style.display = 'none'
        document.querySelector('.logo').style.display = 'initial'
      } else {
        document.querySelector('.logo-scritta').style.display = 'initial'
        document.querySelector('.logo').style.display = 'none'
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Navbar bg='light' expand='lg'>
      <Container fluid>
        <Navbar.Brand href='#home' className='logo-scritta'>
          <img
            src={logo_scritta}
            height='30'
            className='d-inline-block align-center'
            alt='Students Hub logo'
          />
        </Navbar.Brand>
        <Container fluid className='navbar-container'>
          <Navbar.Toggle className='ml' height='30' />
          <Navbar.Collapse>
            <Form className='d-flex'>
              <Form.Control
                type='search'
                placeholder='Cerca qualcosa...'
                className='me-2'
                aria-label='Cerca qualcosa...'
              />
              <Button variant='outline-primary'>Cerca</Button>
            </Form>
          </Navbar.Collapse>
          <Navbar.Brand href='#home' className='logo'>
            <img
              src={logo}
              height='30'
              className='d-inline-block align-center'
              alt='Students Hub logo'
            />
          </Navbar.Brand>
          <Nav
            className='my-2 my-lg-0'
            style={{ maxHeight: '100px' }}
            navbarScroll>
            <Button width='30px'>
              <BellFill />
            </Button>
          </Nav>
        </Container>
      </Container>
    </Navbar>
  )
}

export default MainNav
