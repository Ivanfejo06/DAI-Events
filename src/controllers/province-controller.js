import { Router } from 'express';
import ProvinceService from '../services/province-service.js';
import Province from '../entities/province.js';
const router = Router();
const svc = new ProvinceService();

// GET "/api/province" ANDA
router.get('', async (req, res) => {
    try {
        const returnArray = await svc.getAllAsync();
        if (returnArray != null) {
            return res.status(200).json(returnArray);
        } else {
            return res.status(500).send('Error Interno');
        }
    } catch (error) {
        return res.status(500).send('Error Interno');
    }
});

// GET "/api/province/:id" ANDA
router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const returnObject = await svc.getByIdAsync(id);
        if (returnObject) {
            return res.status(200).json(returnObject);
        } else {
            return res.status(404).send('Not Found');
        }
    } catch (error) {
        return res.status(500).send('Error Interno');
    }
});

// POST "/api/province" CASI ANDA (Crea nulls y para el servidor)
router.post('', async (req, res) => {
    try {
        const newProvince = await svc.createAsync(new Province(req.body.name, req.body.full_name, req.body.latitude, req.body.longitude, req.body.display_order));
        return res.status(201).json(newProvince).send("Provincia creada exitosamente");
    } catch (error) {
        return res.status(500).send('Error Interno');
    }
});


// PUT "/api/province" CASI ANDA (Reconoce nulls desde el postman)
router.put('', async (req, res) => {
    try {
        const updatedEntity = await svc.updateAsync(new Province(req.body.id, req.body.name, req.body.full_name, req.body.latitude, req.body.longitude, req.body.display_order));
        console.log(new Province(req.body.id, req.body.name, req.body.full_name, req.body.latitude, req.body.longitude, req.body.display_order));
        if (updatedEntity) {
            return res.status(200).json(updatedEntity).send("Provincia actualizada exitosamente");
        } else {
            return res.status(404).send('Not Found');
        }
    } catch (error) {
        return res.status(400).send('Error Interno');
    }
});

// DELETE "/api/province/:id" ANDA
router.delete('/:id', async (req, res) => {
    try {
        const success = await svc.deleteByIdAsync(parseInt(req.params.id));
        if (success) {
            return res.status(200).send('Provincia Eliminada');
        } else {
            return res.status(404).send('Not Found');
        }
    } catch (error) {
        return res.status(500).send('Error Interno');
    }
});

export default router;