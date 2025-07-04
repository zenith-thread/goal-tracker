import React, { useState } from "react";
import { Link as RouterLink, useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useQuarters } from "../hooks/useQuarters";
import { useGoals } from "../hooks/useGoals";
import TacticList from "./TacticList";
import ObstacleList from "./ObstacleList";
import { selectQuarterOverallPercent } from "../store/quarters/quartersProgressSelectors";
import { selectGoalPercentsByQuarter } from "../store/goals/progressSelectors";

import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Link,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Date-picker
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function IndividualGoal() {
  const navigate = useNavigate();
  const { quarterId } = useParams();
  const { goalId } = useParams();
  const { getQuarter } = useQuarters();
  const { getGoal } = useGoals();

  const goal = getGoal(goalId);
  const quarter = getQuarter(quarterId);

  const { deleteGoal, editGoal } = useGoals(quarterId);

  // Inline edit state
  const [editingId, setEditingId] = useState(null);
  const [eTitle, setETitle] = useState("");
  const [eDesc, setEDesc] = useState("");
  const [eDeadline, setEDeadline] = useState("");

  // Selectors

  const goalPercents = useSelector((s) =>
    selectGoalPercentsByQuarter(s, quarterId)
  );

  const startEdit = (g) => {
    setEditingId(g.id);
    setETitle(g.title);
    setEDesc(g.description || "");
    setEDeadline(g.deadline);
  };

  const saveEdit = () => {
    if (!eTitle || !eDeadline) return;
    if (eDeadline < quarter.startDate || eDeadline > quarter.endDate) {
      alert(
        `Deadline must be between ${quarter.startDate} and ${quarter.endDate}`
      );
      return;
    }
    editGoal({
      id: editingId,
      changes: {
        title: eTitle,
        description: eDesc,
        deadline: eDeadline,
      },
    });
    setEditingId(null);
  };

  if (!goal)
    return (
      <Container>
        <Typography>Goal not found</Typography>
      </Container>
    );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="xl" className="py-10">
        <Box className="mb-8">
          <Link
            component={RouterLink}
            to={`/quarters/${quarterId}`}
            underline="none"
          >
            ← Back
          </Link>
        </Box>

        {/* Goals List */}
        <Grid container spacing={3} className="mt-8">
          <Grid size={{ xs: 12, sm: 4 }} key={goal.id}>
            <Card variant="outlined">
              <CardHeader
                title={
                  editingId === goal.id ? (
                    <TextField
                      fullWidth
                      value={eTitle}
                      onChange={(e) => setETitle(e.target.value)}
                    />
                  ) : (
                    <Typography variant="h6">
                      {goal.title} — {goalPercents[goal.id]}%
                    </Typography>
                  )
                }
                subheader={
                  editingId === goal.id ? (
                    <TextField
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      inputProps={{
                        min: quarter.startDate,
                        max: quarter.endDate,
                      }}
                      value={eDeadline}
                      onChange={(e) => setEDeadline(e.target.value)}
                    />
                  ) : (
                    `Due: ${goal.deadline}`
                  )
                }
                action={
                  editingId === goal.id ? (
                    <>
                      <IconButton onClick={saveEdit} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => setEditingId(null)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={() => startEdit(goal)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          deleteGoal(goal.id);
                          navigate(`/quarters/${quarterId}`);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )
                }
              />

              <CardContent>
                {editingId === goal.id ? (
                  <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={2}
                    value={eDesc}
                    onChange={(e) => setEDesc(e.target.value)}
                  />
                ) : (
                  <Typography>{goal.description}</Typography>
                )}

                <Box mt={2}>
                  <TacticList goalId={goal.id} />
                  <Box mt={2}>
                    <ObstacleList goalId={goal.id} />
                  </Box>
                </Box>
              </CardContent>
              {editingId === goal.id && (
                <CardActions>
                  <Button variant="contained" onClick={saveEdit}>
                    Save
                  </Button>
                  <Button onClick={() => setEditingId(null)}>Cancel</Button>
                </CardActions>
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </LocalizationProvider>
  );
}
