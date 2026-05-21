/* eslint-disable no-useless-escape */
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%\^&*\(\)_+\-=\[\]\{\};:'",.<>?\/|\\`]).*$/;
export const EMAIL_REGEX = /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+\-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/;
