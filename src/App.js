import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import React, { useEffect, useState } from 'react';
import aws_exports from './aws-exports';
import { createNote } from './graphql/mutations';
import { listNotes } from './graphql/queries';

Amplify.configure(aws_exports);

const App = () => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState('');

  useEffect(() => {
    handleListNotes();
  }, []);

  const handleListNotes = async () => {
    const { data } = await API.graphql(graphqlOperation(listNotes));
    console.log(data);
    setNotes(data.listNotes.items);
  };

  const handleAddNote = async event => {
    event.preventDefault();
    const payload = { note };
    const { data } = await API.graphql(
      graphqlOperation(createNote, { input: payload })
    );
    const newNote = data.createNote;
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    setNote('');
  };

  return (
    <div className="flex flex-column items-center justify-center bg-washed-red pa3">
      <h1 className="code f2">Amplify Notetaker</h1>
      <form className="mb3" onSubmit={handleAddNote}>
        <input
          className="pa2 f4"
          placeholder="Write your Note"
          value={note}
          onChange={({ target }) => setNote(target.value)}
        />
        <button className="pa2 f4">Add</button>
      </form>
      <div>
        {notes.map((item, i) => (
          <div key={item.id} className="flex items-center">
            <li className="list pa1 f3">{item.note}</li>
            <button className="bg-transparent bn f4">
              <span>&times;</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withAuthenticator(App, { includeGreetings: true });
