package com.spring.social_media_application.dto;

import com.spring.social_media_application.entity.MediaEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WorkoutStatusMediaDTO {
    private String id;
    private String userId;
    private Double distance;
    private Integer pushUp;
    private Double weightLifted;
    private String description;
    private MediaEntityDTO mediaEntityDTO;
}
