export const normalize = records => {
  if (!records || records === null) return null;

  return Object.values(records).map(record => ({
    messageId: record.messageId,
    receiptHandle: record.receiptHandle,
    ...JSON.parse(record.body),
  }));
};

/**
 * Normalizes handler.event.Records as handler.event.collections Object.
 * This type of request is received by SQS listeners
 */
export default /* istanbul ignore next */ () => {
  return {
    before: (handler, next) => {
      const { Records } = handler.event;
      // eslint-disable-next-line no-param-reassign
      handler.event.collection = normalize(Records);
      next();
    },
  };
};
