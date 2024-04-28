import ComponentsGenerator from './components/ComponentsGenerator/ComponentsGenerator';
import { Button, Header, Text } from './ui';

function App() {
  return (
    <>
      {/* <Text className="text-xl">Text component</Text>
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
        Disabled
      </Button>
      <Header headingLevel="h1">h1 header</Header>
      <Header headingLevel="h2">h2 header</Header>
      <Header headingLevel="h4">h4 header</Header> */}
      <ComponentsGenerator />
    </>
  );
}

export default App;
