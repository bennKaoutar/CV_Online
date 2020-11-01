package io.takima.demo.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.takima.demo.dao.CvDAO;
import io.takima.demo.model.Cv;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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

    // -------------------- GET SECTION
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

    // -------------------- POST SECTION
    @PostMapping()
    public Cv addCv(@RequestBody Cv cv) {
        return this.cvDAO.save(cv);
    }

}
