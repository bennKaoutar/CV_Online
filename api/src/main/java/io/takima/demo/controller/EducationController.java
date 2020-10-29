package io.takima.demo.controller;

import io.takima.demo.dao.EducationDAO;
import io.takima.demo.model.Education;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/education")
@CrossOrigin
public class EducationController {

    private final EducationDAO educationDAO;

    public EducationController(EducationDAO educationDAO) {
        this.educationDAO = educationDAO;
    }

    @PostMapping()
    public Education addEducation(@RequestBody Education education) {
        return this.educationDAO.save(education);
    }

}
