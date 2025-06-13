// import { model, Schema, Document } from 'mongoose';
// import { Galleries } from '@interfaces/gallery.interface'

// const gallerySchema: Schema = new Schema({
//     url: String,
//     is_active: {
//         type: Boolean,
//         default: true
//     },
//     created_at: {
//         type: Date,
//         default: Date.now
//     },
//     updated_at: {
//         type: Date,
//         default: Date.now
//     }
// })

// gallerySchema.post('init', doc => {
//     doc.url = process.env.AWS_PROD_URL + '/' + doc.url
// })

// const galleryModel = model<Galleries & Document>('gallery', gallerySchema);

// export default galleryModel