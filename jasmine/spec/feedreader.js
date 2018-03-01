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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('all feeds have a valid URL', function() {
            allFeeds.forEach(function(feed, index) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe(null);
                expect(feed.url).not.toEqual('');
            })
         })


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('all feeds have a valid name', function() {
            allFeeds.forEach(function(feed, index) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe(null);
                expect(feed.name).not.toEqual('');
            })
         })

    });


    /* TODO: Write a new test suite named "The menu" */
    describe('Rss Menu', function() {


        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('menu is hidden by default', function() {
            var hasClass = $('body').hasClass('menu-hidden');
            expect(hasClass).toBe(true);
         });


         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('menu is shown and is hidden when clicked', function() {
            var hasClass = true;
            $('.menu-icon-link').trigger('click');
            hasClass = $('body').hasClass('menu-hidden');
            expect(hasClass).toBe(false);

            $('.menu-icon-link').trigger('click');
            hasClass = $('body').hasClass('menu-hidden');
            expect(hasClass).toBe(true);
          });

    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('feed has at least one entry', function(done) {
            var children = $('.feed').children(['entry.class']);
            expect(children).toBeDefined();
            done();
        });

    });

    /* TODO: Write a new test suite named "New Feed Selection" */

    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('feed has changed after it loaded', function(done) {
            var title = $('.header-title').text();
            var newTitle;

            var firstH2 = $('.entry h2').text();
            var newH2;

            loadFeed(1, function() {
                newTitle = $('.header-title').text();
                expect(title).toBeDefined();
                expect(title).not.toBe(null);
                expect(title).not.toEqual('');

                expect(newTitle).toBeDefined();
                expect(newTitle).not.toBe(null);
                expect(newTitle).not.toEqual('');

                expect(title).not.toEqual(newTitle);

                newH2 = $('.entry h2').text();
                expect(firstH2).toBeDefined();
                expect(firstH2).not.toBe(null);
                expect(firstH2).not.toEqual('');

                expect(newH2).toBeDefined();
                expect(newH2).not.toBe(null);
                expect(newH2).not.toEqual('');

                expect(firstH2).not.toEqual(newH2);

                done();
            });

        });

        it('invalid feed doesn\'t load', function(done) {

            var load = function() {

                loadFeed(4);
            };

            expect(load).toThrowError(TypeError, 'Sorry! Website under ' +
                'maintenance. Come back later.');
            done();

        });

    });

}());