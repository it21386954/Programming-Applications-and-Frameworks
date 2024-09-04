package com.spring.social_media_application.service;

import com.spring.social_media_application.common.CommonResponse;
import com.spring.social_media_application.dto.WorkoutStatusRequestDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface WorkoutStatusService {
    /**
     * Get all workout status
     *
     * @return success or fail response of workout status creation
     */
    CommonResponse getAllWorkoutStatusDetails();

    /**
     * Get workout status by planId
     *
     * @param workoutStatusId - required data for get workout status by planId
     * @return success or fail response of get workout status by planId
     */
    CommonResponse getWorkoutStatusDetailsById(String workoutStatusId);

    /**
     * Create workout status
     *
     * @param workoutStatusRequestDTO - required data for workout status save
     * @return success or fail response of workout status save
     */
    CommonResponse saveWorkoutStatus(WorkoutStatusRequestDTO workoutStatusRequestDTO);

    /**
     * Update workout status
     *
     * @param workoutStatusRequestDTO - required data for workout status update
     * @return success or fail response of workout status update
     */
    CommonResponse updateWorkoutStatus(WorkoutStatusRequestDTO workoutStatusRequestDTO);

    /**
     * Delete workout status by planId
     *
     * @param workoutStatusId - required data for delete workout status by planId
     * @return success or fail response of delete workout status by planId
     */
    CommonResponse deleteWorkoutStatusDetailsById(String workoutStatusId);

    /**
     * Delete all workout status
     *
     * @return success or fail response of delete all workout status
     */
    CommonResponse deleteALlWorkoutStatusDetails();

    /**
     * Create workout status with post
     *
     * @param id - required data for workout status post save
     * @param userId - required data for workout status post save
     * @param distance - required data for workout status post save
     * @param pushUp - required data for workout status post save
     * @param weightLifted - required data for workout status post save
     * @param description - required data for workout status post save
     * @param file - required data for workout status post save
     * @return success or fail response of workout status save
     */
    CommonResponse saveWorkoutStatusWithPost(String id, String userId, Double distance, Integer pushUp, Double weightLifted, String description, MultipartFile file) throws IOException;

    /**
     * Get all workout status media
     *
     * @return success or fail response of workout status media fetching
     */
    CommonResponse getAllWorkoutStatusMediaDetails();

    /**
     * Delete workout status media by id
     *
     * @param workoutStatusMediaId - required data for delete workout status media by id
     * @return success or fail response of delete workout status media by id
     */
    CommonResponse deleteWorkoutStatusMediaDetailsById(String workoutStatusMediaId);

    /**
     * Update workout status with post
     *
     * @param id - required data for workout status post update
     * @param userId - required data for workout status post update
     * @param distance - required data for workout status post update
     * @param pushUp - required data for workout status post update
     * @param weightLifted - required data for workout status post update
     * @param description - required data for workout status post update
     * @param file - required data for workout status post update
     * @return success or fail response of workout status update
     */
    CommonResponse updateWorkoutStatusMedia(String id, String userId, Double distance, Integer pushUp, Double weightLifted, String description, MultipartFile file) throws IOException;
}
