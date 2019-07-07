import localforage from 'localforage';
import configs from 'configs';

localforage.config({
  driver: localforage.LOCALSTORAGE,
  name: configs.contextPath,
});


export default localforage;
