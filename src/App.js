import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import React from 'react';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

const App = () => {
  return <div>Hello</div>;
};

export default withAuthenticator(App, { includeGreetings: true });
