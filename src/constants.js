export const LOGIN_STATUS = {
    PENDING: 'pending',
    NOT_LOGGED_IN: 'notLoggedIn',
    IS_LOGGED_IN: 'loggedIn',
  };
  
  export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
    REQUIRED_QUESTION: 'required-question',
    QUESTION_MISSING: 'noSuchId', 
  };
  
  export const CLIENT = {
    NETWORK_ERROR: 'networkError',
    NO_SESSION: 'noSession',
    UNKNOWN_ACTION: 'unknownAction',
    NO_QUESTION: 'no-question',
  };
  
  export const MESSAGES = {
    [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network. Please try again',
    [CLIENT.NO_QUESTION]: 'Please select the question to test',
    [SERVER.AUTH_INSUFFICIENT]: 'Your username/password combination does not match any records, please try again.',
    [SERVER.REQUIRED_USERNAME]: 'Please enter a valid (letters and/or numbers) username',
    [SERVER.REQUIRED_QUESTION]: 'Please enter the question to add',
    default: 'Something went wrong.  Please try again',
  };
  
  export const ACTIONS = {
    LOG_IN: 'logIn',
    LOG_OUT: 'logOut',
    START_LOADING_CARDS: 'startLoadingCards',
    REPLACE_CARDS: 'replaceCards',
    REPORT_ERROR: 'reportError',
    TOGGLE_CARD: 'toggleCard',
    DELETE_CARD: 'deleteCard',
    ADD_CARD: 'addCard',
  };