import SQSService from 'Services/SQSService';

const pingQueue = input => {
  const payload = {
    data: input,
  };

  const sqsService = new SQSService();
  return sqsService.enqueue(payload, 'pingQueue');
};

export default pingQueue;
