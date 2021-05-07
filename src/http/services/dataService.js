import http from "../httpCommon";

class DataService {
    getAll(serviceName) {
        return http.get(`/${serviceName}`);
    }

    get(serviceName, id) {
        return http.get(`/${serviceName}/${id}`);
    }

    create(serviceName, data) {
        return http.post(`/${serviceName}`, data);
    }

    update(serviceName, id, data) {
        return http.put(`/${serviceName}/${id}`, data);
    }

    delete(serviceName, id) {
        return http.delete(`/${serviceName}/${id}`);
    }

    deleteAll(serviceName) {
        return http.delete(`/${serviceName}`);
    }

    findByName(serviceName, name) {
        return http.get(`/${serviceName}?name=${name}`);
    }
}

export default new DataService();