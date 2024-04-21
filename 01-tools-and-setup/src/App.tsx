import './App.css';

import { Button, Text } from './ui';

function App() {
  return (
    <>
      <Text className="text-xl">Text component</Text>
      <Button onClick={() => alert('Hey blue!')}>Blue</Button>
      <Button
        className="bg-green-500 hover:bg-green-400"
        onClick={() => alert('Hey green!')}
      >
        Green
      </Button>
      <Button
        className="text-md bg-red-500 px-5 py-2 hover:bg-red-400"
        onClick={() => alert('Hey red!')}
      >
        Red
      </Button>
      <Button onClick={() => alert('disabled button')} disabled>
        Red
      </Button>
    </>
  );
}

export default App;
