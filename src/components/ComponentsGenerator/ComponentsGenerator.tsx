import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Button, Header, Text } from '../../ui';

const ComponentsGenerator: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const handleComponentChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedComponent(event.target.value);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Button':
        return <Button onClick={() => console.log('btn click')}>Button</Button>;
      case 'Text':
        return <Text>Text component</Text>;
      case 'Header':
        return <Header headingLevel="h1">Header</Header>;
      default:
        return <span>Choose component</span>;
    }
  };

  const currentComponent = renderComponent();
  const code = ReactDOMServer.renderToString(renderComponent());
  console.log('code ', code);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
  };

  return (
    <div className="p-4">
      <select value={selectedComponent} onChange={handleComponentChange}>
        <option value="">Select a component</option>
        <option value="Button">Button</option>
        <option value="Text">Text</option>
        <option value="Header">Header</option>
      </select>
      <div className="p-3">{currentComponent}</div>
      {selectedComponent && (
        <div className="p-3">
          <Text>Code: </Text>
          <div>
            <pre className="max-w-full text-wrap p-2">{code}</pre>
            <Button
              className={copied ? 'bg-green-500' : 'bg-blue-500'}
              onClick={handleCopyCode}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComponentsGenerator;
