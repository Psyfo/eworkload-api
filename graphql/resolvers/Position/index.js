import Position from '../../../models/position';

export default {
  Query: {
    position: (root, args) => {
      return Position.findOne(args)
        .populate()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    positions: () => {
      return Position.find({})
        .populate()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  Mutation: {
    addPosition: (root, args) => {
      const newPosition = new Position({
        positionId: args.position.positionId,
        name: args.position.name,
        description: args.position.description
      });

      return newPosition
        .save()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    editPosition: (root, args) => {
      return Position.findOneAndUpdate(
        {
          positionId: args.position.positionId
        },
        {
          $set: {
            name: args.position.name,
            description: args.position.description
          }
        }
      )
        .populate()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    },
    deletePosition: (root, args) => {
      return Position.findOneAndRemove(args.position)
        .populate()
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  }
};
