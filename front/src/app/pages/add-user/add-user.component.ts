import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {defaultsDeep} from 'lodash';
import {Router} from '@angular/router';
import {CvService} from '../../services/cv.service';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

    constructor(private userService: UserService, private cvService: CvService, private authService: AuthService,
                private router: Router) {}

    // EventEmitter to know when the user want to go back to the SignIn panel
    @Output() wantedToSignUp = new EventEmitter<boolean>();

    userForm: FormGroup; // SignUp form
    errorMessage: string; // error message if the email already exists in db
    hide = true; // variable for the password visibility


    ngOnInit(): void {
        this.userForm = new FormGroup({
            firstname: new FormControl('', Validators.required),
            lastname: new FormControl('', Validators.required),
            age: new FormControl(''),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        })
    }

    /**
     * EventEmitter to quit SignUp and go to SignIn
     */
    wantToSignUp() {
        this.wantedToSignUp.emit(false);
    }

    /**
     * Submit of the SignUp form
     */
    onSubmit() {
        // Get credentials (email and pwd)
        let credentials = defaultsDeep({
            email: this.userForm.value.email,
            password: this.userForm.value.password
        })
        // Creation of secure credentials (will be stored in db : hash and salt)
        // Check in backend if email is unique
        this.userService.createCredentials(credentials).subscribe(
            credentialsSecurise => {
                credentials = credentialsSecurise;
                if (credentials == null) {
                    this.errorMessage = 'A user with this email address already exist.';
                } else {
                    const cv = defaultsDeep({});
                    // Creation of an empty CV, get its id to set it in the user table
                    this.cvService.addCv(cv).subscribe(cv => {
                        const userNew = defaultsDeep({
                            id: null,
                            firstName: this.userForm.value.firstname,
                            lastName: this.userForm.value.lastname,
                            age: this.userForm.value.age,
                            email: this.userForm.value.email,
                            hash: credentials.hash,
                            salt: credentials.salt,
                            idCv: cv.id
                        });
                        // add new user
                        this.userService.addUser(userNew).subscribe(user => {
                            // set of the current user
                            this.authService.setCurrentUser(user);
                            this.router.navigateByUrl(`/cv-template`).then();
                        });
                    });
                }
            }
        )
    }

    get firstname() {
        return this.userForm.get('firstname')
    }

    get lastname() {
        return this.userForm.get('lastname')
    }

    get email() {
        return this.userForm.get('email')
    }

    get password() {
        return this.userForm.get('password')
    }

}
