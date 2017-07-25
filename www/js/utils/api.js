import xhr from 'xhr';

/**
 * [API you can send request]
 * @param {Any} ops [what are you want to send]
 */
export default function API(ops) {
  const sendObj = {
    body: ops.data ? JSON.stringify(ops.data) : '',
    method: ops.method || 'GET',
    url: ops.url,
    headers: {
      'Content-Type': ops.contentType || 'application/json',
    }
  };

  return new Promise((resolve, reject) => {
    xhr(sendObj, (error, resp, body) => {
      const answer = JSON.parse(body);
      if (error || (resp.statusCode !== 200 && resp.statusCode !== 201)) {
        return reject(answer);
      }

      return resolve(answer);
    });
  });
}
