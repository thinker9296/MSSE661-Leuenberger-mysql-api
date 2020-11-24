const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Names API Service', function () {
  it('should GET all names', function (done) {
    chai
      .request('http://localhost:3000')
      .get('/names')
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.a('array');
        expect(resp.body.length).to.not.be.eql(0);
        done();
      });
  });

  it('should GET a single name', function (done) {
    const expected = [
      {
        id: 1,
        firstname: "Sally",
        lastname: "Seashells",
        created_date: '2020-11-09T04:55:56.000Z',
      },
    ];

    chai
      .request('http://localhost:3000')
      .get('/names/1')
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.a('array');
        expect(resp.body.length).to.not.be.eql(0);
        expect(resp.body).to.be.eql(expected);
        done();
      });
  });

 /*  it.skip('should POST a single task', function (done) {
    const newTask = {
      name: 'New test task!',
    };
    const expected = { message: 'Add task successfully!' };

    chai
      .request('http://localhost:3000')
      .post('/api/tasks')
      .send(newTask)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.eql(expected);
        done();
      });
  }); */
});
