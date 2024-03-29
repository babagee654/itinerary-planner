const mongoose = require('mongoose');

const packingListSchema = new mongoose.Schema({
    essential: [String],
    optional: [String],
    trip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip'
    }
});

const PackingList = mongoose.model('PackingList', packingListSchema);

module.exports = PackingList;