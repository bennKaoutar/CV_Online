package io.takima.demo.controller;

import io.takima.demo.model.Mail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mail")
@CrossOrigin
public class EmailController {

    @Autowired
    private JavaMailSender javaMailSender;

    @PostMapping
    public Mail sendMail(@RequestBody Mail mail) {
        SimpleMailMessage msg = new SimpleMailMessage();

        msg.setTo(mail.getEmailReceiver()); // email address of the cv's owner
        msg.setSubject(mail.getSubject());

        // template of generic message
        msg.setText("Vous avez reçu un message de : " + mail.getNameSender() +
                "\nSon l'adresse email : " + mail.getEmailSender() +
                "\n\n Message : \n\n" + mail.getMessage());

        javaMailSender.send(msg);
        return mail;
    }
}
