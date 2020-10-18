package io.takima.demo.controller;

import io.takima.demo.dao.CvDAO;
import io.takima.demo.model.Cv;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/cvs")
@CrossOrigin
public class CvController {

    private final CvDAO cvDAO;

    public CvController(CvDAO cvDAO) {
        this.cvDAO = cvDAO;
    }

    @GetMapping()
    public List<Cv> getCvs() {
        Iterable<Cv> it = this.cvDAO.findAll();
        List<Cv> cvs = new ArrayList<>();
        it.forEach(e -> cvs.add(e));
        return cvs;
    }

    @GetMapping("/{id}")
    public Cv getCv(@PathVariable Long id) {
       return this.cvDAO.findById(id).orElseThrow(NoSuchElementException::new);
    }

    @PostMapping()
    public Cv addCv(@RequestBody Cv cv) {
        return this.cvDAO.save(cv);
    }

}
