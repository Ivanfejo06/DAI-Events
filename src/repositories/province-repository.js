import DBConfig from './../configs/dbconfig.js';
import pkg from 'pg';
import Province from '../entities/province.js';
const { Client } = pkg;

export default class ProvinceRepository{

    getAllAsync = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try{
            await client.connect();
            const sql = 'SELECT * FROM provinces';
            const result = await client.query(sql);
            returnArray = result.rows;
        }
        catch (error){
            console.log(error);
        }
        finally {
            await client.end();
        }
        return returnArray;
    }
    
    getByIdAsync = async (id) => {
        let returnObject = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM provinces WHERE id = ' + id;
            const result = await client.query(sql);
            returnObject = result.rows[0];
        } catch (error) {
            console.log(error);
        }
        finally {
            await client.end();
        }
        return returnObject;
    }
    
    createAsync = async (Province) => {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const { name, full_name, latitude, longitude, display_order } = Province;
            console.log(Province);
    
            // En lugar de incluir el ID en la inserción, dejamos que la base de datos genere automáticamente el ID
            const sql = 'INSERT INTO provinces (name, full_name, latitude, longitude, display_order) VALUES ($1, $2, $3, $4, $5) RETURNING *';
            const result = await client.query(sql, [name, full_name, latitude, longitude, display_order]);
    
            return result.rows[0];
        } catch (error) {
            console.log(error);
        } finally {
            await client.end();
        }
    }       
    
    updateAsync = async (Province) => {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const { id, name, full_name, latitude, longitude, display_order } = Province;
            const sql = 'UPDATE provinces SET name = $1, full_name = $2, latitude = $3, longitude = $4, display_order = $5 WHERE id = $6 RETURNING *';
            const result = await client.query(sql, [name, full_name, latitude, longitude, display_order, id]);
            if(result.rowCount == 0){
                return false;
            }
            return true;
        } catch (error) {
            console.log(error);
        }
        finally {
            await client.end();
        }
    }
    
    deleteByIdAsync = async (id) => { 
        const client = new Client(DBConfig);
        try{
            await client.connect();
            //Eliminar provincia.
            const deleteProvinceSql = `DELETE FROM provinces WHERE id = $1`
            const deleteProvinceValues = [id];
            const deleteProvinceResult = await client.query(deleteProvinceSql, deleteProvinceValues);
            if(deleteProvinceResult.rowCount == 0){
                return false;
            }
            return true
        }   
        catch(error){
            console.log(error);
            return null;
        }
        finally {
            await client.end();
        }
    }
}