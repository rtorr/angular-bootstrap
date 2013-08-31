'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Splash Page', function() {

  beforeEach(function() {
    browser().navigateTo('');
  });

  describe('Splash page interactions', function() {

    beforeEach(function() {
      browser().navigateTo('/');
    });

    it('/ splash page', function() {
      expect(element('p').text()).
        toMatch(/Hello World/);
    });

  });



});