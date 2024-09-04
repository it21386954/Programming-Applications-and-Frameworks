import React, { useEffect, useReducer, useState } from "react";
import MiddleWorkoutPlan from "../middleworkoutplan/MiddleWorkoutPlan";
import Left from "../left/Left";
import Right from "../right/Right";
import Header from "../header/Header";
import "./WorkourPlanPage.css";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllWorkoutPlans } from "../../util/APIUtils";
import WorkoutPlanForm from "../right-workout-plan-form/WorkoutPlanForm";
import { getCurrentUser } from "../../util/APIUtils";
import { ACCESS_TOKEN, USER_EMAIL, USER_NAME } from "../../constants";
import LoadingIndicator from "../../common/LoadingIndicator";


export default function WorkourPlanPage({ authenticated, onLogout }) {
  
  return (
    <div>
      <Header authenticated={authenticated} onLogout={onLogout} />
      <main>
        <div className="container">
          <Left />
          <MiddleWorkoutPlan/>
          <WorkoutPlanForm />
        </div>
      </main>
    </div>
  );
}
