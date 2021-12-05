import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: 'e00c260ec6ca404a907d3198e17cdf10', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
