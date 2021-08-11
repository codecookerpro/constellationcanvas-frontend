import Box from '@material-ui/core/Box';

import WidgetGroup from './WidgetGroup';

import { WIDGET_GROUPS as widgets } from 'components/WidgetEditor/constants';

export default function ToolboxPanel() {
  return (
    <Box>
      {widgets.map(({ type, label, count, imageType }) => (
        <WidgetGroup key={type} type={type} imageType={imageType} label={label} count={count} />
      ))}
    </Box>
  );
}
