import BaseWidget from './BaseWidget';

const FigureWidget = ({ targets, children, transforms, onTransform }) => (
  <BaseWidget targets={targets} transforms={transforms} onTransform={onTransform} draggable={true} resizable={true} rotatable={true}>
    {children}
  </BaseWidget>
);

export default FigureWidget;
