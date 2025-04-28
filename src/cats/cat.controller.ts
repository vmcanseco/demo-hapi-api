import { Request, ResponseToolkit } from '@hapi/hapi';
import { CatService } from './cat.service';
import { Cat } from './cat.entity';

export class CatController {
  constructor(private catService: CatService) {}

  async createCat(request: Request, h: ResponseToolkit){
    const catData: Cat = request.payload as Cat;
    const newCat = await this.catService.create(catData);
    return h.response(newCat).code(201);
  }

  async getCats(request: Request, h: ResponseToolkit): Promise<Cat[]> {
    return this.catService.findAll();
  }

  async getCatById(request: Request, h: ResponseToolkit){
    const catId = parseInt(request.params.id);
    const cat = await this.catService.findOne(catId);
    if (!cat) {
      return h.response().code(404);
    }
    return cat;
  }

  async updateCat(request: Request, h: ResponseToolkit) {
    const catId = parseInt(request.params.id);
    const catData: Cat = request.payload as Cat;
    const updatedCat = await this.catService.update(catId, catData);
    if (!updatedCat) {
      return h.response().code(404);
    }
    return updatedCat;
  }

  async deleteCat(request: Request, h: ResponseToolkit) {
    const catId = parseInt(request.params.id);
    const deleted = await this.catService.remove(catId);
    if (!deleted) {
      return h.response().code(404);
    }
    return h.response().code(204);
  }
}