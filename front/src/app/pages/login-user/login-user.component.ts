import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {defaultsDeep} from 'lodash';
import firebase from 'firebase/app';
import 'firebase/auth';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-login-user',
    templateUrl: './login-user.component.html',
    styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

    @Output() wantedToSignUp = new EventEmitter<boolean>();
    loginForm: FormGroup;
    hidePassword = true;

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        })
    }

    wantToSignUp() {
        this.wantedToSignUp.emit(true);
    }

    onSubmit() {

        let tokenUser: string;
        firebase.auth().signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
            .then(() => {
                firebase.auth().currentUser.getIdToken().then((idToken) => {
                    // Send token to your backend via HTTPS
                    console.log(idToken)
                    tokenUser = idToken;
                }).catch((error) => {
                    // Handle error
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });

        const user = defaultsDeep({
            id: null,
            firstName: 'cecile',
            lastName: 'vhp',
            age: null,
            email: this.loginForm.value.email,
            password: this.loginForm.value.password,
            token: tokenUser
        });

        this.userService.addUserToken(user).subscribe(user => console.log(user));

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                const displayName = user.displayName;
                const email = user.email;
                const uid = user.uid;
                console.log(displayName, email, uid);
            } else {
                // User is signed out.
                // ...
            }
        });

        const login = defaultsDeep({
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        });
    }

    get email() {
        return this.loginForm.get('email')
    }

    get password() {
        return this.loginForm.get('password')
    }
}
