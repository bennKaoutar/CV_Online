package io.takima.demo;

import io.takima.demo.model.Mail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mail")
@CrossOrigin
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    @PostMapping
    public Mail sendMail(@RequestBody Mail mail) {

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(mail.getEmailSender());
        msg.setSubject(mail.getSubject());
        msg.setText("Vous avez reçu un message de :" + mail.getNameSender() + mail.getText());

        javaMailSender.send(msg);
        return mail;

    }
    public void setTo(String s) {
    }

    public void setSubject(String testing_from_spring_boot) {
    }

    public void setText(String s) {
    }
}
