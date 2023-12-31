import Folders from './layout/folders/index.jsx';
import ListEmails from './layout/list-email/index.jsx';
import MiniPreview from './layout/mini-preview/index.jsx';
import NavBar from './layout/navbar/index.jsx';
import './styles.css';

const App = () => {
  return (
    <div className='h-screen overflow-y-hidden text-sm'>
      <NavBar />
      <div className='flex flex-row'>
        <Folders />
        <ListEmails />
        <MiniPreview />
      </div>
    </div>
  );
};

export default App;
