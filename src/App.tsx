import ChatContainer from './components/Chat/ChatContainer';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Travel Chat Assistant</h1>
        <ChatContainer />
      </div>
    </div>
  );
}

export default App;