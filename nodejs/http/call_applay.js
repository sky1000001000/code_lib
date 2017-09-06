var pet = {
    words : "...",
    speak: function(say) {
        console.log(say + ' ' + this.words)
    }
}

var dog = {
    words: "Wang"
}
//call改变上下文
pet.speak.call(dog,'Speak')
