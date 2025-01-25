import { Publisher } from '@lbp/front-end';

const publisher = new Publisher('http://localhost:3000');

function App() {
  const handleClick = () => {
    publisher.sendLog('12222', {
      name: 'expose',
      userId: '123',
    });
  };

  return (
    <div>
      <button onClick={handleClick}>click</button>
    </div>
  );
}

export default App;
