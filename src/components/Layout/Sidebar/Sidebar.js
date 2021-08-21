import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GroupBox from './GroupBox';
import { GroupAccordion, GroupAccordionSummary, GroupAccordionDetails } from './styled-components';
import { SIDEBAR_ITEMS, SIDEBAR_ITEM_TYPES } from '../constants';
import { LINKS } from 'utils/constants';

const useStyles = makeStyles({
  group: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.56,
    textTransform: 'uppercase',
    color: '#624ad7',
  },
  expand: {
    backgroundColor: '#eae6fe',
    color: '#624ad7',
    borderRadius: '8px',
  },
});

export default function Sidebar({ selectedParticipant, profile, users }) {
  const classes = useStyles();
  const { pathname } = useLocation();
  const [items, setItems] = useState(SIDEBAR_ITEMS.filter((item) => item.role.includes(profile.role)).map((item) => ({ ...item, expanded: false })));

  useEffect(() => {
    if (!selectedParticipant || !users.length) {
      return;
    }

    const participant = users.find((u) => u.uuid === selectedParticipant);
    const canvasTitle = profile.uuid !== selectedParticipant ? `${participant.name}'s CANVAS` : 'MY CANVAS';

    setItems(
      items
        .map((item) => ({
          ...item,
          expanded: item.type !== SIDEBAR_ITEM_TYPES.toolbox && pathname === LINKS.board,
        }))
        .map((item) => ({
          ...item,
          title: item.type === SIDEBAR_ITEM_TYPES.canvas ? canvasTitle : item.title,
        }))
    );
    // eslint-disable-next-line
  }, [profile, selectedParticipant, users, pathname]);

  const handleExpandChange = (type, expanded) => {
    setItems(items.map((item) => ({ ...item, expanded: type === item.type ? expanded : item.expanded })));
  };

  return (
    <>
      {items.map((item) =>
        item.component ? (
          <GroupAccordion key={item.title} expanded={item.expanded} onChange={(e, expanded) => handleExpandChange(item.type, expanded)}>
            <GroupAccordionSummary expandIcon={<ExpandMoreIcon className={classes.expand} />}>
              <Typography className={classes.group}>{item.title}</Typography>
            </GroupAccordionSummary>
            <GroupAccordionDetails>
              <item.component />
            </GroupAccordionDetails>
          </GroupAccordion>
        ) : (
          <GroupBox key={item.title} title={item.title} path={item.path} />
        )
      )}
    </>
  );
}
