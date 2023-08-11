import React, { useEffect } from 'react'

import { useForm } from '@mantine/form'
import { PasswordInput, TextInput, Button, Box } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

import './login.css'

function Login({ logged, setLogged }) {
  const navigate = useNavigate()

  function handleSubmitClick() {
    setTimeout(() => {
      setLogged(true)
    }, 2000)
  }

  useEffect(() => {
    if (logged) {
      setTimeout(() => {
        navigate('/account')
      }, 1)
    }
  }, [logged, navigate])

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Mail non valida!'
    }
    const parts = value.split('@')
    if (parts.length !== 2) {
      return 'Mail non valida!'
    }
    const domain = parts[1]
    if (domain.includes('.') && domain.split('.').length < 2) {
      return 'Dominio mail non valido!'
    }
    return undefined
  }

  const form = useForm({
    validateInputOnChange: true,
    initialValues: { email: '' },

    validate: {
      email: validateEmail,
    },
  })

  return (
    <Box maw={320}>
      <form onSubmit={form.onSubmit(console.log)}>
        <TextInput
          mt='sm'
          label='Email'
          placeholder='Email'
          className='input-margin-top'
          {...form.getInputProps('email')}
        />
        <PasswordInput
          label='Password'
          placeholder='Password'
          className='input-margin-top'
        />
        <div className='input-center input-margin-top'>
          <Button type='submit' mt='sm' onClick={() => handleSubmitClick()}>
            Accedi
          </Button>
        </div>
      </form>
    </Box>
  )
}

export default Login
