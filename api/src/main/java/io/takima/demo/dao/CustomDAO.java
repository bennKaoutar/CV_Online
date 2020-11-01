package io.takima.demo.dao;

import io.takima.demo.model.Custom;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomDAO extends CrudRepository<Custom, Long> {
}
