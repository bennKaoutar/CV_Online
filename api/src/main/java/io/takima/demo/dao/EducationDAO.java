package io.takima.demo.dao;

import io.takima.demo.model.Education;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EducationDAO extends CrudRepository<Education, Long> {

}