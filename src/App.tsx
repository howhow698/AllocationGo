import RoomAllocation from './components/RoomAllocation';

const App = () => {
  return (
    <RoomAllocation
      guest={14}
      room={3}
      onChange={(result) => console.log('result', result)}
    />
  );
};

export default App;
