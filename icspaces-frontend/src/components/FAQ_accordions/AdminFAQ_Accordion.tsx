import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Import the ExpandMoreIcon component from the appropriate package

const StyledExpandMoreIcon = styled(ExpandMoreIcon)(({ theme }) => ({
  "&:hover": {
    color: theme.palette.secondary.main,
  },
}));

const AdminFAQ_Accordion: React.FC = () => {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Accordion>
          <AccordionSummary
            expandIcon={<StyledExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography fontWeight="bold">ADMIN FAQ 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography fontWeight="bold">ADMIN FAQ 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Dummy FAQ Content</Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};
export default AdminFAQ_Accordion;
