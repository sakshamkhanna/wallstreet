module.exports = {
  attributes: {
    symbol: {
      type: 'string',
      unique: true,
      required: true,
    },
    name: {
        type: 'string',
    },
    snapshot: {
      type: 'json'
    //   schema:
    //   snapshot: {
    //     value: float,
    //     change: float,
    //     timestamp: datetime
    //   }
    },
    archive: {
      type: 'json'
    //   schema:
    //   archive: [{
    //     value: float,
    //     change: float,
    //     timestamp: datetime},
    //     {}]
    },
  }
};
