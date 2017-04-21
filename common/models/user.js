// Copyright IBM Corp. 2014,2015. All Rights Reserved.
// Node module: loopback-example-user-management
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var config = require('../../server/config.json');
var path = require('path');

var helper = require('sendgrid').mail;
var from_email = new helper.Email('test@example.com');
var subject = 'Hello World from the SendGrid Node.js Library!';
var content = new helper.Content('text/plain', 'Hello, Email!');
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

module.exports = function(User) {
  //send verification email after registration
  User.afterRemote('create', function(context, user, next) {
    console.log('> user.afterRemote triggered');
    
    var to_email = new helper.Email(user.email);
    var mail = new helper.Mail(from_email, subject, to_email, content);
    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });

    sg.API(request, function(error, response) {
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
    });

    console.log('> verification email sent:', response);

    context.res.render('response', {
      title: 'Signed up successfully',
      content: 'Please check your email and click on the verification link ' +
          'before logging in.',
      redirectTo: '/',
      redirectToLinkText: 'Log in'
    });
  });

  //send password reset link when requested
  User.on('resetPasswordRequest', function(info) {
    var url = 'http://' + config.host + ':' + config.port + '/reset-password';
    var html = 'Click <a href="' + url + '?access_token=' +
        info.accessToken.id + '">here</a> to reset your password';

    User.app.models.Email.send({
      to: info.email,
      from: info.email,
      subject: 'Password reset',
      html: html
    }, function(err) {
      if (err) return console.log('> error sending password reset email');
      console.log('> sending password reset email to:', info.email);
    });
  });
};
