import axios from "axios";
const BASE_URL = "/users";

export default function fetchApi(method, url, _data, commit) {
    const [data, params] = method === "GET" ? [null, _data] : [_data, null];
    commit("setIsLoading", true);
    return axios({
        method,
        baseURL: BASE_URL,
        url,
        data,
        params,
    })
        .then((res) => {
            commit("setIsLoading", false);
            return res.data;
        })
        .catch((err) => {
            commit("setIsLoading", false);
            throw err;
        })

}
