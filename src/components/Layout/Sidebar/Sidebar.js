import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import GroupBox from './GroupBox';
import { GroupAccordion, GroupAccordionSummary, GroupAccordionDetails } from './styled-components';

import { SIDEBAR_ITEMS } from '../constants';
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

export default function Sidebar(props) {
  const classes = useStyles();
  const role = useSelector((state) => state.auth.profile?.role);
  const { pathname } = useLocation();

  return (
    <>
      {SIDEBAR_ITEMS.filter((item) => item.role.includes(role)).map((item) => {
        const Panel = item.component;

        if (!Panel) {
          return <GroupBox key={item.title} title={item.title} path={item.path} />;
        }

        return (
          <GroupAccordion key={item.title} defaultExpanded={pathname === LINKS.board}>
            <GroupAccordionSummary expandIcon={<ExpandMoreIcon className={classes.expand} />}>
              <Typography className={classes.group}>{item.title}</Typography>
            </GroupAccordionSummary>
            <GroupAccordionDetails>
              <Panel />
            </GroupAccordionDetails>
          </GroupAccordion>
        );
      })}
    </>
  );
}
