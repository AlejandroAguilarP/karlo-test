import axios from "axios";


const apiUrl = 'http://localhost:3000';

const apiTest = axios.create({
    baseURL: apiUrl,
    headers: {}
})

apiTest.defaults.headers.get['Content-Type'] = 'application/json';
apiTest.defaults.headers.post['Content-Type'] = 'application/json';
apiTest.defaults.headers.put['Content-Type'] = 'application/json';
apiTest.defaults.headers.delete['Content-Type'] = 'application/json';

apiTest.interceptors.request.use(
    async(config) => {
        const token = localStorage.getItem('token');
        if(token){
            config.headers['auth-token'] = token;
        }
        return config;
    }
)

export default apiTest;