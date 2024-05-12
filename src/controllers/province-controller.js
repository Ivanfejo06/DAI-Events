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

// POST "/api/province" CASI ANDA (Para el servidor)
router.post('', async (req, res) => {
    try {
        const { name, full_name, latitude, longitude, display_order } = req.body;

        // Validar parámetros
        const validationError = validateProvinceParams(name, full_name, latitude, longitude, display_order);
        if (validationError) {
            return res.status(400).send(validationError);
        }

        // Crear la provincia si pasa las validaciones
        await svc.createAsync(new Province(name, full_name, latitude, longitude, display_order));
        
        return res.status(201).send("Provincia creada exitosamente");
    } catch (error) {
        return res.status(500).send('Error Interno');
    }
});

// PUT "/api/province" CASI ANDA (Reconoce nulls desde el postman)
router.put('', async (req, res) => {
    try {
        const { id, name, full_name, latitude, longitude, display_order } = req.body;

        // Validar parámetros
        const validationError = validateProvinceParams(name, full_name, latitude, longitude, display_order);
        if (validationError) {
            return res.status(400).send(validationError);
        }

        const updatedEntity = await svc.updateAsync(new Province(id, name, full_name, latitude, longitude, display_order));
        if (updatedEntity) {
            return res.status(200).send("Provincia actualizada exitosamente");
        } else {
            return res.status(404).send('Not Found');
        }
    } catch (error) {
        return res.status(500).send('Error Interno');
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

function validateProvinceParams(name, full_name, latitude, longitude, display_order) {
    if (!name || name.length < 3) {
        return 'El nombre de la provincia debe tener al menos 3 caracteres';
    }
    if (!full_name || full_name.length < 3) {
        return 'El nombre completo de la provincia debe tener al menos 3 caracteres';
    }
    if (typeof latitude !== 'number') {
        return 'La latitud debe ser un número';
    }
    if (typeof longitude !== 'number') {
        return 'La longitud debe ser un número';
    }
    if (typeof display_order !== 'number' || display_order < 0) {
        return 'El orden de visualización debe ser un número positivo';
    }
    // Puedes agregar más validaciones aquí según tus reglas de negocio
    return null; // Si todas las validaciones pasan
}

export default router;
