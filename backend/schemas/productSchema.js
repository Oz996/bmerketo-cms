const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    name:           {type: String, required: true},
    price:          {type: String, required: true},
    description:    {type: String, required: true},
    category:       {type: String, required: true},
    image:          {type: String},
    image2:         {type: String},
    image3:         {type: String},
    image4:         {type: String}
})

module.exports = mongoose.model('Product', productSchema)