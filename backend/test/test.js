import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('splitwise App', () => {
  // login with correct password
  describe('POST /api/login', () => {
    it('it should get auth token', (done) => {
      const data = {
        userEmail: 'john@gmail.com',
        userPassword: 'fullstack',
      };
      chai
        .request(app)
        .post('/api/login')
        .send(data)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('token');
          done();
        });
    });
  });
  //login with incorrect password
  describe('POST /api/login', () => {
    it('it throws password incorrect error because', (done) => {
      const data = {
        userEmail: 'john@gmail.com',
        userPassword: 'fulstack',
      };
      chai
        .request(app)
        .post('/api/login')
        .send(data)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a('object');
          response.body.should.have.property('errors');
          done();
        });
    });
  });

  //get dashboard without token
  describe('GET /api/dashboard', () => {
    it('it should throw error because of trying to access dashboard without token', (done) => {
      chai
        .request(app)
        .get('/api/dashboard')

        .end((err, response) => {
          response.should.have.status(401);
          response.body.should.be.a('object');
          response.body.should.have
            .property('msg')
            .eq('No token. Authorization denied');
          done();
        });
    });
  });

  //get dashboard with token
  describe('GET /api/dashboard', () => {
    it('it should show summary of the authorized user', (done) => {
      chai
        .request(app)
        .get('/api/dashboard')
        .set(
          'my-auth-token',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImtleSI6ImpvaG5AZ21haWwuY29tIiwiaWQiOjM5fSwiaWF0IjoxNjE1ODIzMTM2LCJleHAiOjE2MTYxODMxMzZ9.UOK9cXXukQX-Uzli6fe7WA59LXqkeTvJyY3rBrRw-ac'
        )
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('summary');
          response.body.should.have.property('totalBalance');
          done();
        });
    });
  });

  //post leave group
  describe('POST /api/my-groups/reject-invitation', () => {
    it('it should not throw error when the user leaves the group after settling all the balances', (done) => {
      chai
        .request(app)
        .post('/api/my-groups/reject-invitation')
        .set(
          'my-auth-token',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImtleSI6ImpvaG5AZ21haWwuY29tIiwiaWQiOjM5fSwiaWF0IjoxNjE1ODIzMTM2LCJleHAiOjE2MTYxODMxMzZ9.UOK9cXXukQX-Uzli6fe7WA59LXqkeTvJyY3rBrRw-ac'
        )
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.not.have.property('errors');
          done();
        });
    });
  });

  // create new group
  describe('POST /api/new-group', () => {
    it('it should throw error if group name is not unique', (done) => {
      const data = {
        groupName: 'Grocery',
      };
      chai
        .request(app)
        .post('/api/new-group')
        .send(data)
        .set(
          'my-auth-token',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImtleSI6ImpvaG5AZ21haWwuY29tIiwiaWQiOjQ0fSwiaWF0IjoxNjE2MTc4MjE4LCJleHAiOjE2MTY1MzgyMTh9.EfvKm_quFb2vTDkLtLc586E0XEmZ8cfonBXCtxR3mRg'
        )
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have.property('errors');
          done();
        });
    });
  });

  // Update profile
  describe('POST /api/me', () => {
    it('it should throw error if profile information is not valid', (done) => {
      const data = {
        userName: '',
      };
      chai
        .request(app)
        .post('/api/me')
        .send(data)
        .set(
          'my-auth-token',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImtleSI6ImpvaG5AZ21haWwuY29tIiwiaWQiOjQ0fSwiaWF0IjoxNjE2MTc4MjE4LCJleHAiOjE2MTY1MzgyMTh9.EfvKm_quFb2vTDkLtLc586E0XEmZ8cfonBXCtxR3mRg'
        )
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.have.property('errors');
          done();
        });
    });
  });
});
