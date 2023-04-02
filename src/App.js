import React from 'react';
import { Container } from 'react-bootstrap';
import GithubSearch from './GithubSearch';

function App() {
  return (
    <Container className="mt-5 mb-5">
      <h1 className="text-center mb-5">20L-1323 Github User Search</h1>
      <GithubSearch />
    </Container>
  );
}

export default App;
