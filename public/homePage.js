'use strict';

const logoutButton = new LogoutButton();
const ratesDoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();

// Выход из личного кабинета
const logoutApiConnectorCallback = (responce) => {
  if (responce.success) {
    location.reload();
  }
}

logoutButton.action = () => {
  ApiConnector.logout(logoutApiConnectorCallback);
}

// Получение информации о пользователе
const getCurrentUserApiConnectorCallback = (responce) => {
  if (responce.success) {
    ProfileWidget.showProfile(responce.data);
  }
}

ApiConnector.current(getCurrentUserApiConnectorCallback);

// Получение текущих курсов валюты
const getStocksApiConnectorCallback = (responce) => {
  if (responce.success) {
    ratesDoard.clearTable();
    ratesDoard.fillTable(responce.data);
  }
};

const getRates = () => {
  ApiConnector.getStocks(getStocksApiConnectorCallback)
};

getRates();
setInterval(getRates, 60000);

// Операции с деньгами
const moneyManagerApiConnectorCallback = (responce) => {
  if (responce.success) {
    ProfileWidget.showProfile(responce.data);
    moneyManager.setMessage(true, 'Успешно выполнено!');
  } else {
    moneyManager.setMessage(false, responce.error);
  }
};

// Пополнение баланса
moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, moneyManagerApiConnectorCallback);
}

// Реализация конвертирования валюты
moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, moneyManagerApiConnectorCallback);
}

// Перевод валюты
moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, moneyManagerApiConnectorCallback)
}

// Работа с избранным
// Запрос начального списка избранного
const getCurrentFavoritesApiConnectorCallback = (responce) => {
  if (responce.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(responce.data);
    moneyManager.updateUsersList(responce.data);
    favoritesWidget.setMessage(true, 'Успешно!');
  } else {
    favoritesWidget.setMessage(false, responce.error);
  }
}

ApiConnector.getFavorites(getCurrentFavoritesApiConnectorCallback);

// Реализация добавления пользователя в список избранных
favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, getCurrentFavoritesApiConnectorCallback);
}

// Удаляем из избранного
favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, getCurrentFavoritesApiConnectorCallback);
}
