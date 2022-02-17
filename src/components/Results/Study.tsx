import { ReactElement, useState, memo } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Launch as LaunchIcon, Save as SaveIcon } from '@mui/icons-material';
import StudyContact from './StudyContact';
import StudyDetailsButton from './StudyDetailsButton';
import StudyHeader from './StudyHeader';
import { getDetails } from './utils';
import { SaveStudyHandler } from './types';
import UnsaveIcon from './UnsaveIcon';
import { StudyDetailProps } from '.';

type StudyProps = {
  entry: StudyDetailProps;
  handleSaveStudy: SaveStudyHandler;
  isStudySaved: boolean;
};

const Study = ({ entry, handleSaveStudy, isStudySaved }: StudyProps): ReactElement => {
  const [isExpanded, setIsExpanded] = useState(false);
  const details = getDetails(entry);
  const theme = useTheme();
  const isExtraLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));
  const closestFacilities = entry?.closestFacilities || [];

  return (
    <Accordion sx={{ marginBottom: 2 }} onChange={(_event, expanded) => setIsExpanded(expanded)}>
      <StudyHeader
        isExpanded={isExpanded}
        study={entry}
        handleSaveStudy={handleSaveStudy}
        isStudySaved={isStudySaved}
      />

      <AccordionDetails
        sx={{
          border: '5px solid',
          borderColor: isExpanded ? 'common.gray' : 'common.grayLighter',
          borderTop: 'none',
          p: 0,
        }}
      >
        <Stack direction={{ xs: 'column', lg: 'row' }}>
          <Stack flexGrow={1} p={2} sx={{ backgroundColor: 'common.white', maxHeight: '500px', overflowY: 'scroll' }}>
            <TableContainer>
              <Table size={isExtraLargeScreen ? 'medium' : 'small'} stickyHeader={!isExtraLargeScreen}>
                <TableBody>
                  {details.map(({ header, body }, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        display: { xs: 'flex', xl: 'table-row' },
                        flexDirection: { xs: 'column', xl: 'row' },
                        '&:last-child td, &:last-child th': { xl: { border: 0 } },
                        '& td': {
                          xs: { border: 0 },
                          xl: { borderBottom: '1px solid rgba(224, 224, 224, 1)' },
                        },
                      }}
                    >
                      <TableCell
                        variant="head"
                        sx={{
                          textTransform: 'uppercase',
                          textAlign: { xs: 'left', xl: 'right' },
                          verticalAlign: 'top',
                        }}
                        component="th"
                      >
                        {header}
                      </TableCell>

                      <TableCell sx={{ whiteSpace: 'pre-line' }} component="td">
                        {body}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>

          <Stack p={2} sx={{ backgroundColor: 'common.grayLighter', maxHeight: '500px', overflowY: 'scroll' }}>
            <StudyDetailsButton icon={<LaunchIcon />} text="More info" />
            <StudyDetailsButton
              icon={isStudySaved ? <UnsaveIcon /> : <SaveIcon />}
              text={isStudySaved ? 'Unsave study' : 'Save study'}
              onClick={handleSaveStudy}
            />
            <StudyContact title="Sponsor" contact={entry.sponsor} />
            {entry.contacts.map((contact, index) => (
              <StudyContact title="Contact" contact={contact} key={index} />
            ))}
            <Accordion
              disableGutters
              square
              sx={{
                marginTop: 2,
                '&.MuiAccordion-root': { boxShadow: 'none' },
                '&.MuiAccordion-root:before': { backgroundColor: 'unset' },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`study-${entry.trialId}-content`}
                id={`study-${entry.trialId}-header`}
                sx={{ '&.MuiAccordionSummary-root': { m: 0, flexDirection: 'row' } }}
              >
                <Typography fontWeight="700" sx={{ textTransform: 'uppercase' }}>
                  Closest Facilities
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ boxShadow: 'inset 0px 1px 0px 0px rgb(0 0 0 / 20%)' }}>
                {closestFacilities.map((closestFacility, index) => (
                  <StudyContact title={`Facility ${index + 1}`} contact={closestFacility} key={index} />
                ))}
              </AccordionDetails>
            </Accordion>
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(
  Study,
  (prevProps: StudyProps, nextProps: StudyProps) => prevProps.isStudySaved === nextProps.isStudySaved
);
