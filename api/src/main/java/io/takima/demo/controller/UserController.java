package io.takima.demo.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.takima.demo.dao.UserDAO;
import io.takima.demo.model.User;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicBoolean;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    private final UserDAO userDAO;

    public UserController(UserDAO userDAO) {
        this.userDAO = userDAO;
    }


    @GetMapping("/fromcv/{id_cv}")
    public List<User> getUserFromCv(@PathVariable Long id_cv) {
        Iterable<User> it = this.userDAO.findAll();
        List<User> users = new ArrayList<>();
        it.forEach(e -> {
            if (Objects.equals(e.getIdCv(), id_cv)) {
                users.add(e);
            }
        });
        return users;
    }

    @PostMapping("/login")
    public List<User> checkUser(@RequestBody ObjectNode credentials) {
        // get credentials
        String email = credentials.get("email").asText();
        String password = credentials.get("password").asText();

        Iterable<User> it = this.userDAO.findAll();
        List<User> users = new ArrayList<>();
        it.forEach(e -> {
            if (Objects.equals(e.getEmail(), email)) { // check if the email is in db
                byte[] salt = e.getSalt(); // if yes, get the salt
                assert salt != null;
                KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, 65536, 128);
                SecretKeyFactory factory = null;
                try {
                    factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
                    byte[] hash = factory.generateSecret(spec).getEncoded(); // do the hash with the same salt as SignUp
                    if (Arrays.equals(e.getHash(), hash)) { // if correspond, authentification valid
                        users.add(e);
                    }
                } catch (NoSuchAlgorithmException | InvalidKeySpecException noSuchAlgorithmException) {
                    noSuchAlgorithmException.printStackTrace();
                }
            }
        });
        return users;
    }

    @PostMapping("/signup")
    public ObjectNode createCredentials(@RequestBody ObjectNode credentials) throws NoSuchAlgorithmException, InvalidKeySpecException {
        // get credentials
        String email = credentials.get("email").asText();
        String password = credentials.get("password").asText();

        Iterable<User> it = this.userDAO.findAll();
        AtomicBoolean emailExist = new AtomicBoolean(false);
        it.forEach(e -> {
            if (Objects.equals(e.getEmail(), email)) { // check if email exist already
                emailExist.set(true);
            }
        });

        if (!emailExist.get()) { //if not, generate a random salt, generate an hash
            SecureRandom random = new SecureRandom();
            byte[] salt = new byte[16];
            random.nextBytes(salt);

            KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, 65536, 128);
            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
            byte[] hash = factory.generateSecret(spec).getEncoded();

            final ObjectMapper mapper = new ObjectMapper();
            final ObjectNode dbCredentials = mapper.createObjectNode();
            dbCredentials.set("hash", mapper.convertValue(hash, JsonNode.class));
            dbCredentials.set("salt", mapper.convertValue(salt, JsonNode.class));

            return dbCredentials;
        } else {
            return null;
        }
    }

    @PostMapping()
    public User addUser(@RequestBody User user) {
        return this.userDAO.save(user);
    }

    @PostMapping("/setpicture/{id}")
    public User setPicture(@RequestBody Long idUser, @PathVariable Long id) {
        User userModified = this.userDAO.findById(idUser).get();
        userModified.setIdImage(id);
        return this.userDAO.save(userModified);
    }

    @PostMapping("/setcustom/{id}")
    public User setCustom(@RequestBody Long idUser, @PathVariable Long id) {
        User userModified = this.userDAO.findById(idUser).get();
        userModified.setIdCustom(id);
        return this.userDAO.save(userModified);
    }


}
