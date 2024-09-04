package com.spring.social_media_application.repository;

import com.spring.social_media_application.entity.WorkoutStatusMedia;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WorkoutStatusMediaRepository extends MongoRepository<WorkoutStatusMedia, String> {
}
