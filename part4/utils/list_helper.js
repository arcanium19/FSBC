const _ = require('lodash')

const dummy = (blogs) => {
    blogs = 1
    return blogs
}

const totalLikes = (blogs) => {
    if(blogs.length === 1){
        return blogs[0].likes
    }else if(blogs.length === 0){
        return 0
    }else{
        const totalLikesReduce = blogs.reduce((sumLikes, line) => {
            return sumLikes += line.likes
        }, 0)

        return totalLikesReduce
    }
}

const mostLikes = (blogs) => {
    if(blogs.length === 0){
        return {}
    }else if(blogs.length === 1){
        return {
            title: blogs[0].title,
            author: blogs[0].author,
            likes: blogs[0].likes
        }
    }else{
        const orderedList = blogs.sort((a, b) => b.likes - a.likes)
        return {
            title: orderedList[0].title,
            author: orderedList[0].author,
            likes: orderedList[0].likes
        }
    }
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0){
        return {}
    }else if(blogs.length === 1){
        return {
            author: blogs[0].author,
            blogs: 1
        }
    }else{
        const authorCounts = _.countBy(blogs, 'author')
        const mostCommonAuthor = _.maxBy(_.keys(authorCounts), author => authorCounts[author])
        return {
            author: mostCommonAuthor,
            blogs: authorCounts[mostCommonAuthor]
        }
    }
}

const mostLikes2 = (blogs) => {
    if(blogs.length === 0){
        return {}
    }else if(blogs.length === 1){
        return {
            author: blogs[0].author,
            likes: blogs[0].likes
        }
    }else{
        const authorLikes = _.groupBy(blogs, 'author')

        const authorTotalLikes = _.mapValues(authorLikes, (authorBlogs) =>
            _.sumBy(authorBlogs, 'likes')
        )

        const mostLikedAuthor = _.maxBy(_.keys(authorTotalLikes), (author) =>
            authorTotalLikes[author]
        )

        return {
            author: mostLikedAuthor,
            likes: authorTotalLikes[mostLikedAuthor]
        }
    }
}

module.exports = {
    dummy,
    totalLikes,
    mostLikes,
    mostBlogs,
    mostLikes2
}