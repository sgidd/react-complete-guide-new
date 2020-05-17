import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-complete-guide-new.firebaseio.com/'
});

export default instance;