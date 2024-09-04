import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import React, { useEffect, useReducer } from "react";
// import { Routes, Route } from "react-router-dom";

import MainPage from "./components/main-page/MainPage";
import SignUp from "./components/signup/SignUp2";
import LogIn from "./components/login/LogIn2";
import Left from "./components/left/Left";
import { Routes, Route } from "react-router-dom";


import NotFound from "./common/NotFound";
import LoadingIndicator from "./common/LoadingIndicator";
import { getCurrentUser, login } from "./util/APIUtils";
import { ACCESS_TOKEN, USER_EMAIL, USER_NAME } from "./constants";
import PrivateRoute from "./common/PrivateRoute";

import { ToastContainer, toast } from "react-toastify";
import WorkourPlanPage from "./components/workour-plan-page/WorkourPlanPage";
import WorkourStatusPage from "./components/workour-status-page/WorkourStatusPage";
import MealPlanPage from "./components/meal-plan-page/MealPlanPage";
import LogIn2 from "./components/login/LogIn2";
import SignUp2 from "./components/signup/SignUp2";

function App() {
  // const navigate = useNavigate();
  const [state, setState] = useReducer(
    (prevState, newState) => {
      return { ...prevState, ...newState };
    },
    {
      authenticated: true,
      currentUser: null,
      loading: true,
    }
  );

  const loadCurrentlyLoggedInUser = () => {
    console.log("load current user")
    getCurrentUser()
      .then((response) => {
        setState({
          currentUser: response.name,
          authenticated: true,
          loading: false,
        });
        console.log("load current auth: "+state.authenticated)
      })
      .catch((error) => {
        console.log("load current user error!")
        setState({
          loading: false,
        });
      });
  };

  const handleLogout = () => {
    console.log("App component handle logout is triggered")
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(USER_EMAIL);
    localStorage.removeItem(USER_NAME);
    setState({
      authenticated: false,
      currentUser: null,
    });
    console.log("Log out auth: "+state.authenticated)
    toast("You're safely logged out!", {
      type: "success",
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "black",
    });
    // navigate("/login");
  };

  useEffect(() => {
    loadCurrentlyLoggedInUser();
  }, []);

  if (state.loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="App">
      {/* <Router>
        <Switch>
          <Route path="/" element={<MainPage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/left" element={<Left />} />
        </Switch>
      </Router> */}

      <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute
                authenticated={state.authenticated}
                currentUser={state.currentUser}
                onLogout={handleLogout}
                component={MainPage}
              />
            }
          />
          <Route
            path="/workoutplan"
            element={
              <PrivateRoute
                authenticated={state.authenticated}
                currentUser={state.currentUser}
                onLogout={handleLogout}
                component={WorkourPlanPage}
              />
            }
          />
          <Route
            path="/workoutstatus"
            element={
              <PrivateRoute
                authenticated={state.authenticated}
                currentUser={state.currentUser}
                onLogout={handleLogout}
                component={WorkourStatusPage}
              />
            }
          />
          <Route
            path="/mealplan"
            element={
              <PrivateRoute
                authenticated={state.authenticated}
                currentUser={state.currentUser}
                onLogout={handleLogout}
                component={MealPlanPage}
              />
            }
          />
          <Route
            path="/login"
            element={<LogIn2 authenticated={state.authenticated} />}
          />
          <Route
            path="/signup"
            element={<SignUp2 authenticated={state.authenticated} />}
          />
          {/* <Route
            path="/"
            element={
              <MainPage
                authenticated={state.authenticated}
                onLogout={handleLogout}
              />
            }
          /> */}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
