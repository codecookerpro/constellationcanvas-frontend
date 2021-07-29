import { memo } from 'react';
import SplitPane from 'react-split-pane';
import WidgetStage from './WidgetStage';
import WidgetEntrance from './WidgetEntrance';

export default memo(() => {
  return (
    <SplitPane split="vertical" minSize={250}>
      <WidgetEntrance />
      <WidgetStage />
    </SplitPane>
  );
});
