import MyCanvasPanel from './MyCanvasPanel';
import ParticipantPanel from './ParticipantPanel';
import ToolboxPanel from './ToolboxPanel';

const Sidebar = () => {
  return (
    <div>
      <MyCanvasPanel />
      <ToolboxPanel />
      <ParticipantPanel />
    </div>
  );
};

export default Sidebar;
