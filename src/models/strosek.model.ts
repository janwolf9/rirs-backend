import mongoose from "mongoose";

const strosekSchema = new mongoose.Schema({
    id: {type: String},
    naziv: { type: String, required: true },
    znesek: { type: Number, required: true },
    datum: { 
      type: String, 
      required: [true, 'Datum je obvezen.'],
      validate: {
        validator: (value: any) =>  {
          return !isNaN(new Date(value).getTime());
        },
        message: 'Datum mora biti veljaven.',
    }, },
    kategorija: { type: String, required: true },
    oseba: {type: String, required: true},
    nacinPlacila: {type: String, required: true},
    komentar: {type: String}
  });
  
  export const Strosek = mongoose.model('Strosek', strosekSchema);
  