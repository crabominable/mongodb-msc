import { Schema, model as createModel, Document } from 'mongoose';
import Records from '../interfaces/Records';
import MongoModel from './MongoModel';

interface RecordsDocument extends Records, Document { }

const recordsSchema = new Schema<RecordsDocument>({
  title: String,
  artist: String,
  format: String,
  yearPublished: Number,
  new: Boolean,
});

class RecordsModel extends MongoModel<Records> {
  constructor(model = createModel('Records', recordsSchema)) {
    super(model);
  }
}

export default RecordsModel;