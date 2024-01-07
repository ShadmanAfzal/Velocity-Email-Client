import { DndProvider } from 'react-dnd';
import { CustomDragLayer } from '../layout/folders/components/customDragLayer';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Folders from '../layout/folders';
import ListEmails from '../layout/list-email';
import MiniPreview from '../layout/mini-preview';

const HomePage = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <CustomDragLayer />
      <div className='flex flex-row'>
        <Folders />
        <ListEmails />
        <MiniPreview />
      </div>
    </DndProvider>
  );
};

export default HomePage;
