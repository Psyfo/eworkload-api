import Block from '../../../models/block';

export default {
  Query: {
    block: (root, args) => {
      return Block.findOne({
        blockId: args.block.blockId
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
        });
    }
  },
  Mutation: {
    addBlock: (root, args) => {
      console.log('Block args:', args);

      const newBlock = new Block({
        blockId: args.block.blockId,
        name: args.block.name,
        description: args.block.description
      });

      return newBlock
        .save()
        .then(result => {
          return result;
        })
        .catch(err => {
          return err;
        });
    },
    editBlock: (root, args) => {
      return Block.findOneAndUpdate(
        {
          blockId: args.block.blockId
        },
        {
          $set: {
            name: args.block.name,
            description: args.block.description
          }
        }
      )
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    deleteBlock: (root, args) => {
      return Block.findOneAndRemove(args.block)
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  }
};
