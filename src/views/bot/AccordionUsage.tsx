import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

export default function AccordionUsage({res}) {
  return (
    <div>
      {res?.map(val=>{
        return(
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
        Q:  {val.question}
        </AccordionSummary>
        <AccordionDetails>
        A:  {val.answer}
        </AccordionDetails>
      </Accordion>
        )
      })}
      
    </div>
  );
}
