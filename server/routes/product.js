const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
});
   
var upload = multer({ storage: storage }).single("file");

router.post('/image', (req, res) => {
    //가져온 이미지를 저장을 해주면 된다.
    upload(req, res, err => {
        if(err) {
            return req.json({ success: false, err });
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })
});

router.post('/', (req, res) => {
    //받아온 정보들을 DB에 넣어준다.
    const product = req.body;
    if(req.body.productId){
        Product.findOneAndUpdate({_id: req.body.productId}, {
            _id: product.productId,
            writer: product.writer,
            description: product.description,
            price: product.price,
            images: product.images,
            sort: product.sort
        })
        .exec((err, productInfo) => {            
            if(err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ 
                success: true, 
                productInfo
            });
        })
    } else {
        const product = new Product(req.body);
        product.save((err) => {
            if(err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true })
        })
    }
});

router.post('/products', (req, res) => {

    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let term = req.body.searchTerm;
    let findArgs = {};

    for(let key in req.body.filters) {
        if(req.body.filters[key].length > 0) {

            if(key === 'price') {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key];
            }


        }
    }

    if(term){
        Product.find(findArgs)
        .find({$or: [{"title": { $regex: term }}, { "description": { $regex: term }}]})        
        .sort({"createdAt": -1})
        .populate('writer')
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) => {
            if(err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ 
                success: true, 
                productInfo, 
                postSize: productInfo.length 
            });
        });
    } else {
        Product.find(findArgs)
        .sort({"createdAt": -1})
        .populate('writer')
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) => {
            if(err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ 
                success: true, 
                productInfo, 
                postSize: productInfo.length 
            });
        });
    }
});


router.get('/products_by_id', (req, res) => {

    let type = req.query.type;
    let productIds = req.query.id;
    //productId를 이용해서 DB에서 productId와 같은 상품의 정보를 가져온다.
    if(type === 'array') {
        let ids = req.query.id.split(',');
        productIds = ids.map(item => {
            return item;
        });
    }
   
    Product.find({ _id: {$in: productIds} })
        .populate('writer')
        .exec((err, product) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({success: true, product});
        })
});

router.get('/remove_product', (req, res) => {
    let productId = req.query.productId;
    Product.findOneAndDelete({_id: productId})
    .exec((err) => {
        if(err) return res.status(400).send(err);
        return res.status(200).send({success:true})
    })
})

module.exports = router;