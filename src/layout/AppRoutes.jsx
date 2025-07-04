import React from "react";

import { Routes, Route, Navigate } from "react-router";

import GoalList from "../components/GoalList";
import QuarterList from "../components/QuarterList";
import Navbar from "../components/Navbar";
import IndividualGoal from "../components/IndividualGoal";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Navigate to="/quarters" replace />} />
        <Route path="/quarters" element={<QuarterList />} />
        <Route path="/quarters/:quarterId" element={<GoalList />} />
        <Route path="/goals/:quarterId/:goalId" element={<IndividualGoal />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
