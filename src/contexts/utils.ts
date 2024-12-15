import { ICartItem } from '../interfaces/ICartItem';
import { ILoggedUSerData } from '../interfaces/ILoggedUSerData';
import employeeService from '../services/employeeService';
import loginService from '../services/loginService';
import scheduleService from '../services/scheduleService';
import servicesService from '../services/servicesService';
import userService from '../services/userService';

export function addToken(token: string) {
  userService.setToken(token);
  scheduleService.setToken(token);
  servicesService.setToken(token);
  employeeService.setToken(token);
}

export function removeToken() {
  userService.setToken('');
  scheduleService.setToken('');
  servicesService.setToken('');
}

export function setCartLocalStorage(cart: ICartItem[] | null) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function setUserLocalStorage(user: ILoggedUSerData | null) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function removeUserLocalStorage() {
  localStorage.removeItem('user');
}

export function getCartLocalStorage() {
  const json = localStorage.getItem('cart');
  if (json) {
    const cart = JSON.parse(json);
    return cart ?? null;
  }

  return null;
}

export function getUserLocalStorage() {
  const json = localStorage.getItem('user');

  if (json) {
    const user = JSON.parse(json);
    return user ?? null;
  }

  return null;
}

export async function loginRequest(cpf: string, senha: string) {
  try {
    const response = await loginService.login({ cpf, senha });

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}
