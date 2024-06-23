import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import Form from '../components/Form';
import FormControl from '../components/FormControl';
import Button from '../components/Button';
import { SIGNUP } from '../queries';
import { useAppContext } from '../appContext';

const Signup = () => {
  const { setCurrentUser } = useAppContext();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupMutation, { loading, error }] = useMutation(SIGNUP);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    signupMutation({
      variables: {
        username,
        password,
      },
      onCompleted({ signup }) {
        setCurrentUser(signup.user);
        localStorage.setItem('currentUser', JSON.stringify(signup.user));
        localStorage.setItem('token', signup.token);
        navigate('/');
      },
    });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#20212c] px-2">
      <Form className="max-w-[500px] flex-1" onSubmit={onSubmitHandler}>
        <Form.Title>Signup</Form.Title>
        <FormControl>
          <FormControl.Label htmlFor="username">Username</FormControl.Label>
          <FormControl.Input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </FormControl>
        <FormControl>
          <FormControl.Label htmlFor="password">Password</FormControl.Label>
          <FormControl.Input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </FormControl>
        <Button $full type="submit" loading={loading}>
          Signup
        </Button>
        <Link
          className="mt-4 block w-full rounded-full bg-white p-4 text-center font-bold text-[#635fc7]"
          to="/login"
        >
          Login
        </Link>
        <div className="my-4 text-center text-red-500">
          {error ? error.message : null}
        </div>
        <em className="text-white">
          Using the free tier of Render and MongoDB, it takes a few minutes to
          spin up.
        </em>
      </Form>
    </div>
  );
};

export { Signup as Component };
