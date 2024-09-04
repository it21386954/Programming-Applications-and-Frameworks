import React, { useEffect, useState, useRef } from "react";
import "./MiddleWorkoutStatus.css";
import axios from "axios";
import profilepic from "../../images/profile-1.jpg";
import PostService from "../../Services/PostService";
import { uploadImage } from "../../util/APIUtils";
import { toast } from "react-toastify";
import profile1 from "../../images/profile-11.jpg";
import profile2 from "../../images/profile-12.jpg";
import profile3 from "../../images/profile-13.jpg";
import { ACCESS_TOKEN, USER_EMAIL, USER_ID, USER_NAME } from "../../constants";

export default function MiddleWorkoutStatus() {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [file, setFile] = useState(null);

  const [imageUrl, setImageUrl] = useState("");

  const [description, setDescription] = useState("");
  const [userId, setUserIdn] = useState("");
  const [distance, setDistance] = useState("");
  const [pushUp, setPushUp] = useState("");
  const [weightLifted, setWeightLifted] = useState("");
  const [id, setId] = useState("");

  const [display, setDisplay] = useState("none");

  const [updateFormVisible, setUpdateFormVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({});

  const handleUpdateClick = (post) => {
    setCurrentPost(post);
    setDescription(post.description);
    setDistance(post.distance);
    setPushUp(post.pushUp);
    setWeightLifted(post.weightLifted);
    setImageUrl(post.mediaEntityDTO.data); // Assuming the URL is directly accessible
    setId(post.id);
    setUpdateFormVisible(true);
  };

  const [mediaItems, setMediaItems] = useState([]);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const onDistanceChange = (event) => {
    setDistance(event.target.value);
  };

  const onPushUpChange = (event) => {
    setPushUp(event.target.value);
  };

  const onWeightLiftChange = (event) => {
    setWeightLifted(event.target.value);
  };

  useEffect(() => {
    setToken(localStorage.getItem(ACCESS_TOKEN));
    setUsername(localStorage.getItem(USER_NAME));
    setEmail(localStorage.getItem(USER_EMAIL));
    setUserIdn(localStorage.getItem(USER_ID));
    fetchAllImage();
  }, []);

  const onFileUpload = () => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("description", description);
    formData.append("pushUp", pushUp);
    formData.append("weightLifted", weightLifted);
    formData.append("distance", distance);
    formData.append("userId", userId);
    formData.append("id", id);

    console.log(file);

    axios
      .post("http://localhost:8088/api/workout/status/post", formData)
      .then((response) => {
        console.log("File uploaded successfully", response);
        setImageUrl(response.data.data.url);
        toast("You're successfully image uploaded!", {
          type: "success",
        });
        // refreshComponent();
      })
      .catch((error) => {
        console.log("Error uploading file:", error);
        toast(
          (error && error.message) ||
            "Oops! Error uploading file:. Please try again!",
          { type: "error" }
        );
      });
  };

  const fileInputRef = useRef(null);

  const handleClick = () => {
    const fileInput = document.getElementById("file-input");
    fileInput.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileType = file.type.split("/")[0]; // This will give 'image' or 'video'
    console.log("The fileType: " + fileType);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target.result);
        setDisplay(fileType); // Use this state to determine rendering logic
      };

      if (fileType === "image") {
        reader.readAsDataURL(file);
      } else if (fileType === "video") {
        reader.readAsDataURL(file); // You might need to handle video files differently based on your requirements
      }

      setFile(file);
    }
  };

  // const handleClosePreview = () => {
  //   setImageUrl("");
  //   setDisplay("none");
  //   setFile(null);
  //   fileInputRef.current.value = ""; // Reset the file input value
  // };

  const handleClosePreview = () => {
    if (fileInputRef.current) {
      // Only try to reset if the element exists
      fileInputRef.current.value = ""; // Reset the file input value
    }
    setUpdateFormVisible(false);
    setImageUrl("");
    setDescription("");
    setFile(null);
  };

  const fetchAllImage = async () => {
    axios
      .get("http://localhost:8088/api/workout/status/post")
      .then((response) => {
        console.log(response.data.data);
        setMediaItems(response.data.data);
      })
      .catch((error) => console.error("Error fetching media:", error));
  };

  const handleDelete = (planId) => {
    axios
      .delete("http://localhost:8088/api/workout/status/post/" + planId)
      .then((response) => {
        console.log("File delete successfully", response);
        setImageUrl(response.data.data.url);
        toast("You're successfully image deleted!", {
          type: "success",
        });
        refreshComponent();
      })
      .catch((error) => {
        console.log("Error deleting file:", error);
        toast(
          (error && error.message) ||
            "Oops! Error deleting file:. Please try again!",
          { type: "error" }
        );
      });
  };

  const refreshComponent = () => {
    fetchAllImage();
  };

  const submitUpdate = () => {
    const formData = new FormData();
    formData.append("id", currentPost.id);
    formData.append("userId", userId); // Assuming userId is available from state
    formData.append("description", description);
    formData.append("distance", distance);
    formData.append("pushUp", pushUp);
    formData.append("weightLifted", weightLifted);
    if (file) {
      formData.append("file", file);
    }

    axios
      .put(
        `http://localhost:8088/api/workout/status/post/${currentPost.id}`,
        formData
      )
      .then((response) => {
        console.log("Workout status updated successfully", response);
        toast("Workout status updated successfully!", { type: "success" });
        setUpdateFormVisible(false);
        refreshComponent();
      })
      .catch((error) => {
        console.error("Error updating workout status:", error);
        toast("Error updating workout status. Please try again!", {
          type: "error",
        });
      });
  };

  return (
    <div className="middle">
      <div className="stories">
        <div className="story">
          <div className="profile-photo">
            <img src={profilepic} alt="" />
          </div>
          <p className="name">Darshan</p>
        </div>
        <div className="story">
          <div className="profile-photo">
            <img src="./images/profile-15.jpg" alt="" />
          </div>
          <p className="name">Ashu</p>
        </div>
        <div className="story">
          <div className="profile-photo">
            <img src="./images/profile-14.jpg" alt="" />
          </div>
          <p className="name">Shraddha</p>
        </div>
        <div className="story">
          <div className="profile-photo">
            <img src="./images/profile-13.jpg" alt="" />
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
      <form onSubmit={onFileUpload} className="">
        <div className="profile-photo">
          <img src={profilepic} alt="profile-photo" />
        </div>
        <input
          type="text"
          value={description}
          onChange={onDescriptionChange}
          placeholder="what's on your mind?"
          id="create-post"
        />
        <input
          type="number"
          value={distance}
          onChange={onDistanceChange}
          placeholder="what's on your distance travel?"
          id="create-post"
        />
        <input
          type="number"
          value={pushUp}
          onChange={onPushUpChange}
          placeholder="what's on your push up counts?"
          id="create-post"
        />
        <input
          type="number"
          value={weightLifted}
          onChange={onWeightLiftChange}
          placeholder="what's on your weight lifted counts?"
          id="create-post"
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
          defaultValue="post"
          className="btn btn-primary"
          style={{ marginTop: "10px" }}
        />
      </form>
      <div
        id="preview"
        style={{ display: display !== "none" ? "block" : "none" }}
      >
        <span onClick={handleClosePreview}>
          <i className="uil uil-multiply"></i>
        </span>
        {display === "image" && <img src={imageUrl} alt="Uploaded content" />}
        {display === "video" && <video src={imageUrl} controls />}
      </div>

      {/*----------------Feeds-------------------*/}

      <div className="feeds">
        {mediaItems.map((post) => {
          return (
            <div className="feed" key={post.id}>
              <div className="head">
                <div className="user">
                  <div className="profile-photo">
                    <img src={profilepic} alt="profile-photo" />
                  </div>
                  <div className="info">
                    <h3>{username}</h3>
                    <small>{email}, 15 Minutes Ago</small>
                  </div>
                </div>
                <span
                  className="edit"
                  onClick={() => handleDelete(post.id)}
                  title="Delete Meal Plan"
                >
                  <i className="uil uil-trash-alt"></i>
                </span>
                <span className="edit">
                  <i className="uil uil-ellipsis-h" />
                </span>
                <span
                  className="edit"
                  onClick={() => handleUpdateClick(post)}
                  title="Update Workout Status"
                >
                  <i className="uil uil-edit"></i>
                </span>
              </div>
              <div className="content">
                <p>{post.description}</p>
                <p>Distance: {post.distance}</p>
                <p>PushUp: {post.pushUp}</p>
                <p>Weight Lifted: {post.weightLifted}</p>
              </div>
              <div className="photo">
                {post.mediaEntityDTO.contentType.startsWith("image/") && (
                  <img src={post.mediaEntityDTO.data} alt="" />
                )}
                {post.mediaEntityDTO.contentType.startsWith("video/") && (
                  <video src={post.mediaEntityDTO.data} controls />
                )}
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
      </div>
      {updateFormVisible && (
    <div className="update-form">
        <div className="form-content">
            <span
                onClick={() => setUpdateFormVisible(false)}
                className="close-icon"
            >
                <i className="uil uil-times"></i>
            </span>
            <input
                type="text"
                value={description}
                onChange={onDescriptionChange}
                placeholder="Update description"
            />
            <input
                type="number"
                value={distance}
                onChange={onDistanceChange}
                placeholder="Update distance traveled"
            />
            <input
                type="number"
                value={pushUp}
                onChange={onPushUpChange}
                placeholder="Update push up counts"
            />
            <input
                type="number"
                value={weightLifted}
                onChange={onWeightLiftChange}
                placeholder="Update weight lifted"
            />
            {currentPost.mediaEntityDTO &&
            currentPost.mediaEntityDTO.contentType.startsWith("image/") && (
                <img src={imageUrl} alt="Uploaded content" />
            )}
            {currentPost.mediaEntityDTO &&
            currentPost.mediaEntityDTO.contentType.startsWith("video/") && (
                <video src={imageUrl} controls />
            )}
            <input type="file" onChange={handleFileChange} ref={fileInputRef} />
            <button onClick={submitUpdate} className="update-button">Update</button>
            <button onClick={() => setUpdateFormVisible(false)} className="close-button">Close</button>
        </div>
    </div>
)}

    </div>
  );
}
