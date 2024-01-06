import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Box, Stack, HStack, Divider, FormLabel, Button, FormControl, Input, Image, Heading, Text, Link, Container, Flex, Spacer, Checkbox } from '@chakra-ui/react';
import MultiwovenLogo from '../../assets/images/multiwoven-logo.png';
import MultiwovenIcon from '../../assets/images/icon.png';
import AlertPopUp, { alertMessage } from '@/components/Alerts/Alerts';
import { login } from '@/services/login';
import Cookies from 'js-cookie';
import { GoogleIcon } from './providerIcon'

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});


const Login = () => {
  let message = alertMessage;
  const [messages, setMessages] = useState({
    show: false,
    alertMessage: message
  });

  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    setSubmitting(true)

    const result = await login(values);
    if (result.success) {
      const token = result?.response?.data?.token;
      Cookies.set('authToken', token);
      setSubmitting(false);
      navigate('/');
    } else {
      message = {
        status: 'error',
        description: [result?.error?.message]
      };
      setMessages({ show: true, alertMessage: message });
      setSubmitting(false);
    }
  };

  return (

    // <Container display='flex' flexDir='column' justifyContent='center' maxW='650' minH='100vh' className='flex flex-col align-center justify-center'>
    //     <div className='top_side_back'></div>
    //     <div className='bottom_side_back'></div>
    //     <Box width='100%' className="flex min-h-full flex-1 flex-col align-center justify-center py-12 sm:px-6 lg:px-8">
    //         <Box display='flex' justifyContent='center' className="sm:mx-auto sm:w-full sm:max-w-sm">
    //             <Image
    //                 maxW="300px"
    //                 w="95%"
    //                 src={MultiwovenLogo}
    //                 alt="Multiwoven"
    //             />
    //         </Box>
    //         <Box mt="14" className="sm:mx-auto sm:w-full sm:max-w-[480px]">
    //             <Box bg="white" border='1px' borderColor="border" px="24" py="12" rounded="lg" className="sm:px-12">
    //                 <Heading fontSize='40px' as="h2" mt="0" mb='10' fontWeight="normal" textAlign="center" >
    //                     Log in to your account
    //                 </Heading>
    //                 {messages.show ? <AlertPopUp {...messages.alertMessage} /> : <></>}
    //                 <Formik
    //                     initialValues={{ email: '', password: '' }}
    //                     onSubmit={(values) => handleSubmit(values)}
    //                     validationSchema={LoginSchema}
    //                 >
    //                     {({ getFieldProps, touched, errors }) => (
    //                         <Form>
    //                             <FormControl mb='24px' id="email" isInvalid={!!(touched.email && errors.email)}>
    //                                 <Input variant='outline' placeholder='Email' {...getFieldProps('email')} />
    //                                 <ErrorMessage name='email' />
    //                             </FormControl>

    //                             <FormControl mb='24px' id="password" isInvalid={!!(touched.password && errors.password)}>
    //                                 <Input type="password" placeholder='Password' {...getFieldProps('password')} />
    //                                 <ErrorMessage name='password' />
    //                             </FormControl>

    //                             <Button isLoading={submitting} loadingText="Logging In" type="submit" background="secondary" color='white' width="full" _hover={{ background: "secondary" }}>
    //                                 Login
    //                             </Button>
    //                         </Form>
    //                     )}
    //                 </Formik>
    //                 <Box width='100%' className="flex min-h-full flex-1 flex-col align-center justify-center py-12 sm:px-6 lg:px-8">
    //                     <Flex paddingBottom='5' borderBottom='1px' borderColor='border'>
    //                         <Text mt="4" textAlign="left" fontSize="sm" color="black">
    //                             <Checkbox size='md' colorScheme='blue'>
    //                                 Remember me
    //                             </Checkbox>
    //                         </Text>
    //                         <Spacer />
    //                         <Text mt="4" textAlign="right" fontSize="sm" color="gray.500">
    //                             <Link fontWeight="500" as={RouterLink} to="/login" color="hyperlink" _hover={{ color: 'hyperlink' }}>
    //                                 Forgot password
    //                             </Link>
    //                         </Text>
    //                     </Flex>
    //                     <Text display='flex' mt="5" textAlign="left" fontSize="sm" color="gray.500">
    //                         Don't have an account?
    //                         <Link ml='1' as={RouterLink} to="/sign-up" color="hyperlink" _hover={{ color: 'hyperlink' }}>
    //                             Sign Up
    //                         </Link>
    //                     </Text>
    //                 </Box>
    //             </Box>
    //         </Box>
    //     </Box>

    // </Container>
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6" alignItems={'center'}>
          <img src={MultiwovenIcon} width={55} />
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'xs', md: 'sm' }}>Log in to your account</Heading>
            <Text color="fg.muted">
              Don't have an account? <Link href="#">Sign up</Link>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: 'bg.surface' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input id="password" placeholder="********" type="password" />
              </FormControl>
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Button variant="text" size="sm">
                Forgot password?
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button>Sign in</Button>
              <HStack>
                <Divider />
                <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                  or continue with
                </Text>
                <Divider />
              </HStack>
              <Button variant="secondary" leftIcon={<GoogleIcon />}>
                Sign in with Google
              </Button>
              {/* <OAuthButtonGroup /> */}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>

  )
}

export default Login;