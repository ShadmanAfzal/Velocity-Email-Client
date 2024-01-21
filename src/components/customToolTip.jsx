import { useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';

export const CustomToolTip = ({ id }) => {
  const { isDark } = useSelector((state) => state.ui);

  return (
    <Tooltip
      id={id}
      opacity='95%'
      style={{
        borderRadius: '5px',
        paddingInline: '4px',
        paddingBlock: '4px',
        backgroundColor: isDark ? '#f9fafb' : '#1F1F1F',
        color: isDark ? 'black' : 'white',
      }}
    />
  );
};
