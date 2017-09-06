function Pet(words) {
    this.words = words
    this.speak = function() {
        console.log(this.words)
    }
}

function Dog(words) {
    Pet.call(this,words)
}
//实现继承
var dog = new Dog('Wang')
dog.speak()