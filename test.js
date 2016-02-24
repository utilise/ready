var expect = require('chai').expect
  , ready  = require('./')
  
describe('ready', function() {
  
  it('should invoke if ready', function(done) {
    global.document = { body: true }

    ready(function(){
      expect(document.body).to.be.ok
      done()
    })
  })

  it('should invoke when ready', function(done) {
    global.document = {} 

    document.addEventListener = function(type, fn) {
      expect(type).to.eql('DOMContentLoaded')
      expect(fn).to.eql(callback)
      fn(document.body = true)
    }

    ready(callback)

    function callback(){
      expect(document.body).to.be.ok
      done()
    }
  })

})