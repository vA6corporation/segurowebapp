import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { UserModel } from 'src/app/users/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService, 
    private readonly formBuilder: UntypedFormBuilder,
    private readonly navigationService: NavigationService,
  ) { }
  
  public loginForm: UntypedFormGroup = this.formBuilder.group({
    email: [ '', [Validators.required, Validators.email] ],
    password: [ '', [Validators.required, Validators.minLength(3)] ],
    rememberme: false,
  });
  private count = 0;

  public version: string = environment.version;
  public isLoading: boolean = false;
  public newLogin: boolean = false;
  private db: IDBDatabase|null = null;
  public rememberUsers: UserModel[] = [];

  ngOnInit(): void { 
    this.navigationService.setTitle('Horvi');
    this.loadDb().then(() => {
      this.loadUsers();
    });
  }

  loadDb(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (indexedDB) {
        const request = indexedDB.open('kramvi', 2);
        request.onsuccess = () => {
          this.db = request.result;
          console.log('OPEN', this.db);
          resolve();
        }

        request.onupgradeneeded = (e) => {
          this.db = request.result;
          console.log('CREATE', this.db);
          if (e.oldVersion < 1) {
            this.db.createObjectStore('rememberUsers', { keyPath: '_id' });
          }
          
          if (e.oldVersion < 2) {
            this.db.createObjectStore('printers', { keyPath: 'name' });
          }
        }

        request.onerror = (error) => {
          console.log('Error', error);
          reject();
        }
      } else {
        reject();
      }
    });
  };

  updateUser(user: UserModel) {
    const transaction = this.db?.transaction(['rememberUsers'], 'readwrite');
    const objectStore = transaction?.objectStore('rememberUsers');
    objectStore?.put(user);
  }

  onDeleteUser(userId: string, event: MouseEvent) {
    event.stopPropagation();
    const ok = confirm('Esta seguro de eliminar?...');
    if (ok && this.db !== null) {
      const transaction = this.db.transaction(['rememberUsers'], 'readwrite');
      const objectStore = transaction.objectStore('rememberUsers');
      const request = objectStore.delete(userId);
      request.onsuccess = () => {
        this.loadUsers();
      }
    }
  }

  getUser(userId: string): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      if (this.db !== null) {
        const transaction = this.db.transaction(['rememberUsers'], 'readonly');
        const objectStore = transaction.objectStore('rememberUsers');
        const request = objectStore.get(userId);
  
        request.onsuccess = () => {
          resolve(request.result);
        }
      }
    });
  };

  loadUsers() {
    if (this.db !== null) {
      const transaction = this.db.transaction(['rememberUsers'], 'readonly');
      const objectStore = transaction.objectStore('rememberUsers');
      const request = objectStore.openCursor();
      const rememberUsers: UserModel[] = [];
      request.onsuccess = (e: any) => {
        const cursor = e.target.result;
        if (cursor) {
          rememberUsers.push(cursor.value);
          console.log(cursor.value);
          cursor.continue();
        } else {
          this.rememberUsers = rememberUsers;
        }
      }
    }
  };

  onUserSelected(user: UserModel) {
    this.loginForm.patchValue(user);
    this.onSubmit();
  }

  onDeploy() {
    if (this.count >= 5) {
      this.router.navigate(['signup']);
    }
    this.count += 1;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      const { email, password, rememberme } = this.loginForm.value;
      this.authService.login(email, password).subscribe(res => {
        console.log(res);
        const { accessToken, userId, name, email, isAdmin } = res;
        if (rememberme) {
          const user: UserModel = {
            _id: userId,
            isAdmin,
            name,
            email,
            password,
          } 
          this.updateUser(user);
        }
        this.isLoading = false;
        this.authService.setAccessToken(accessToken);
        this.navigationService.loadBarFinish();
        this.router.navigate(['/setOffice']).then(() => {
          location.reload();
        });
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage('Usuario o contraseña incorrectos');
      });
    }
  }
}
