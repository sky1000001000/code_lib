var express = require('express')
var mongoose = require('mongoose')
var path = require('path')
var _ = require('underscore')
var Movie = require('./models/movie')
var port = process.env.PORT || 3000
var app = express()

mongoose.connect('mongodb://localhost/imooc')

app.set('views','./views/pages')
app.set('view engine','jade')
app.use(express.bodyParser())
app.locals.moment = require('moment')
app.use(express.static(path.join(__dirname,'pulic')))
app.listen(port)


console.log('imooc startend on port' +port)

//index page
app.get('/',function(req,res){
    Movie.fetch(function(err,movies){
        if(err){
            console.log(err)
        }
        res.render('index',{
            title:'imooc 首页',
            movies:movies
        })
    })
    
})

//detail page
app.get('/movie:id',function(req,res){
    var id = req.params.id

    Movie.findById(id,function(err,movie){
        res.render('detail',{
            title:'imooc 详情',
            movie:movie
        })
    })
  
})

//admin page
app.get('/admin/movie',function(req,res){
    res.render('admin',{
        title:'imooc 后台录入'
    })
})

// admin update movie
app.get('/amdin/update/:id',function(req,res){
    var id = req.params.id
    if(id){
        Movie.findById(id,function(err,movie){
            res.render('amdin',{
                title:'imooc 后台更新页',
                movie:movie
            })
        })
    }
})
//amdin post movie
app.post('/amdin/movie/new',function(res,req){
    var id = req.body.movie._id
    var movieObj = req.body.movie
    var _movie
    if(id !== 'undefined'){
        Movie.findById(id,function(err,movie){
            if(err){
                console.log(err)
            }
            _movie = _.extend(movie,movieObj)
            _movie.save(function(err,movie){
                if(err){
                    console.log(err)
                }
                res.redirect('/movie/'+movie._id)
            })
        })
    }else{
        _movie = new Movie({
            docter:movieObj.docter,
            title:movieObj.title,
            country: movieObj.country,
            language:movieObj.language,
            year:movieObj.year,
            poster:movieObj.poster,
            summary:movieObj.summary,
            flash:movieObj.flash
        })
        _movie.save(function(err,movie){
            if(err){
                console.log(err)
            }
            res.redirect('/movie/'+movie._id)
        })
    }
})
//list page
app.get('/admin/list',function(req,res){
    Movie.fetch(function(err,movies){
        if(err){
            console.log(err)
        }
        res.render('list',{
            title:'imooc 列表页',
            movies:movies
        })
    })
})

//list delete movie
app.delete('/admin/list',function(req,res){
    var id = req.query.id
    if(id){
        Movie.remove({_id:id},function(err,movie){
            if(err){
                console.log(err)
            }else{
                res.json({success:1})
            }
        })
    }
})
