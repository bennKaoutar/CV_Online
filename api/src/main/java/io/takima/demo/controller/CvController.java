package io.takima.demo.controller;

import io.takima.demo.dao.CvDAO;
import io.takima.demo.model.Cv;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cvs")
@CrossOrigin
public class CvController {

    private final CvDAO cvDAO;

    public CvController(CvDAO cvDAO) {
        this.cvDAO = cvDAO;
    }

    @PostMapping()
    public Cv addCv(@RequestBody Cv cv) {
        return this.cvDAO.save(cv);
    }

    /*@DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        this.userDAO.deleteById(id);
    }*/

}
