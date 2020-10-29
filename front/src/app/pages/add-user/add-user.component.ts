import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {defaultsDeep} from 'lodash';
import {Router} from '@angular/router';
import firebase from 'firebase';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

    constructor(private userService: UserService, private router: Router) {
    }

    @Output() wantedToSignUp = new EventEmitter<boolean>();
    userForm: FormGroup;
    hide = true;

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
        // console.log(this.userForm.value);
        const promise = firebase.auth().createUserWithEmailAndPassword(this.userForm.value.email, this.userForm.value.password)
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
        promise.then(() => {
            const userFirebase = firebase.auth().currentUser;

            userFirebase.updateProfile({
                displayName: 'Jane Q. User',
                photoURL: 'https://example.com/jane-q-user/profile.jpg'
            }).then(() => {
                // Update successful.
            }).catch((error) => {
                // An error happened.
            });
        });
        console.log(promise)



        const user = defaultsDeep({
            id: null,
            firstName: this.userForm.value.firstname,
            lastName: this.userForm.value.lastname,
            age: this.userForm.value.age,
            email: this.userForm.value.email,
            password: this.userForm.value.password
        });

        this.userService.addUser(user).subscribe(user => console.log(user));
        this.router.navigateByUrl('/');
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
