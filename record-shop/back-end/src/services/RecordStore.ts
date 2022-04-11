import Records, { recordsZodSchema } from '../interfaces/Records';
import Service, { ServiceError } from '.';
import RecordStoreModel from '../models/Records';

class RecordStoreService extends Service<Records> {
  constructor(model = new RecordStoreModel()) {
    super(model);
  }

  create = async (
    obj: Records,
  ):
  Promise<Records | ServiceError | null> => {
    const parsed = recordsZodSchema.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  };
}

export default RecordStoreService;