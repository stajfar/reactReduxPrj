import axios from 'axios';

export default axios.create({
    //to start the json-server run following command line:
    //json-server --watch data/db.json --port 3500
    //fake json posts are at: (add {} yourself): https://jsonplaceholder.typicode.com/posts
    //baseURL:"https://angulartest-c5f6c-default-rtdb.firebaseio.com"
    baseURL: "http://localhost:3500"

});