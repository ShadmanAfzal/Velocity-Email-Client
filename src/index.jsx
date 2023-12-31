import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { usePreview } from 'react-dnd-preview';
import { CustomDragLayer } from './layout/folders/components/customDragLayer.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

const MyPreview = () => {
  const preview = usePreview();
  if (!preview.display) {
    return null;
  }

  const { itemType, item, style } = preview;
  return (
    <div className="" style={style}>
      {itemType}
    </div>
  );
};

root.render(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <CustomDragLayer />
      <App />
    </DndProvider>
  </Provider>,
);
