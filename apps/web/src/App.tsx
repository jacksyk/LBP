import { Log, LogGroup } from '@lbp/front-end';

function App() {
  const handleClick = () => {
    const log = new Log('12222', 'expose', {});
    const logGroup = new LogGroup();
    logGroup.addLog(log);
    logGroup.publish();
  };

  return (
    <div>
      <button onClick={handleClick}>click</button>
    </div>
  );
}

export default App;
