package io.takima.demo.controller;


import io.takima.demo.dao.CustomDAO;
import io.takima.demo.model.Custom;
import org.springframework.web.bind.annotation.*;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/custom")
@CrossOrigin
public class CustomController {

    private final CustomDAO customDAO;

    public CustomController(CustomDAO customDAO){this.customDAO = customDAO;};

    @PostMapping()
    public Custom setCustom (@RequestBody Custom custom) {
        return customDAO.save(custom);
    }

    @GetMapping("/{id}")
    public Custom getCustom (@PathVariable Long id){
        return this.customDAO.findById(id).orElseThrow(NoSuchElementException::new);
    }
}
