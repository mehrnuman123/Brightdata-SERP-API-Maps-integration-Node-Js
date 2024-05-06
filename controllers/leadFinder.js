const axios = require('axios')
const cheerio = require('cheerio')
const constants = require('../utils/constants')
const { APIresponse } = require('../utils/response')
const rp = require('request-promise')

const findLeads = async (req, res) => {
  const { search, city, country, num, requestId } = req.body;
  let listings;
  if (search && city && country) {
    const queryInput = `${search} ${city}`;
    const formattedQuery = queryInput.replace(/\s+/g, '+');
    console.log(formattedQuery); // Output: pizza+new+york
    await rp({
      url: `https://www.google.com/maps/search/${formattedQuery}/?num=${num ?? 500}&q=${formattedQuery}&brd_json=1&hl=en`,
      proxy: `http://brd-customer-CUSTOMER_ID-zone-YOUR_ZONE_HERE-country-${country}:PASSWORD@brd.superproxy.io:PORT`,
      rejectUnauthorized: false
    })
      .then(function (data) {
        listings = JSON.parse(data)
      },
        function (err) {
          console.error(err);
        });
  }   
  let leads = []
  if (listings !== null && listings !== undefined) {
    let obj;
    for (let i = 0; i < listings?.organic?.length; i++) {
      const url = listings?.organic[i]?.link;
      const emails = [];
      if (url !== null && url !== undefined) {
        try {
          const response = await axios.get(`${url}`, { timeout: 500 });
          if (response?.data !== undefined) {
            const html = response?.data;
            const $ = cheerio.load(html);
            // Regex pattern to match email addresses
            const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
            $('body')?.each((index, element) => {
              const text = $(element).text();
              const extractedEmails = text.match(emailRegex);
              if (extractedEmails) {
                emails.push(...extractedEmails);
              }
            });
          }
        }
        catch (err) {
          console.log(err, 'email scrap error');
          continue;
        }

      }
      obj = {
        name: listings?.organic[i]?.title || null,
        address: listings?.organic[i]?.address || null,
        phone: listings?.organic[i]?.phone || null,
        email: [...new Set(emails)] || null,
        website: listings?.organic[i]?.link || null,
        rating: listings?.organic[i]?.rating || null,
        reviews_cnt: listings?.organic[i]?.reviews_cnt || null,
        category: listings?.organic[i]?.category
      }
      leads.push(obj)
    }
  }
  const listObj = {
    ...listings,
    requestId: requestId,
    searched_at: new Date(),
    organic: leads
  }
  return APIresponse(res, constants.SUCCESS, listObj)
}

module.exports = { findLeads }