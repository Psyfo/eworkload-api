const Block = require('../../../models/block');

module.exports = {
    Query: {
        block: (root, args) => {
            return Block.findOne({
                    blockId: args.blockId
                })
                .then(block => {
                    return block;
                })
                .catch(err => {
                    throw err;
                });
        },
        blocks: () => {
            return Block.find({})
                .sort('blockId')
                .then(blocks => {
                    return blocks;
                })
                .catch(err => {
                    throw err;
                })
        }
    },
    Mutation: {
        addBlock: (root, args) => {
            const newBlock = new Block({
                blockId: args.blockId,
                name: args.name,
                description: args.description
            });

            return newBlock.save()
                .then(result => {
                    return result;
                })
                .catch(err => {
                    return err;
                });
        },
        editBlock: (root, args) => {
            return Block.findOneAndUpdate({
                    blockId: args.blockId
                }, {
                    $set: {
                        name: args.name,
                        description: args.description
                    }
                })
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        },
        deleteBlock: (root, args) => {
            return Block.findOneAndRemove(args)
                .then(result => {
                    return result;
                })
                .catch(err => {
                    throw err;
                })
        }
    }
};