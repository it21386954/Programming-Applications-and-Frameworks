package com.spring.social_media_application.service.impl;

import com.spring.social_media_application.common.CommonResponse;
import com.spring.social_media_application.dto.WorkoutStatusMediaDTO;
import com.spring.social_media_application.dto.WorkoutStatusRequestDTO;
import com.spring.social_media_application.entity.WorkoutStatus;
import com.spring.social_media_application.entity.WorkoutStatusMedia;
import com.spring.social_media_application.mapper.WorkoutStatusMapper;
import com.spring.social_media_application.mapper.WorkoutStatusMediaMapper;
import com.spring.social_media_application.repository.WorkoutStatusMediaRepository;
import com.spring.social_media_application.repository.WorkoutStatusRepository;
import com.spring.social_media_application.service.WorkoutStatusService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class WorkoutStatusServiceImpl implements WorkoutStatusService {
    private final WorkoutStatusRepository workoutStatusRepository;
    private final WorkoutStatusMediaRepository workoutStatusMediaRepository;
    private final WorkoutStatusMapper workoutStatusMapper;
    private final WorkoutStatusMediaMapper workoutStatusMediaMapper;
    @Override
    public CommonResponse getAllWorkoutStatusDetails() {
        log.info("WorkoutStatusServiceImpl.getAllWorkoutStatusDetails method accessed");
        CommonResponse commonResponse = new CommonResponse();
        List<WorkoutStatusRequestDTO> workoutStatusRequestDTOList = new ArrayList<>();
        List<WorkoutStatus> workoutStatusList = workoutStatusRepository.findAll();
        workoutStatusList.forEach(notification ->  workoutStatusRequestDTOList.add(workoutStatusMapper.domainToDto(notification)));
        if (workoutStatusList.isEmpty()) {
            commonResponse.setStatus(HttpStatus.OK);
            commonResponse.setData(new ArrayList<WorkoutStatus>());
            commonResponse.setMessage("WorkoutStatus details list not available!");
            log.warn("Workout status details not available. message :{}", commonResponse.getMessage());
            return commonResponse;
        }
        commonResponse.setStatus(HttpStatus.OK);
        commonResponse.setMessage("WorkoutStatus details are fetching success!");
        commonResponse.setData(workoutStatusRequestDTOList);
        log.info("WorkoutStatusServiceImpl.getAllWorkoutStatusDetails method end");
        return commonResponse;
    }

    @Override
    public CommonResponse getWorkoutStatusDetailsById(String workoutStatusId) {
        log.info("WorkoutStatusServiceImpl.getWorkoutStatusDetailsById method accessed");
        WorkoutStatusRequestDTO workoutStatusRequestDTO;
        CommonResponse commonResponse = new CommonResponse();
        Optional<WorkoutStatus> workoutStatus = workoutStatusRepository.findById(workoutStatusId);
        if(workoutStatus.isPresent()) {
            workoutStatusRequestDTO = workoutStatusMapper.domainToDto(workoutStatus.get());
        } else {
            commonResponse.setStatus(HttpStatus.OK);
            commonResponse.setData(new ArrayList<>());
            commonResponse.setMessage("WorkoutStatus details is not available!");
            log.warn("WorkoutStatus details not available. message : {} ", commonResponse.getMessage());
            return commonResponse;
        }
        commonResponse.setStatus(HttpStatus.OK);
        commonResponse.setMessage("WorkoutStatus details is fetching success!");
        commonResponse.setData(workoutStatusRequestDTO);
        log.info("WorkoutStatusServiceImpl.getWorkoutStatusDetailsById method end");
        return commonResponse;
    }

    @Override
    public CommonResponse saveWorkoutStatus(WorkoutStatusRequestDTO workoutStatusRequestDTO) {
        log.info("WorkoutStatusServiceImpl.saveWorkoutStatus method accessed");
        CommonResponse commonResponse = new CommonResponse();
        Optional<WorkoutStatus> workoutStatus = workoutStatusRepository.findById(workoutStatusRequestDTO.getId());
        if(workoutStatus.isPresent()){
            commonResponse.setStatus(HttpStatus.BAD_REQUEST);
            commonResponse.setMessage("WorkoutStatus details already exist!");
            commonResponse.setData(workoutStatusMapper.domainToDto(workoutStatus.get()));
            log.warn("Workout Status details not exist. message : {}", commonResponse.getMessage());
            return commonResponse;
        }
        WorkoutStatus workoutStatusSavedDetails = workoutStatusRepository.save(workoutStatusMapper.dtoToDomain(workoutStatusRequestDTO, new WorkoutStatus()));
        commonResponse.setStatus(HttpStatus.CREATED);
        commonResponse.setMessage("WorkoutStatus details saved success!");
        commonResponse.setData(workoutStatusMapper.domainToDto(workoutStatusSavedDetails));
        log.info("WorkoutStatusServiceImpl.saveWorkoutStatus method end");
        return commonResponse;
    }

    @Override
    public CommonResponse updateWorkoutStatus(WorkoutStatusRequestDTO workoutStatusRequestDTO) {
        log.info("WorkoutStatusServiceImpl.updateWorkoutStatus method accessed");
        CommonResponse commonResponse = new CommonResponse();
        Optional<WorkoutStatus> workoutStatus = workoutStatusRepository.findById(workoutStatusRequestDTO.getId());
        if(workoutStatus.isEmpty()) {
            commonResponse.setStatus(HttpStatus.BAD_REQUEST);
            commonResponse.setMessage("WorkoutStatus details not available!");
            commonResponse.setData(new ArrayList<>());
            log.warn("Workout status  details not available. message : {}", commonResponse.getMessage());
            return commonResponse;
        }
        WorkoutStatus workoutStatusUpdatedDetails = workoutStatusRepository.save(workoutStatusMapper.dtoToDomain(workoutStatusRequestDTO, workoutStatus.get()));
        commonResponse.setStatus(HttpStatus.OK);
        commonResponse.setMessage("WorkoutStatus details is update success!");
        commonResponse.setData(workoutStatusMapper.domainToDto(workoutStatusUpdatedDetails));
        log.info("WorkoutStatusServiceImpl.updateWorkoutStatus method end");
        return commonResponse;
    }

    @Override
    public CommonResponse deleteWorkoutStatusDetailsById(String workoutStatusId) {
        log.info("WorkoutStatusServiceImpl.deleteWorkoutStatusDetailsById method accessed");
        CommonResponse commonResponse = new CommonResponse();
        Optional<WorkoutStatus> workoutStatus = workoutStatusRepository.findById(workoutStatusId);
        if(workoutStatus.isEmpty()) {
            commonResponse.setStatus(HttpStatus.BAD_REQUEST);
            commonResponse.setMessage("Delete workoutStatus details not available!");
            commonResponse.setData(new ArrayList<>());
            log.warn("WorkoutStatus  details not available. message : {}", commonResponse.getMessage());
            return commonResponse;
        }
        workoutStatusRepository.deleteById(workoutStatusId);
        commonResponse.setStatus(HttpStatus.OK);
        commonResponse.setMessage("WorkoutStatus details is delete success!");
        commonResponse.setData(new ArrayList<>());
        log.info("WorkoutStatusServiceImpl.deleteWorkoutStatusDetailsById method end");
        return commonResponse;
    }

    @Override
    public CommonResponse deleteALlWorkoutStatusDetails() {
        log.info("WorkoutStatusServiceImpl.deleteALlWorkoutStatusDetails method accessed");
        CommonResponse commonResponse = new CommonResponse();
        List<WorkoutStatus> workoutStatus = workoutStatusRepository.findAll();
        if(workoutStatus.isEmpty()) {
            commonResponse.setStatus(HttpStatus.BAD_REQUEST);
            commonResponse.setMessage("Delete all workoutStatus details not available!");
            commonResponse.setData(new ArrayList<>());
            log.warn("WorkoutStatus all details not available. message : {}", commonResponse.getMessage());
            return commonResponse;
        }
        workoutStatusRepository.deleteAll();
        commonResponse.setStatus(HttpStatus.OK);
        commonResponse.setMessage("WorkoutStatus all details is delete success!");
        commonResponse.setData(new ArrayList<>());
        log.info("WorkoutStatusServiceImpl.deleteALlWorkoutStatusDetails method end");
        return commonResponse;
    }

    @Override
    public CommonResponse saveWorkoutStatusWithPost(String id, String userId, Double distance, Integer pushUp, Double weightLifted, String description, MultipartFile file) throws IOException {
        log.info("WorkoutStatusServiceImpl.saveWorkoutStatusWithPost method accessed");
        CommonResponse commonResponse = new CommonResponse();
        WorkoutStatusRequestDTO workoutStatusRequestDTO = new WorkoutStatusRequestDTO();
        workoutStatusRequestDTO.setId(id);
        workoutStatusRequestDTO.setUserId(userId);
        workoutStatusRequestDTO.setDistance(distance);
        workoutStatusRequestDTO.setPushUp(pushUp);
        workoutStatusRequestDTO.setWeightLifted(weightLifted);
        workoutStatusRequestDTO.setDescription(description);
        Optional<WorkoutStatusMedia> workoutStatusMedia = workoutStatusMediaRepository.findById(workoutStatusRequestDTO.getId());
        if(workoutStatusMedia.isPresent()){
            commonResponse.setStatus(HttpStatus.BAD_REQUEST);
            commonResponse.setMessage("WorkoutStatus details already exist!");
            commonResponse.setData(workoutStatusMedia);
            log.warn("Workout Status details not exist. message : {}", commonResponse.getMessage());
            return commonResponse;
        }
        WorkoutStatusMedia workoutStatusMediaSavedDetails = workoutStatusMediaRepository.save(workoutStatusMediaMapper.dtoToDomain(workoutStatusRequestDTO, file, new WorkoutStatusMedia()));
        commonResponse.setStatus(HttpStatus.CREATED);
        commonResponse.setMessage("WorkoutStatus details saved success!");
        commonResponse.setData(workoutStatusMediaSavedDetails);
        log.info("WorkoutStatusServiceImpl.saveWorkoutStatusWithPost method end");
        return commonResponse;
    }

    @Override
    public CommonResponse getAllWorkoutStatusMediaDetails() {
        log.info("WorkoutStatusServiceImpl.getAllWorkoutStatusMediaDetails method accessed");
        List<WorkoutStatusMediaDTO> statusMediaDTOList = new ArrayList<>();
        CommonResponse commonResponse = new CommonResponse();
        List<WorkoutStatusMedia> workoutStatusMediaList = workoutStatusMediaRepository.findAll();
        workoutStatusMediaList.forEach(workoutStatusMedia ->  statusMediaDTOList.add(workoutStatusMediaMapper.domainToDto(workoutStatusMedia)));
        if (workoutStatusMediaList.isEmpty()) {
            commonResponse.setStatus(HttpStatus.OK);
            commonResponse.setData(new ArrayList<WorkoutStatusMedia>());
            commonResponse.setMessage("WorkoutStatusMedia details list not available!");
            log.warn("WorkoutStatusMedia details not available. message :{}", commonResponse.getMessage());
            return commonResponse;
        }
        commonResponse.setStatus(HttpStatus.OK);
        commonResponse.setMessage("WorkoutStatusMedia details are fetching success!");
        commonResponse.setData(statusMediaDTOList);
        log.info("WorkoutStatusServiceImpl.getAllWorkoutStatusMediaDetails method end");
        return commonResponse;
    }

    @Override
    public CommonResponse deleteWorkoutStatusMediaDetailsById(String workoutStatusMediaId) {
        log.info("WorkoutStatusServiceImpl.deleteWorkoutStatusMediaDetailsById method accessed");
        CommonResponse commonResponse = new CommonResponse();
        Optional<WorkoutStatusMedia> workoutStatus = workoutStatusMediaRepository.findById(workoutStatusMediaId);
        if(workoutStatus.isEmpty()) {
            commonResponse.setStatus(HttpStatus.BAD_REQUEST);
            commonResponse.setMessage("Delete WorkoutStatusMedia details not available!");
            commonResponse.setData(new ArrayList<>());
            log.warn("WorkoutStatusMedia  details not available. message : {}", commonResponse.getMessage());
            return commonResponse;
        }
        workoutStatusMediaRepository.deleteById(workoutStatusMediaId);
        commonResponse.setStatus(HttpStatus.OK);
        commonResponse.setMessage("WorkoutStatusMedia details is delete success!");
        commonResponse.setData(new ArrayList<>());
        log.info("WorkoutStatusServiceImpl.deleteWorkoutStatusMediaDetailsById method end");
        return commonResponse;
    }

    @Override
    public CommonResponse updateWorkoutStatusMedia(String id, String userId, Double distance, Integer pushUp, Double weightLifted, String description, MultipartFile file) throws IOException {
        log.info("Entering updateWorkoutStatusMedia method");

        CommonResponse commonResponse = new CommonResponse();
        Optional<WorkoutStatusMedia> existingRecord = workoutStatusMediaRepository.findById(id);

        if (existingRecord.isEmpty()) {
            commonResponse.setStatus(HttpStatus.NOT_FOUND);
            commonResponse.setMessage("WorkoutStatusMedia not found!");
            return commonResponse;
        }

        WorkoutStatusMedia workoutStatus = existingRecord.get();
        // Assuming there is logic to set user based on userId
        workoutStatus.setDistance(distance);
        workoutStatus.setPushUp(pushUp);
        workoutStatus.setWeightLifted(weightLifted);
        workoutStatus.setDescription(description);
        // Assuming there is a method in a mapper/utility class to handle file processing
        if (file != null && !file.isEmpty()) {
            workoutStatus.setMediaEntity(workoutStatusMediaMapper.updateMediaEntity(workoutStatus.getMediaEntity(), file, description));
        }

        WorkoutStatusMedia updatedWorkoutStatus = workoutStatusMediaRepository.save(workoutStatus);
        commonResponse.setStatus(HttpStatus.OK);
        commonResponse.setMessage("WorkoutStatus updated successfully!");
        commonResponse.setData(updatedWorkoutStatus);

        log.info("Exiting updateWorkoutStatusMedia method");
        return commonResponse;
    }


}
