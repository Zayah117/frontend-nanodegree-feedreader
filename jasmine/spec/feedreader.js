/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /*Tests to make sure atleast one feed exists, each feed has
    a name, and each feed has a url*/
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         it('have a URL', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
         });

        it('have a name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
         });
    });


    /* Tests to make sure the menu is hidden by default,
    and changes visibility when clicked */
    describe('The menu', function() {
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });

        it('changes visibility when clicked', function() {
            // when hidden and clicked
            if ($('body').hasClass('menu-hidden')) {
                $('.menu-icon-link').trigger('click');
                expect($('body').hasClass('menu-hidden')).toEqual(false);
            }

            // when visible and clicked
            if ($('body').hasClass('menu-hidden') === false) {
                $('.menu-icon-link').trigger('click');
                expect($('body').hasClass('menu-hidden')).toEqual(true);
            }
        });
    });

    /* Tests to make sure there are feed links in the initial results */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('contians entries', function() {
            expect($('.feed .entry').length).not.toBe(0);
        });
    });

    /* Tests to make sure new content is loaded when loadFeed() is called*/
    describe('New Feed Selection', function() {
        var oldFeed = $('.feed').text();

        beforeEach(function(done) {
            loadFeed(1, function() {
                done();
            });
        });

        it('should load a new feed when content changes', function(done) {
            expect(oldFeed === $('.feed').text()).toBe(false);
            done();
        });
    });
}());
