import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { MAIN_BORDER } from 'constants/user-interface';

export const StyledAccordion = withStyles({
  root: {
    boxShadow: 'none',
    borderBottom: MAIN_BORDER,
    '&:first-child': {
      borderTop: MAIN_BORDER,
    },
    '&:last-child': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(Accordion);

export const StyledAccordionSummary = withStyles({
  root: {
    border: 'none',
    paddingLeft: 40,
    minHeight: 40,
    '&$expanded': {
      minHeight: 40,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(AccordionSummary);

export const StyledAccordionDetails = withStyles({
  root: {
    padding: 0,
  },
})(AccordionDetails);
