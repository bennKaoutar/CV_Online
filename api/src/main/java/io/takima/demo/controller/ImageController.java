package io.takima.demo.controller;


import io.takima.demo.dao.ImageDAO;
import io.takima.demo.model.Image;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/image")
@CrossOrigin
public class ImageController {

    private final ImageDAO imageDAO;

    public ImageController(ImageDAO imageDAO) {this.imageDAO = imageDAO;}

    @PostMapping("/upload")
    public Image uploadImage (@RequestParam("myFile") MultipartFile file) throws IOException {
        Image img = new Image(null, file.getOriginalFilename(), file.getContentType(), file.getBytes());
        return imageDAO.save(img);
    }

    @GetMapping("/{id}")
    public Image getImage(@PathVariable Long id){
        return this.imageDAO.findById(id).orElseThrow(NoSuchElementException::new);
    }


}
