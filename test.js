var expect = require('chai').expect
  , owner  = require('utilise.owner')
  , ready  = require('./')
  
describe('ready', function() {
  
  it('should invoke if ready', function(done) {
    global.document = { body: true }

    ready(function(){
      expect(this).to.eql(owner)
      expect(document.body).to.be.ok
      done()
    })
  })

  it('should invoke when ready', function(done) {
    global.document = {} 

    document.addEventListener = function(type, fn) {
      expect(type).to.eql('DOMContentLoaded')
      expect(fn.name).to.include('callback')
      fn(document.body = true)
    }

    ready(callback)

    function callback(){
      expect(this).to.eql(owner)
      expect(document.body).to.be.ok
      done()
    }
  })

})