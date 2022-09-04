'use strict';

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, (responce) => {
    console.log(responce);

    if (responce.success) {
      location.reload();
    } else {
      userForm.setLoginErrorMessage(responce.error);
    }
  });
}

userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, (responce) => {
    console.log(responce);

    if (responce.success) {
      location.reload();
    } else {
      userForm.setRegisterErrorMessage(responce.error);
    }
  });
}