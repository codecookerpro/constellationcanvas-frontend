import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { MAIN_BORDER } from 'constants/user-interface';

export const StyledAccordion = withStyles({
  root: {
    boxShadow: 'none',
    borderTop: MAIN_BORDER,
    borderBottom: 'none',
    '&:before': {
      background: 'none',
    },
  },
  expanded: {
    margin: '0 !important',
  },
})(Accordion);

export const StyledAccordionSummary = withStyles({
  root: {
    border: 'none',
    padding: '0 13px 0px 41px',
    minHeight: '60px !important',
  },
  content: {
    margin: 0,
  },
})(AccordionSummary);

export const StyledAccordionDetails = withStyles({
  root: {
    padding: 0,
    flexDirection: 'column',
  },
})(AccordionDetails);
