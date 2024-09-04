import React, { useState } from 'react';
import { updateWorkoutPlans } from "../../util/APIUtils";
import "./UpdateWorkoutPlanModal.css"
import { toast } from "react-toastify";

export default function UpdateWorkoutPlanModal({ workoutPlan, onSave, onClose }) {
  const [formData, setFormData] = useState({ ...workoutPlan });

  const handleChange = (e, context = null, index = null) => {
    const { name, value } = e.target;
    if (context && index !== null) {
      const updatedRoutines = [...formData.routineDTOS];
      if (context === "exercises") {
        const exerciseIndex = parseInt(e.target.dataset.exerciseIndex, 10);
        updatedRoutines[index].exerciseDTOS[exerciseIndex][name] = value;
      } else {
        updatedRoutines[index][name] = value;
      }
      setFormData({ ...formData, routineDTOS: updatedRoutines });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddRoutine = () => {
    const newRoutine = {
      routineId: "",
      name: "",
      exerciseDTOS: []
    };
    setFormData(prev => ({
      ...prev,
      routineDTOS: [...prev.routineDTOS, newRoutine]
    }));
  };

  const handleRemoveRoutine = (index) => {
    const updatedRoutines = formData.routineDTOS.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, routineDTOS: updatedRoutines }));
  };

  const handleAddExercise = (routineIndex) => {
    const newExercise = {
      exerciseId: "",
      name: "",
      sets: 0,
      repetitions: 0
    };
    const updatedRoutines = [...formData.routineDTOS];
    updatedRoutines[routineIndex].exerciseDTOS.push(newExercise);
    setFormData({ ...formData, routineDTOS: updatedRoutines });
  };

  const handleRemoveExercise = (routineIndex, exerciseIndex) => {
    const updatedRoutines = [...formData.routineDTOS];
    updatedRoutines[routineIndex].exerciseDTOS = updatedRoutines[routineIndex].exerciseDTOS.filter((_, i) => i !== exerciseIndex);
    setFormData({ ...formData, routineDTOS: updatedRoutines });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateWorkoutPlans(formData)
      .then(response => {
        toast("Workout plan updated successfully", { type: "success" });
        onSave(formData);
      })
      .catch(error => {
        toast("Update workout plan failed: " + (error.message || "Please try again!"), { type: "error" });
      });
    onClose(); // Close the modal after submission
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit Workout Plan</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label>
            Description:
            <textarea name="description" value={formData.description} onChange={handleChange} />
          </label>
          {formData.routineDTOS.map((routine, rIndex) => (
            <div key={rIndex}>
              <h4>Routine: {routine.name}</h4>
              <button type="button" onClick={() => handleRemoveRoutine(rIndex)}>Remove Routine</button>
              <label>
                Routine Name:
                <input type="text" name="name" value={routine.name} onChange={(e) => handleChange(e, null, rIndex)} />
              </label>
              {routine.exerciseDTOS.map((exercise, eIndex) => (
                <div key={eIndex}>
                  <label>Exercise Name:
                    <input type="text" name="name" value={exercise.name} onChange={(e) => handleChange(e, "exercises", rIndex, eIndex)} data-exercise-index={eIndex} />
                  </label>
                  <label>Sets:
                    <input type="number" name="sets" value={exercise.sets} onChange={(e) => handleChange(e, "exercises", rIndex, eIndex)} data-exercise-index={eIndex} />
                  </label>
                  <label>Repetitions:
                    <input type="number" name="repetitions" value={exercise.repetitions} onChange={(e) => handleChange(e, "exercises", rIndex, eIndex)} data-exercise-index={eIndex} />
                  </label>
                  <button type="button" onClick={() => handleRemoveExercise(rIndex, eIndex)}>Remove Exercise</button>
                </div>
              ))}
              <button type="button" onClick={() => handleAddExercise(rIndex)}>Add Exercise</button>
            </div>
          ))}
          <button type="button" onClick={handleAddRoutine}>Add Routine</button>
          <button type="submit">Update Workout Plan</button>
        </form>
      </div>
    </div>
  );
}
