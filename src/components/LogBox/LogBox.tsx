interface Props {
  logs: string[];
}

function LogBox({logs}: Props) {
  return (
    <div>
      {logs.map(log => <div>{log}</div>)}
    </div>
  );
}

export default LogBox;
