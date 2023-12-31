import { useDragLayer } from 'react-dnd';
import { MdOutlineMarkEmailRead } from 'react-icons/md';

export const CustomDragLayer = () => {
  const {
    itemType,
    isDragging,
    initialCursorOffset,
    initialFileOffset,
    currentFileOffset,
    item,
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialCursorOffset: monitor.getInitialClientOffset(),
    initialFileOffset: monitor.getInitialSourceClientOffset(),
    currentFileOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles}>
      <div
        style={getItemStyles(
          initialCursorOffset,
          initialFileOffset,
          currentFileOffset
        )}
        className='shadow text-sm px-2 py-2 flex flex-row justify-center items-center w-max gap-2'
      >
        <MdOutlineMarkEmailRead size={18} />
        <div>Move 1 conversation</div>
      </div>
    </div>
  );
};

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

function getItemStyles(initialCursorOffset, initialOffset, currentOffset) {
  if (!initialOffset || !currentOffset || !initialCursorOffset) {
    return {
      display: 'none',
    };
  }

  const x = initialCursorOffset?.x + (currentOffset.x - initialOffset.x);
  const y = initialCursorOffset?.y + (currentOffset.y - initialOffset.y);
  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform,
    WebkitTransform: transform,
    background: 'white',
  };
}
