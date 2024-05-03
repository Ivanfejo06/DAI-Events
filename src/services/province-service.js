import ProvinceRepository from "../repositories/province-repository.js";
import Province from '../entities/province.js';

export default class ProvinceService {
    getAllAsync = async () => {
        const repo = new ProvinceRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }
    getByIdAsync = async (id) => {
        const repo = new ProvinceRepository();
        const returnObject = await repo.getByIdAsync(id);
        return returnObject;
    }

    createAsync = async (entity) => {
        const repo = new ProvinceRepository();
        const createdEntity = await repo.createAsync(entity);
        return createdEntity;
    }

    updateAsync = async (entity) => {
        const repo = new ProvinceRepository();
        const updatedEntity = await repo.updateAsync(entity);
        return updatedEntity;
    }

    deleteByIdAsync = async (id) => {
        const repo = new ProvinceRepository();
        const success = await repo.deleteByIdAsync(id);
        return success;
    }
}