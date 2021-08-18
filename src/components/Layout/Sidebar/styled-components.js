import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { MAIN_BORDER } from 'constants/ui';

export const GroupAccordion = withStyles({
  root: {
    boxShadow: 'none',
    borderBottom: MAIN_BORDER,
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(Accordion);

export const GroupAccordionSummary = withStyles({
  root: {
    border: 'none',
    paddingLeft: 40,
    minHeight: 60,
    '&$expanded': {
      minHeight: 60,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(AccordionSummary);

export const GroupAccordionDetails = withStyles({
  root: {
    padding: 0,
  },
})(AccordionDetails);
