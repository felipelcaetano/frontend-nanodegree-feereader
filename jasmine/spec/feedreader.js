/* feedreader.js
 *
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    /*
    * Testes gerais dos feeds
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
         /*
         * Verifica se existem feeds na lista
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*
         * Verifica se todos os feeds possuem uma URL definida
         */
         it('all feeds have a valid URL', function() {
            allFeeds.forEach(function(feed, index) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe(null);
                expect(feed.url).not.toEqual('');
            })
         })


        /*
         * Verifica se todos os feed posuem um nome
         */
         it('all feeds have a valid name', function() {
            allFeeds.forEach(function(feed, index) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe(null);
                expect(feed.name).not.toEqual('');
            })
         })

    });


    /* Testes do menu */
    describe('Rss Menu', function() {


        /*
         * Verifica se o menu esta escondido no carregamento da pagina
         */
         it('menu is hidden by default', function() {
            var hasClass = $('body').hasClass('menu-hidden');
            expect(hasClass).toBe(true);
         });


         /*
          * Verifica se quando e clicado no icone do haburguer o menu e mostrado
          * e escondido novamente
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

    /* Testes do feed inicial */
    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /*
         * Verifica seo feeed tem pelo menos uma materia
        */
        it('feed has at least one entry', function(done) {
            var children = $('.feed .entry');
            expect(children).toBeDefined();
            expect(children.length).toBeGreaterThan(0);
            done();
        });

    });

    /* Testes de selecao de feeds */
    describe('New Feed Selection', function() {

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /*
         * Verifica se o feed e alterado apos a selecao de um novo feed
        */
        it('feed has changed after it loaded', function(done) {
            var feed = $('.feed').text();
            var newFeed;

            loadFeed(1, function() {
                newFeed = $('.feed').text();
                expect(feed).toBeDefined();
                expect(feed).not.toBe(null);
                expect(feed).not.toEqual('');

                expect(newFeed).toBeDefined();
                expect(newFeed).not.toBe(null);
                expect(newFeed).not.toEqual('');

                expect(feed).not.toEqual(newFeed);

                done();
            });

        });

        /*
         * Verifica se nao ocorre erro quando selecionado um feed nao existente
         * na lista de feeds
        */
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