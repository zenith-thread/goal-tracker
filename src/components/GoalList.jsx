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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function GoalList() {
  const { quarterId } = useParams();
  const navigate = useNavigate();
  const { getQuarter } = useQuarters();
  const quarter = getQuarter(quarterId);
  const { goals, createGoal, deleteGoal, editGoal } = useGoals(quarterId);

  // Local form state
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [deadline, setDeadline] = useState("");

  // Inline edit state
  const [editingId, setEditingId] = useState(null);
  const [eTitle, setETitle] = useState("");
  const [eDesc, setEDesc] = useState("");
  const [eDeadline, setEDeadline] = useState("");

  // Selectors
  const quarterProgress = useSelector((s) =>
    selectQuarterOverallPercent(s, quarterId)
  );
  const goalPercents = useSelector((s) =>
    selectGoalPercentsByQuarter(s, quarterId)
  );

  const handleAdd = () => {
    if (!title || !deadline) return;
    createGoal({
      id: Date.now().toString(),
      quarterId,
      title,
      description: desc,
      deadline,
    });
    setTitle("");
    setDesc("");
    setDeadline("");
  };

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

  if (!quarter)
    return (
      <Container>
        <Typography>Quarter not found</Typography>
      </Container>
    );

  // Helpers to format date to YYYY-MM-DD
  const toIsoDate = (date) =>
    date instanceof Date ? date.toISOString().slice(0, 10) : "";

  // track if user has blurred the date picker at least once
  const [addLocalGoal, setAddLocalGoal] = useState(false);

  // Go to the Individual Goal
  const handleIndividualGoalRoute = (goalId) => {
    navigate(`/goals/${quarterId}/${goalId}`);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="xl" className="py-10">
        <Box className="mb-8">
          <Link component={RouterLink} to="/quarters" underline="none">
            ← Back
          </Link>
        </Box>
        <Box
          mb={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5">{quarter.title}</Typography>
          <Typography
            variant="h5"
            fontSize={16}
            display="flex"
            flexDirection="column"
          >
            <span>Start: {quarter.startDate}</span>
            <span>End: {quarter.endDate}</span>
          </Typography>
          <Typography color="textSecondary">
            {quarterProgress}% Complete
          </Typography>
        </Box>
        {!addLocalGoal && (
          <Button variant="contained" onClick={() => setAddLocalGoal(true)}>
            Add New Goal
          </Button>
        )}

        {/* Add Goal Form */}
        {addLocalGoal && (
          <Card variant="outlined" sx={{ mb: 4, borderRadius: "10px" }}>
            <Box display="flex" justifyContent="space-between" className="px-2">
              <CardHeader title="Add New Goal" />
              <CardHeader
                title="X"
                onClick={() => setAddLocalGoal(false)}
                className="cursor-pointer"
              />
            </Box>
            <CardContent>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Title"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <DatePicker
                    label="Deadline"
                    value={deadline}
                    minDate={new Date(quarter.startDate)}
                    maxDate={new Date(quarter.endDate)}
                    onChange={(newValue) => setDeadline(newValue)}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        error={!!params.error} // Explicitly handle error state
                        helperText={
                          params.error
                            ? "Select a date within the quarter range"
                            : ""
                        }
                      />
                    )}
                    className="w-full"
                  />
                </Grid>
                <Grid className="w-full">
                  <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={2}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                onClick={handleAdd}
                disabled={!title || !deadline}
              >
                Add Goal
              </Button>
            </CardActions>
          </Card>
        )}

        {/* Goals List */}
        <Grid container spacing={3} className="mt-8">
          {goals.map((g, idx) => {
            console.log(`Goal ${idx + 1} ID: ${g.id}`);
            return (
              <Grid
                size={{ xs: 12, sm: 4 }}
                key={g.id}
                onClick={() => handleIndividualGoalRoute(g.id)}
                className="hover:scale-[1.03] cursor-pointer shadow-md hover:shadow-lg transition-all"
              >
                <Card variant="outlined">
                  <CardHeader
                    title={
                      editingId === g.id ? (
                        <TextField
                          fullWidth
                          value={eTitle}
                          onChange={(e) => setETitle(e.target.value)}
                        />
                      ) : (
                        <Typography variant="h6">
                          {g.title} — {goalPercents[g.id]}%
                        </Typography>
                      )
                    }
                    subheader={
                      editingId === g.id ? (
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
                        `Due: ${g.deadline}`
                      )
                    }
                    action={
                      editingId === g.id ? (
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
                          <IconButton onClick={() => startEdit(g)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => deleteGoal(g.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )
                    }
                  />

                  <CardContent>
                    {editingId === g.id ? (
                      <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={2}
                        value={eDesc}
                        onChange={(e) => setEDesc(e.target.value)}
                      />
                    ) : (
                      <Typography>{g.description}</Typography>
                    )}

                    {/* <Box mt={2}>
                    <TacticList goalId={g.id} />
                    <Box mt={2}>
                      <ObstacleList goalId={g.id} />
                    </Box>
                  </Box> */}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </LocalizationProvider>
  );
}
