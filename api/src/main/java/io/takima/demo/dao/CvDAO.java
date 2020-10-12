package io.takima.demo.dao;

import io.takima.demo.model.Cv;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 *
 */
@Repository
public interface CvDAO extends CrudRepository<Cv, Long> {

}