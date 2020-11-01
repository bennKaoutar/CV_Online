import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {defaultsDeep} from 'lodash';
import {Router} from '@angular/router';
import {CvService} from '../../services/cv.service';
import {Cv} from '../../models/cv.model';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
    private errorMessage: string;

    constructor(private userService: UserService, private cvService: CvService, private authService: AuthService, private router: Router) {
    }

    @Output() wantedToSignUp = new EventEmitter<boolean>();
    userForm: FormGroup;
    hide = true;
    newCv: Cv;

    ngOnInit(): void {
        this.userForm = new FormGroup({
            firstname: new FormControl('', Validators.required),
            lastname: new FormControl('', Validators.required),
            age: new FormControl(''),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        })
    }

    wantToSignUp() {
        this.wantedToSignUp.emit(false);
    }

    onSubmit() {
        let credentials = defaultsDeep({
            email: this.userForm.value.email,
            password: this.userForm.value.password
        })
        this.userService.createCredentials(credentials).subscribe(
            credentialsSecurise => {
                credentials = credentialsSecurise;
                if (credentials == null) {
                    this.errorMessage = 'A user with this email address already exist.';
                } else {
                    const cv = defaultsDeep({});
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
                        this.userService.addUser(userNew).subscribe(user => {
                            this.authService.setCurrentUser(user);
                            console.log(this.authService.getCurrentUser());
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
