const elasticsearch = require('elasticsearch');
const client = require('../connection');

module.exports = (req, res) => {
    const mappingParams = {
        'index': 'cars',
        'type': 'car',
        'body': {
            'properties': {
                'volume': {
                    'type': 'text',
                    'fielddata': true
                }
            }
        }
    }
    let page = parseInt(req.query.page, 10);
    if (isNaN(page) || page < 1) {
        page = 1;
    }

    let limit = parseInt(req.query.limit, 10);
    if (isNaN(limit)) {
        limit = 10;
    } else if (limit > 50) {
        limit = 50;
    } else if (limit < 1) {
        limit = 1;
    }
    let offset = (page - 1) * limit;
    const searchParams = {
        'index': 'cars',
        'body': {
            'from': offset, 'size': limit,
            'query': {
                'match_all': {}
            },
            'sort': [
                {
                    'volume': {
                        'order': 'desc'
                    }
                }
            ]
        }
    }

    client.ping({ requestTimeout: 30000 })
        .then(() => client.indices.putMapping(mappingParams))
        .then(() => client.search(searchParams))
        .then((resp) => {
            let json = {};
            json.page = page;
            json.limit = limit;
            json.hits = resp.hits.hits.map((hit) => hit._source);
            res.json(json);
        })
        .catch((err) => res.status(500).send(err.message));
}