// src/components/QuartersPage.jsx

import React, { useState } from "react";
import { Link as RouterLink } from "react-router";
import {
  Container,
  Box,
  Typography,
  Grid,
  MenuItem,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuarters } from "../hooks/useQuarters";

const QuarterList = () => {
  const {
    quarters,
    createQuarter,
    deleteQuarter,
    editQuarter,
    // we still need getByYear for disabling options
    getByYear,
  } = useQuarters();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear + i);

  const [year, setYear] = useState(currentYear);
  const [qtr, setQtr] = useState(1);

  const [editingQuarterId, setEditingQuarterId] = useState(null);
  const [editYear, setEditYear] = useState(currentYear);
  const [editQtr, setEditQtr] = useState(1);

  const usedQs = (getByYear(year) || []).map((q) => q.qtr);

  const handleAdd = () => {
    if (!usedQs.includes(qtr)) createQuarter({ year, qtr });
  };

  const handleSaveEdit = (q) => {
    // collision check
    const exists = quarters.some(
      (x) => x.year === editYear && x.qtr === editQtr && x.id !== q.id
    );
    if (exists) {
      alert("That quarter already exists");
      return;
    }
    // ranges to dates
    const ranges = {
      1: ["01-01", "03-31"],
      2: ["04-01", "06-30"],
      3: ["07-01", "09-30"],
      4: ["10-01", "12-31"],
    };
    const [startSuffix, endSuffix] = ranges[editQtr];
    const title = `Q${editQtr} ${editYear}`;
    editQuarter({
      id: q.id,
      changes: {
        year: editYear,
        qtr: editQtr,
        title,
        startDate: `${editYear}-${startSuffix}`,
        endDate: `${editYear}-${endSuffix}`,
      },
    });
    setEditingQuarterId(null);
  };

  return (
    <Container maxWidth="md" className="py-4">
      <Typography variant="h4" gutterBottom>
        Quarters
      </Typography>

      {/* Add New Quarter Form */}
      <Box mb={4}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 5, sm: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Year</InputLabel>
              <Select
                value={year}
                label="Year"
                onChange={(e) => setYear(e.target.value)}
              >
                {years.map((y) => (
                  <MenuItem key={y} value={y}>
                    {y}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 6, sm: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Quarter</InputLabel>
              <Select
                value={qtr}
                label="Quarter"
                onChange={(e) => setQtr(e.target.value)}
              >
                {[1, 2, 3, 4].map((n) => (
                  <MenuItem key={n} value={n} disabled={usedQs.includes(n)}>
                    Q{n}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              loadingIndicator="node"
              disabled={usedQs.includes(qtr)}
              onClick={handleAdd}
            >
              Add Quarter
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Existing Quarters List */}
      <List>
        {quarters.map((q) => (
          <ListItem
            key={q.id}
            divider
            secondaryAction={
              editingQuarterId !== q.id ? (
                <>
                  <IconButton
                    edge="end"
                    onClick={() => {
                      setEditingQuarterId(q.id);
                      setEditYear(q.year);
                      setEditQtr(q.qtr);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={() => deleteQuarter(q.id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              ) : null
            }
          >
            {editingQuarterId === q.id ? (
              <Grid container spacing={1} alignItems="center">
                <Grid size={{ xs: 5 }}>
                  <Select
                    value={editYear}
                    onChange={(e) => setEditYear(e.target.value)}
                    fullWidth
                  >
                    {years.map((y) => (
                      <MenuItem key={y} value={y}>
                        {y}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid size={{ xs: 5 }}>
                  <Select
                    value={editQtr}
                    onChange={(e) => setEditQtr(e.target.value)}
                    fullWidth
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <MenuItem key={n} value={n}>
                        Q{n}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid size={{ xs: 2 }}>
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    onClick={() => handleSaveEdit(q)}
                  >
                    Save
                  </Button>
                  <Button
                    size="small"
                    onClick={() => setEditingQuarterId(null)}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <ListItemText
                primary={
                  <RouterLink
                    to={`/quarters/${q.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {q.title}
                  </RouterLink>
                }
                secondary={`${q.startDate} → ${q.endDate}`}
              />
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default QuarterList;
