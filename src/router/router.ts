import { Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/heroes', (req: Request, res: Response) => {


    const query = `
      SELECT *
      FROM heroes`;

    MySQL.ejecutarQuery( query, (err:any, heroes: Object[]) => {

        if (err) {
            res.status(400).json({
                ok:false,
                error:err
            });
        } else {
            res.json({
                ok:true,
                heroes: heroes
            });
        }
    });

});

export default router;