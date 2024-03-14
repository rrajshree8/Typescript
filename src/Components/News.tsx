import { FormEvent, ChangeEvent, useState } from 'react'
import {
  Stack,
  FormControl,
  Input,
  Button,
  useColorModeValue,
  Heading,
  Text,
  Container,
  Flex,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import axios from 'axios'
import { HTTP_URL } from '../utils'

export default function News() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'initial' | 'submitting' | 'success'>('initial')
  const [error, setError] = useState(false)


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(false)
    setState('submitting')


    try {
        await axios.post(`${HTTP_URL}/public/news-subscription`, {
            email: email
        });
      setState('success')
        
    } catch (error) {
        console.error('Error:', error);
        setError(true)
        setState('initial')
        return
    }
    
  }

  return (
    <Flex
      align={'center'}
      justify={'center'}
    >
      <Container
     
        p={6}>
        <Heading
          as={'h2'}
          fontSize={{ base: 'xl', sm: '2xl' }}
          textAlign={'center'}
          mb={5}>
          Subscribe to our Newsletter
        </Heading>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          as={'form'}
          spacing={'12px'}
          onSubmit={handleSubmit}>
          <FormControl>
            <Input
              variant={'solid'}
              borderWidth={1}
              color={'gray.800'}
              _placeholder={{
                color: 'gray.400',
              }}
              borderColor={useColorModeValue('gray.300', 'gray.700')}
              id={'email'}
              type={'email'}
              required
              placeholder={'Your Email'}
              aria-label={'Your Email'}
              value={email}
              disabled={state !== 'initial'}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl w={{ base: '100%', md: '40%' }}>
            <Button
              colorScheme={state === 'success' ? 'green' : 'blue'}
              isLoading={state === 'submitting'}
              w="100%"
              type={state === 'success' ? 'button' : 'submit'}>
              {state === 'success' ? <CheckIcon /> : 'Submit'}
            </Button>
          </FormControl>
        </Stack>
        <Text mt={2} textAlign={'center'} color={error ? 'red.500' : 'gray.500'}>
          {error
            ? 'Please try again later.'
            : "You won't receive any spam!"}
        </Text>
      </Container>
    </Flex>
  )
}
