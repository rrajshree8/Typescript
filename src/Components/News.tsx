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
  Image
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
    mt={10}
    flexDirection="row"
    justifyContent='center'
    >
      <Container w="100%" h="100%" mr={0}>
      <Image
    src='https://img.freepik.com/free-photo/collage-finance-banner-concept_23-2150608844.jpg?w=2000&t=st=1710488809~exp=1710489409~hmac=08deffa2a917f846fe16024842d5effdad322da842ba394b2f5f0df420f0f009'
    alt="News Letter"
   
  />

      </Container>
      <Container
     
        >
        <Heading
          as={'h2'}
          fontSize={{ base: 'xl', sm: '2xl' }}
          textAlign={'center'}
          mb={5}>
          Sign Up For Email
        </Heading>
        
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
          <Text mt={2} textAlign={'center'} color={error ? 'red.500' : 'gray.500'}>
          {error
            ? 'Please try again later.'
            : "You won't receive any spam!"}
        </Text>
          <FormControl w={{ base: '100%', md: '40%' }}>
            <Button
            mt={4}
            alignItems={"center"}
            justifyContent={"center"}
              colorScheme={state === 'success' ? 'green' : 'blue'}
              isLoading={state === 'submitting'}
              w="100%"
              type={state === 'success' ? 'button' : 'submit'}>
              {state === 'success' ? <CheckIcon /> : 'Submit'}
            </Button>
          </FormControl>
     
        
      </Container>
    </Flex>
  )
}