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

// POST "/api/province" CASI ANDA (Crea nulls)
router.post('', async (req, res) => {
    const { name, full_name, latitudeM, longitude, display_order } = req.body;

    // Crea un nuevo objeto Province con los datos recibidos del cuerpo de la solicitud
    const newProvince = new Province(name, full_name, latitudeM, longitude, display_order);

    // Llama a la función createAsync con el nuevo objeto Province
    const createdEntity = await svc.createAsync(newProvince);

    // Verifica si la creación fue exitosa y envía la respuesta correspondiente
    if (createdEntity) {
        return res.status(201).json(createdEntity).send("Provincia creada exitosamente");
    } else {
        return res.status(400).send('Error Interno');
    }
});


// PUT "/api/province"
router.put('', async (req, res) => {
    try {
        const updatedEntity = await svc.updateAsync(new Province(req.body.id, req.body.name, req.body.full_name, req.body.latitudeM, req.body.longitude, req.body.display_order));
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