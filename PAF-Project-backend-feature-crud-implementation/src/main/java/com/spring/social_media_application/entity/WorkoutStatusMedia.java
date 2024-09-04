package com.spring.social_media_application.entity;

import com.spring.social_media_application.entity.authentication.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document
public class WorkoutStatusMedia {
    @Id
    private String id;
    private User user;
    private Double distance;
    private Integer pushUp;
    private Double weightLifted;
    private String description;
    private MediaEntity mediaEntity;
}
