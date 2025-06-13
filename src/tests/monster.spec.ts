import request from 'supertest';
import App from '../app';
import monsterModel from '../models/monster.model';
import MonsterController from '../controllers/monster.controller';
afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Monster', () => {
  describe('[GET] /monster', () => {
    it('response should have status 200', () => {
      const app = new App([MonsterController]);
      monsterModel.find = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          resolve([]);
        });
      });
      return request(app.getServer()).get('/api/monster').expect(200, { status: true, data: [] });
    });
  });

  describe('[GET] /monster/:id', () => {
    const monster_id = '62a00ae6e28ca73a84d6a942';
    it('valid monster_id should response 200 and Monster data', () => {
      const app = new App([MonsterController]);

      const mockData = {
        name: 'Vampire',
        description:
          'Though their portrayals will vary across culture — from brooding sexy ones in Twilight and Anne Rice novels to terrifying monstrous Count Orlok in Nosferatu — there are a few things that remain the same: vampires feed on the living to remain immortal, they avoid sunlight, and their hearts are vulnerable to sharp objects — you know, just like you and me. Often a metaphor for the dangers of sexual desire, vampires have remained firmly in the cultural consciousness for over a hundred and fifty years.',
        type: 'type1',
        hp: 100,
        mp: 100,
        element: 'demon',
        status: [
          {
            status_type: 'type1',
            value: 100,
          },
        ],
        drop_item: [
          {
            drop_item_type: 'type1',
            item_id: '629f3118d6d57ac0dcb12fe1',
            drop_percent: 100,
          },
        ],
        exp: 350,
        model_id: 'model1',
      };

      monsterModel.findById = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          resolve(mockData);
        });
      });
      return request(app.getServer()).get(`/api/monster/${monster_id}`).expect(200, {
        status: true,
        data: mockData,
      });
    });

    it("invalid monster_id should not 404 and message 'Monster not found'", () => {
      const monster_id = 'invalid_monster_id';
      const app = new App([MonsterController]);
      monsterModel.findById = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          resolve(null);
        });
      });

      return request(app.getServer()).get(`/api/monster/${monster_id}`).expect(404, {
        message: 'Monster not found',
      });
    });
  });

  describe('[POST] /monster', () => {
    it('create monster correctly status 200', () => {
      const app = new App([MonsterController]);
      const mockData = {
        name: 'Vampire',
        description:
          'Though their portrayals will vary across culture — from brooding sexy ones in Twilight and Anne Rice novels to terrifying monstrous Count Orlok in Nosferatu — there are a few things that remain the same: vampires feed on the living to remain immortal, they avoid sunlight, and their hearts are vulnerable to sharp objects — you know, just like you and me. Often a metaphor for the dangers of sexual desire, vampires have remained firmly in the cultural consciousness for over a hundred and fifty years.',
        type: 'type1',
        hp: 100,
        mp: 100,
        element: 'demon',
        status: [
          {
            status_type: 'type1',
            value: 100,
          },
        ],
        drop_item: [
          {
            drop_item_type: 'type1',
            item_id: '629f3118d6d57ac0dcb12fe1',
            drop_percent: 100,
          },
        ],
        exp: 350,
        model_id: 'model1',
      };
      monsterModel.create = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          resolve(mockData);
        });
      });

      return request(app.getServer()).post('/api/monster').send(mockData).expect(200, { status: true, data: mockData });
    });

    it('Create monster catch function from database should return 500', () => {
      const app = new App([MonsterController]);
      const mockData = {
        name: 'Vampire',
        description:
          'Though their portrayals will vary across culture — from brooding sexy ones in Twilight and Anne Rice novels to terrifying monstrous Count Orlok in Nosferatu — there are a few things that remain the same: vampires feed on the living to remain immortal, they avoid sunlight, and their hearts are vulnerable to sharp objects — you know, just like you and me. Often a metaphor for the dangers of sexual desire, vampires have remained firmly in the cultural consciousness for over a hundred and fifty years.',
        type: 'type1',
        hp: 100,
        mp: 100,
        element: 'demon',
        status: [
          {
            status_type: 'type1',
            value: 100,
          },
        ],
        drop_item: [
          {
            drop_item_type: 'type1',
            item_id: '629f3118d6d57ac0dcb12fe1',
            drop_percent: 100,
          },
        ],
        exp: 350,
        model_id: 'model1',
      };
      monsterModel.create = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          reject('Database Error');
        });
      });

      return request(app.getServer()).post('/api/monster').send(mockData).expect(500, { message: 'Something went wrong' });
    });
  });

  describe('[PUT] /monster/:id', () => {
    it('Update data correctly should return 200', () => {
      const monster_id = '62a00ae6e28ca73a84d6a942';

      const app = new App([MonsterController]);
      const mockData = {
        name: 'Vampire new Model',
        description:
          'Though their portrayals will vary across culture — from brooding sexy ones in Twilight and Anne Rice novels to terrifying monstrous Count Orlok in Nosferatu — there are a few things that remain the same: vampires feed on the living to remain immortal, they avoid sunlight, and their hearts are vulnerable to sharp objects — you know, just like you and me. Often a metaphor for the dangers of sexual desire, vampires have remained firmly in the cultural consciousness for over a hundred and fifty years.',
        type: 'type1',
        hp: 100,
        mp: 100,
        element: 'demon',
        status: [
          {
            status_type: 'type1',
            value: 100,
          },
        ],
        drop_item: [
          {
            drop_item_type: 'type1',
            item_id: '629f3118d6d57ac0dcb12fe1',
            drop_percent: 100,
          },
        ],
        exp: 350,
        model_id: 'model1',
      };

      monsterModel.findById = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          resolve(mockData);
        });
      });

      monsterModel.findByIdAndUpdate = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          resolve(mockData);
        });
      });

      return request(app.getServer()).put(`/api/monster/${monster_id}`).send(mockData).expect(200, { status: true, data: mockData });
    });

    it('Update Monster catch function from database should return 500', () => {
      const monster_id = '62a00ae6e28ca73a84d6a942';

      const app = new App([MonsterController]);
      const mockData = {
        name: 'Vampire new Model',
        description:
          'Though their portrayals will vary across culture — from brooding sexy ones in Twilight and Anne Rice novels to terrifying monstrous Count Orlok in Nosferatu — there are a few things that remain the same: vampires feed on the living to remain immortal, they avoid sunlight, and their hearts are vulnerable to sharp objects — you know, just like you and me. Often a metaphor for the dangers of sexual desire, vampires have remained firmly in the cultural consciousness for over a hundred and fifty years.',
        type: 'type1',
        hp: 100,
        mp: 100,
        element: 'demon',
        status: [
          {
            status_type: 'type1',
            value: 100,
          },
        ],
        drop_item: [
          {
            drop_item_type: 'type1',
            item_id: '629f3118d6d57ac0dcb12fe1',
            drop_percent: 100,
          },
        ],
        exp: 350,
        model_id: 'model1',
      };

      monsterModel.findById = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          reject('Database Error');
        });
      });

      monsterModel.findByIdAndUpdate = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          reject('Database Error');
        });
      });

      return request(app.getServer()).put(`/api/monster/${monster_id}`).send(mockData).expect(500, { message: 'Something went wrong' });
    });
  });

  describe('[DELETE] /monster/:id', () => {
    it("valid monster_id should be return status 200 and message 'deleted'", () => {
      const monster_id = '62a00ae6e28ca73a84d6a942';
      const app = new App([MonsterController]);
      const mockData = {
        name: 'Vampire',
        description:
          'Though their portrayals will vary across culture — from brooding sexy ones in Twilight and Anne Rice novels to terrifying monstrous Count Orlok in Nosferatu — there are a few things that remain the same: vampires feed on the living to remain immortal, they avoid sunlight, and their hearts are vulnerable to sharp objects — you know, just like you and me. Often a metaphor for the dangers of sexual desire, vampires have remained firmly in the cultural consciousness for over a hundred and fifty years.',
        type: 'type1',
        hp: 100,
        mp: 100,
        element: 'demon',
        status: [
          {
            status_type: 'type1',
            value: 100,
          },
        ],
        drop_item: [
          {
            drop_item_type: 'type1',
            item_id: '629f3118d6d57ac0dcb12fe1',
            drop_percent: 100,
          },
        ],
        exp: 350,
        model_id: 'model1',
      };
      monsterModel.findById = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          resolve(mockData);
        });
      });

      monsterModel.findByIdAndUpdate = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          resolve(mockData);
        });
      });

      return request(app.getServer()).delete(`/api/monster/${monster_id}`).expect(200, { status: true, message: 'deleted' });
    });

    it("invalid monster_id should be return status 404 and message 'Monster not found'", () => {
      const monster_id = '62a00ae6e28ca73a84d6a942';
      const app = new App([MonsterController]);

      monsterModel.findById = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          resolve(null);
        });
      });

      return request(app.getServer()).delete(`/api/monster/${monster_id}`).expect(404, { message: 'Monster not found' });
    });

    it('invalid monster_id but catch function from database should be return status 500', () => {
      const monster_id = '62a00ae6e28ca73a84d6a942';
      const app = new App([MonsterController]);

      monsterModel.findById = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          reject('Database Error');
        });
      });

      return request(app.getServer()).delete(`/api/monster/${monster_id}`).expect(500, { message: 'Something went wrong' });
    });
  });
});
