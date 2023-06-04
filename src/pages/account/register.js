import React, { useEffect } from 'react'
import { useForm } from '@mantine/form'
import {
  TextInput,
  NumberInput,
  PasswordInput,
  Button,
  Box,
  Divider,
} from '@mantine/core'
import { useNavigate } from 'react-router-dom'

import './login.css'

function Register({ logged, setLogged }) {
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
    initialValues: { name: '', surname: '', email: '', confirmPassword: '' },

    validate: {
      name: (value) =>
        value.length < 2 ? 'Il nome deve avere almeno 2 lettere!' : null,
      surname: (value) =>
        value.length < 2 ? 'Il cognome deve avere almeno 2 lettere!' : null,
      email: validateEmail,
      confirmPassword: (value, values) =>
        value !== values.password ? 'Le passwords non corrispondono!' : null,
    },
  })

  return (
    <Box maw={320}>
      <form onSubmit={form.onSubmit(console.log)}>
        <TextInput
          label='Nome'
          placeholder='Nome'
          className='input-margin-top'
          {...form.getInputProps('name')}
        />
        <TextInput
          label='Cognome'
          placeholder='Cognome'
          className='input-margin-top'
          {...form.getInputProps('surname')}
        />
        <NumberInput
          mt='sm'
          label='Età'
          placeholder='Età'
          min={0}
          max={126}
          className='input-margin-top'
        />

        <Divider my='sm' style={{ marginTop: '20px' }} />

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
          {...form.getInputProps('password')}
        />
        <PasswordInput
          mt='sm'
          label='Confirm password'
          placeholder='Confirm password'
          className='input-margin-top'
          {...form.getInputProps('confirmPassword')}
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

export default Register
