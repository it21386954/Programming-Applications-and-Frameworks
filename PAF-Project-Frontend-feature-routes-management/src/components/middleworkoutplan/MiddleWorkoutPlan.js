import React, { useEffect, useState, useRef } from "react";
import "./MiddleWorkoutPlan.css";
import axios from "axios";
import profilepic from "../../images/profile-1.jpg";
import PostService from "../../Services/PostService";
import profile1 from "../../images/profile-11.jpg";
import profile2 from "../../images/profile-12.jpg";
import profile3 from "../../images/profile-13.jpg";
import { deleteWorkoutPlanById, getAllWorkoutPlans } from "../../util/APIUtils";
import { toast } from "react-toastify";
import { ACCESS_TOKEN, USER_EMAIL, USER_NAME } from "../../constants";
import UpdateWorkoutPlanModal from "../updateWorkoutPlanModal/UpdateWorkoutPlanModal";


export default function MiddleWorkoutPlan() {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedMealPlan, setSelectedMealPlan] = useState(null);

  const handleUpdateClick = (mealPlan) => {
    setSelectedMealPlan(mealPlan);
    setShowUpdateModal(true);
  };

  const fetchAllPost = async () => {
    try {
      const response = await getAllWorkoutPlans();
      setWorkoutPlans(response.data);
      console.log("fecthed success");
      console.log(response.data);
      console.log(workoutPlans);
    } catch (error) {
      console.log("fecthed failed");
      console.log(error);
      toast("Oops something went wrong!", {
        type: "error",
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem(ACCESS_TOKEN))
    setUsername(localStorage.getItem(USER_NAME))
    setEmail(localStorage.getItem(USER_EMAIL))
    fetchAllPost();
  }, []);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    PostService.getPosts().then((res) => {
      setPosts(res.data);
    });
  }, [posts]);

  const [file, setFile] = useState(null);

  const [content, setContent] = useState("");

  const [imageUrl, setImageUrl] = useState("");

  const [display, setDisplay] = useState("none");

  const fileInputRef = useRef(null);
  useEffect(() => {}, [posts]);
  const handleClick = () => {
    const fileInput = document.getElementById("file-input");
    fileInput.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setImageUrl(event.target.result);
      };

      reader.readAsDataURL(file);
      setDisplay("");
      setFile(event.target.files[0]);
    }
  };
  const handleClosePreview = () => {
    setImageUrl("");
    setDisplay("none");
    setFile(null);
    fileInputRef.current.value = ""; // Reset the file input value
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("content", content);
    formData.append("file", file);

    setImageUrl("");
    setDisplay("none");
    setFile(null);
    fileInputRef.current.value = ""; // Reset the file input value
    setContent("");

    PostService.PostFormData(formData);
  };

  const handleDelete = (planId) => {
    // preventDefault();

    deleteWorkoutPlanById(planId)
      .then((response) => {
        console.log(planId)
        console.log("Delete workout plan success!", response);
        toast("Workout plan deleted successfully!", { type: "success" });
        refreshComponent();
      })
      .catch((error) => {
        console.error("Delete workout plan failed:", error);
        toast(
          error && error.message
            ? error.message
            : "Oops! Something went wrong. Please try again!",
          { type: "error" }
        );
      });
  };

  const refreshComponent = () => {
    fetchAllPost();
  };

  return (
    <div className="middle">
      <div className="storiesWP">
        <div className="story">
          <div className="profile-photo">
            <img src={profilepic} alt="" />
          </div>
          <p className="name">Darshan</p>
        </div>
        <div className="story">
          <div className="profile-photo">
            <img src={profile1} alt="" />
          </div>
          <p className="name">Ashu</p>
        </div>
        <div className="story">
          <div className="profile-photo">
            <img src={profile2} alt="" />
          </div>
          <p className="name">Shraddha</p>
        </div>
        <div className="story">
          <div className="profile-photo">
            <img src={profile3} alt="" />
          </div>
          <p className="name">Ananya</p>
        </div>
        <div className="story">
          <div className="profile-photo">
            <img src="./images/profile-12.jpg" alt="" />
          </div>
          <p className="name">Harsh</p>
        </div>
      </div>
      {/*-story ends here*/}
      <form
        // action="create-post"
        onSubmit={handleSubmit}
        className="create-post"
      >
        <div className="profile-photo">
          <img src={profilepic} alt="profile-photo" />
        </div>
        <input
          type="text"
          value={content}
          placeholder="what's on your mind Nishi?"
          id="create-post"
          onChange={(event) => setContent(event.target.value)}
        />
        <div className="attach">
          <span>
            <i onClick={handleClick} className="uil uil-paperclip"></i>
            <input
              type="file"
              id="file-input"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            ></input>
          </span>
        </div>

        <input
          type="submit"
          onClick={handleSubmit}
          defaultValue="post"
          className="btn btn-primary"
        />
      </form>
      <div id="preview" style={{ display }}>
        <span onClick={handleClosePreview}>
          <i className="uil uil-multiply"></i>
        </span>
        <img src={imageUrl}></img>

        <div className="button">
          {" "}
          <button type="submit" defaultValue="post" className="btn btn-primary">
            Post
          </button>
        </div>
      </div>

      {/*----------------Feeds-------------------*/}

      <div className="feeds">
        {workoutPlans.map((post) => {
          return (
            <div className="feed">
              <div className="head">
                <div className="user">
                  <div className="profile-photo">
                    <img src={profilepic} alt="profile-photo" />
                  </div>
                  <div className="info">
                    <h3>{post.name}</h3>
                    <small>{username} | {post.createdDate}</small>
                  </div>
                </div>
                <span
                  className="edit"
                  onClick={() => handleDelete(post.planId)}
                  title="Delete Workout Plan"
                >
                  <i className="uil uil-trash-alt"></i>
                </span>
                <span className="edit">
                  <i className="uil uil-ellipsis-h" />
                </span>
                <span
                  className="edit"
                  onClick={() => handleUpdateClick(post)}
                  title="Update Meal Plan"
                >
                  <i className="uil uil-edit"></i>
                </span>
              </div>
              <div className="content">{post.description}</div>
              <div className="photo">
                {/* <img src={post.image} alt="" /> */}
              </div>
              <div
                className="caption"
                style={{
                  backgroundColor: "#f8f9fa",
                  padding: "15px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <h6
                  style={{
                    borderBottom: "2px solid #007bff",
                    paddingBottom: "10px",
                    marginBottom: "10px",
                    color: "#007bff",
                  }}
                >
                  <b>Routing plans:</b>
                </h6>
                {post.routineDTOS.map((routine) => (
                  <div key={routine.routineId} style={{ marginBottom: "10px" }}>
                    <h6
                      style={{
                        color: "#333",
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginBottom: "5px",
                      }}
                    >
                      {routine.name}
                    </h6>
                    <ul style={{ listStyleType: "none", paddingLeft: "20px" }}>
                      {routine.exerciseDTOS.map((exercise) => (
                        <li
                          key={exercise.exerciseId}
                          style={{
                            marginBottom: "10px",
                            padding: "5px",
                            borderRadius: "5px",
                            backgroundColor: "#fff",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                          }}
                        >
                          <span style={{ fontWeight: "bold" }}>
                            {exercise.name}
                          </span>
                          <ul
                            style={{
                              listStyleType: "square",
                              marginLeft: "20px",
                              color: "#555",
                            }}
                          >
                            <li>Sets: {exercise.sets}</li>
                            <li>Repetitions: {exercise.repetitions}</li>
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="action-button">
                <div className="interation-buttons">
                  <span>
                    <i className="uil uil-heart" />
                  </span>
                  <span>
                    <i className="uil uil-comment-dots" />
                  </span>
                  <span>
                    <i className="uil uil-share-alt" />
                  </span>
                </div>
                <div className="bookmark">
                  <span>
                    <i className="uil uil-bookmark" />
                  </span>
                </div>
              </div>
              <div className="liked-by">
                <span>
                  <img src={profile1} />
                </span>
                <span>
                  <img src={profile2} />
                </span>
                <span>
                  <img src={profile3} />
                </span>
                <p>
                  Liked by <b>Earnest Achiever</b> and 323 others.
                </p>
              </div>
              <div className="caption">
                <p>
                  Lana Rose <b>Lorem ipsumm soluta officia non accusantium</b>{" "}
                  <span className="hashtag">#Lifestyle</span>
                </p>
              </div>
              <div className="comments text-muted"> view all 277 Coments</div>
            </div>
          );
        })}
        {showUpdateModal && selectedMealPlan && (
          <UpdateWorkoutPlanModal
            workoutPlan={selectedMealPlan}
            onSave={(updatedMealPlan) => {
              console.log("Updated Meal Plan:", updatedMealPlan);
              // API call to save updated data
              setShowUpdateModal(false);
            }}
            onClose={() => setShowUpdateModal(false)}
          />
        )}
      </div>
    </div>
  );
}
