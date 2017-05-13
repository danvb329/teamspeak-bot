import tinyreq from 'tinyreq';

export async function scrapeByUrl(url, parser) {
  return new Promise((resolve, reject) => {
    tinyreq(url, (error, body) => {
      if (error) reject(error);
      resolve(parser(body))
    });
  })
}
